# evosim-backend

## Build Setup

```bash
# install dependencies
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker 

```bash
# build and run docker image
$ docker build -t evosim-server-image --network="host" .
$ docker run -d --network="host" --env-file=docker.env -v LOCAL_PATH:/usr/src/app/server/snapshots --name evosim-server-container evosim-server-image
```