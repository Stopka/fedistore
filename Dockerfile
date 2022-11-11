FROM node:18-bullseye AS prebuild
ENV TZ='UTC'
FROM prebuild AS build
WORKDIR /srv
COPY application/package*.json ./
RUN yarn
COPY application/. .
RUN yarn build

FROM build AS dev
CMD yarn dev

FROM prebuild AS prod
RUN groupadd -g 1001 nodejs
RUN useradd -m -u 1001 -g 1001 nodejs
WORKDIR /srv
USER nodejs
COPY --from=build /srv/node_modules ./node_modules
COPY --from=build /srv/package*.json ./
COPY --from=build /srv/dist ./dist
CMD yarn prod
