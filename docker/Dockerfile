# When deploying using Dokploy:
# Path to the Docker file: "docker/Dockerfile"
# Context: .
# It's gonna take Docker file wherever it's located, but to preserve relative paths, we can ask Dokploy to treat in context of root (aka ".")

FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY ./ .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

CMD ["node", "server.js"]
