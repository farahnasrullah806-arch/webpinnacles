# ── Build Stage ──────────────────────────────────────────
FROM node:20-alpine AS builder
RUN npm install -g pnpm@10
WORKDIR /app

# Copy workspace files for pnpm to resolve the graph
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY packages/contracts/package.json ./packages/contracts/package.json
COPY packages/api/package.json ./packages/api/package.json

# Install only production deps for API
RUN pnpm install --frozen-lockfile --filter=api...

# Copy source
COPY packages/contracts ./packages/contracts
COPY packages/api ./packages/api

# Build
RUN pnpm --filter=api build

# ── Runtime Stage ─────────────────────────────────────────
FROM node:20-alpine AS runner
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Copy built artifacts only
COPY --from=builder /app/packages/api/dist ./dist
COPY --from=builder /app/packages/contracts ./contracts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/api/package.json ./package.json

USER appuser
EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "dist/server.js"]
