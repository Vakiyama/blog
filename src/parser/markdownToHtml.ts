import { EOL } from 'os';
import getYoutubeID from 'get-youtube-id';

type Tag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'i'
  | 'b'
  | 'p'
  | 'e'
  | 'escape'
  | 'code'
  | 'li'
  | 'ul';

function parseTitle(htmlLine: string[], i: number, line: string, stack: Tag[]) {
  if (i !== 0) return i;
  // jump forward for each consecutive #, stopping at 6, add h(n#) to the stack
  for (let index = i + 1; ; index++) {
    const char = line[index];
    if (char !== '#' || index === 6) {
      htmlLine.push(`<h${index}>`);
      stack.push(`h${index}` as Tag);
      return index; // skip the space after the #
    }
  }
}

function parseLink(htmlLine: string[], i: number, line: string) {
  for (let index = i + 1; index < line.length; index++) {
    const char = line[index];
    if (char !== ']') continue;
    const title = line.slice(i + 1, index);
    index++;
    const titleEndIndex = index;
    for (; index < line.length; index++) {
      const charLink = line[index];
      if (charLink !== ')') continue;
      const link = line.slice(titleEndIndex + 1, index);
      // here, we can determine if it's an image link or not
      if (
        link.endsWith('png') ||
        link.endsWith('svg') ||
        link.endsWith('jpg') ||
        link.endsWith('jpeg')
      ) {
        htmlLine.push(
          `<div class="image-wrapper">
            <img src="${link}" alt="${title}"/>
          </div>`
        );
        break;
      }
      if (link.includes('youtube.com/watch?') || link.includes('youtu.be/')) {
        const id = getYoutubeID(link, { fuzzy: true });
        if (id) {
          htmlLine.push(`<a href="${link}" target="_blank">${title} ⬈</a>`);
          htmlLine.push(
            `<div class="video-container"><iframe width="100%" height="auto" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
          );
          break;
        }
      }
      htmlLine.push(`<a href="${link}" target="_blank">${title} ⬈</a>`);
      break;
    }
    return index;
  }
  throw new Error('invalid markdown link format');
}

function parseList(htmlLine: string[], line: string) {
  htmlLine.push('<ul>');
  const listItems = line
    .split(EOL)
    .map((line) => '<li>' + line.slice(1, line.length) + '</li>');
  htmlLine.push(listItems.join(''));
  htmlLine.push('</ul>');
  return line.length - 1;
}

function removeFromStack(stack: Tag[], tag: Tag) {
  stack.reverse().splice(stack.indexOf(tag), 1).reverse(); // remove from stack
}

function hasTag(stack: Tag[]) {
  for (const tag of stack) {
    for (let i = 0; i < 6; i++) {
      if (tag === `h${i + 1}`) return i + 1;
    }
  }
  return false;
}

function addTag(htmlLine: string[], stack: Tag[], tag: Tag) {
  if (stack.includes(tag)) {
    removeFromStack(stack, tag);
    htmlLine.push(`</${tag}>`);
    return;
  }
  stack.push(tag);
  htmlLine.push(`<${tag}>`);
}

function parseLine(line: string, stack: Tag[]): string {
  const htmlLine: string[] = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (i === 0 && char !== '#') {
      // start of paragraph with no title
      htmlLine.push('<p>');
      stack.push('p');
    }
    if (stack.includes('escape')) {
      removeFromStack(stack, 'escape');
      htmlLine.push(char);
      continue;
    }
    // last char
    switch (char) {
      case '#':
        i = parseTitle(htmlLine, i, line, stack);
        break;
      case '*': // this will always be 2 '*', so we can increment i and treat it as one char
        i++;
        addTag(htmlLine, stack, 'b');
        break;
      case '_':
        addTag(htmlLine, stack, 'i');
        break;
      case '`':
        if (line[i + 1] === '`') i += 2;
        addTag(htmlLine, stack, 'code');
        break;
      case '\\':
        stack.push('escape');
        break;
      case '[':
        i = parseLink(htmlLine, i, line);
        break;
      case '-':
        if (i !== 0) break;
        i = parseList(htmlLine, line);
        break;
      default:
        htmlLine.push(char);
    }
  }
  // handle p or h(n#)
  if (stack[0] === 'p') {
    removeFromStack(stack, 'p');
    htmlLine.push('</p>');
  } else {
    const tagNumber = hasTag(stack);
    if (tagNumber) {
      removeFromStack(stack, `h${tagNumber}` as Tag);
      htmlLine.push(`</h${tagNumber}>`);
    }
  }
  return htmlLine.join('');
}

export function parseToHtml(markdown: string) {
  const markdownLines = markdown.split(EOL + EOL);
  const htmlLines: string[] = [];
  let stack: Tag[] = [];
  for (const line of markdownLines) {
    const htmlLine = parseLine(line, stack);
    htmlLines.push(htmlLine);
  }
  return htmlLines.join(EOL);
}
