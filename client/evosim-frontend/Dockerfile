FROM node:lts as development

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:lts as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/client/ ./

EXPOSE 3000
CMD [ "npm", "start" ]
