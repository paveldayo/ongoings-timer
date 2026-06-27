import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/lib/glitchtip/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("@/lib/glitchtip/sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
