#!/bin/bash
set -e

if [ -f settings.sh ]; then
  source settings.sh
fi

knex migrate:latest
NODE_ENV=test mocha \
  --exit \
  --inspect \
  --opts ./e2e/mocha.opts \
  $(find ./e2e -name '*.ts')