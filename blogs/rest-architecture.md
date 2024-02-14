# REST

All of this is a plan for managing the chaos, Routers, HTTP, REST, so on.

Fundamentally:

Client asks for a resource and the server responds with a representation
of that resource.

R: Representational

The resource is a representation, so a "page" is a html representation of
that page.

It's a bit unclear what the "true" resource is, but we're thinking about
how those "true" resources are represented by html, img, so on. The path
just points to that resource.

URL: Uniform Resource Locator

The Content-Type: <MIME> is how you determine what representation you
want.

Routing: Defining which paths lead to which resources.

Router: Software that helps you achieve Routing.

A router is a middleware:

```ts
app.use('/', router);
// always run if we start with '/some-path'
app.use('/some-path', (req, res, next) => {
    next(),
});
```

We use routers to organize and group our related endpoints. They are
related because they are related resources.

Here, we apply this middleware to all routes starting with '/'.

We can chain middleware, scope them, or use them in the Router

Middleware to log all requests, to log database queries, so on.

Potentially: Write a middleware that comes after the cookie parser but
before an auth route that checks if a user is logged in. If not, it
hijacks the request and sends the user to a login or error page.

## In Express

Routers break up our application logic into these smaller chunks that all
answer to the app router.

An Express router is just like app for middleware and endpoints. It's
a "mini-application".

## Why does REST matter?

Roy Fielding comes up with this standard
for network applications

He does this as HTTP is taking off during or after the .com bubble

Invest the idea of REST:

A set of architectural principles, with HTTP as an example of REST.

REST was mostly what HTTP did right, in case someone goes to implement
a new architecture.

People talk about REST in different ways. Roy Fielding defines it by this
architectural implementation, which is 99% things we don't need to know
about HTTP.

It is "legal" to use POST for all forms... Just not a great idea... You
could send all the data in headers, there's perversions of HTTP that are
technically legal.

Ruby on Rails - We should develop applications by conforming to REST.

DHH starts figuring out how to use REST to define web application
development.

(doesn't violate http)

- "Don't use the same url for everything"
- "Don't have an insane url with a million words and params"

- readable URLs
- Use (all) of the methods

People write blog posts saying DHH's web application development ideas ARE
REST (which they are not, they are kind of a derivation of REST)

REST does not talk about any of the bullet points above!

Third definition of REST (for the startup that is selling a dev related product):

REST means if it doesn't say it on the product we won't sell as many
copies.

When using an API, if you're told its a REST or RESTful API, it's
basically an empty promise that means little.

There likely isn't a REST contract with the API... or at least no
guarantee of one.
