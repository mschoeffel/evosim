# evosim-frontend

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Docker

```bash
# build and run docker image
$ docker build -t evosim-client-image .
$ docker run -d -p 8000:8000 --env-file=docker.env --name evosim-client-container evosim-client-image
```
