# multi-vision

Learning MEAN stuff from [PluralSight](https://app.pluralsight.com/player?course=building-angularjs-nodejs-apps-mean).

## Installation

```sh
# requirements
npm i -g nodemon # i am sure some are missing :(

# setup
git clone https://github.com/agonzalezjr/mean-multi-vision.git multi-vision
cd multi-vision
npm i
```

## Running

First, start mongo (locally):

```sh
cd ~ && mongod -f data/mongod.conf
```

Then, to start with local DB:

```sh
nodemon server.js
```

Or, with "production" DB:

```sh
NODE_ENV=production nodemon server.js
```

and connect to http://localhost:3030/

## Deploying changes

Just push to GH :smile:
