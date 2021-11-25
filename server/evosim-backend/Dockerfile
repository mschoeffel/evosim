FROM node:17.1.0-alpine3.14 as development

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:17.1.0-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/server/dist ./dist

EXPOSE 5000
CMD ["node", "--optimize_for_size", "--max_old_space_size=200", "--gc_interval=50", "--expose-gc", "dist/main"]