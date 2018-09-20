#!/bin/bash
set -e

if [ -f settings.test.sh ]; then
  source settings.test.sh
elif [ -f settings.sh ]; then
  source settings.sh
fi

knex migrate:latest
NODE_ENV=test mocha \
  --exit \
  --inspect \
  --opts ./test/mocha.opts \
  $(find ./test -name '*.ts')
