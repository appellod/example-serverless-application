#!/bin/bash
set -e

if [ -f settings.test.sh ]; then
  source settings.test.sh
elif [ -f settings.sh ]; then
  source settings.sh
fi

knex migrate:latest
NODE_ENV=test nyc mocha \
  --exit \
  --opts ./test/mocha.opts \
  --reporter mocha-multi-reporters \
  --reporter-options configFile=mocha-multi-reporters.json \
  --require ./ts-node.js \
  $(find ./test -name '*.ts')
