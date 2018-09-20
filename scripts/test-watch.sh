#!/bin/bash
set -e

if [ -f settings.test.sh ]; then
  source settings.test.sh
elif [ -f settings.sh ]; then
  source settings.sh
fi

knex migrate:latest
NODE_ENV=test mocha \
  --inspect \
  --opts ./test/mocha.opts \
  --watch \
  --watch-extensions ts \
  $(find ./test -name '*.ts')