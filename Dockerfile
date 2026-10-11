FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
# Mount the pnpm store directory to speed up rebuilds without bloating the layer
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --dangerously-allow-all-builds --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base AS runtime
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4321
CMD [ "pnpm", "run", "preview", "--", "--host" ]