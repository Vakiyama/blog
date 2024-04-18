import { PostHog } from 'posthog-node';

const posthogKey = process.env.POSTHOG_KEY;

if (!posthogKey) {
  throw new Error('Missing posthog api key env variable.');
}

export const posthogClient = new PostHog(posthogKey, {
  host: 'https://us.posthog.com',
});
