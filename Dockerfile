FROM node:20-alpine AS development-dependencies-env
COPY . /src
WORKDIR /src
RUN corepack enable && yarn install --immutable

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json yarn.lock .yarnrc.yml /src/
COPY .yarn /src/.yarn
WORKDIR /src
RUN corepack enable && yarn workspaces focus --production

FROM node:20-alpine AS build-env
COPY . /src/
COPY --from=development-dependencies-env /src/node_modules /src/node_modules
WORKDIR /src
RUN corepack enable && yarn build

FROM node:20-alpine
COPY ./package.json /src/
COPY --from=production-dependencies-env /src/node_modules /src/node_modules
COPY --from=build-env /src/build /src/build
WORKDIR /src
CMD ["yarn", "start"]
