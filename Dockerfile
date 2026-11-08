FROM node:24-alpine AS build

WORKDIR /app

ARG PUBLIC_UMAMI_URL
ARG PUBLIC_UMAMI_WEBSITE_ID
ENV PUBLIC_UMAMI_URL=$PUBLIC_UMAMI_URL
ENV PUBLIC_UMAMI_WEBSITE_ID=$PUBLIC_UMAMI_WEBSITE_ID

ENV npm_config_store_dir=/pnpm/store

# Installs the pnpm version pinned in package.json's packageManager
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,target=/pnpm/store \
  pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM nginx:1.29-alpine AS prod

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
