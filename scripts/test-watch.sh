#!/bin/bash
set -e

DIRNAME=$(dirname $0)
ENV=${1:-test}

DEFAULT_SETTINGS="$DIRNAME/../settings.sh"
TEST_SETTINGS="$DIRNAME/../settings.$ENV.sh"

if [ -f $TEST_SETTINGS ]; then
  source $TEST_SETTINGS
elif [ -f $DEFAULT_SETTINGS ]; then
  source $DEFAULT_SETTINGS
fi

NODE_ENV=test mocha \
  --inspect \
  --opts ./$ENV/mocha.opts \
  --watch \
  --watch-extensions ts \
  "$ENV/**/*.ts"