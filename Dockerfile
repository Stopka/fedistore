FROM node:18-bullseye AS base
ENV TZ='UTC'

FROM base AS install
WORKDIR /srv
COPY application/package*.json ./
RUN yarn install

FROM install AS dev
CMD yarn dev

FROM install AS build
COPY application/. .
RUN yarn build

FROM base AS prod
RUN groupadd -g 1001 nodejs
RUN useradd -m -u 1001 -g 1001 nodejs
WORKDIR /srv
USER nodejs
COPY --from=build /srv/node_modules ./node_modules
COPY --from=build /srv/package*.json ./
COPY --from=build --chown=nextjs:nodejs  /srv/dist ./dist
CMD yarn start
