// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_GLITCHTIP_DSN,

  tracesSampleRate: 1,
  enableLogs: true,
  dataCollection: {
    frameContextLines: 10
  },
});

Sentry.setTag("runtime", "client")

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
