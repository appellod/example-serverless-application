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

NODE_ENV=test nyc mocha \
  --exit \
  --opts ./$ENV/mocha.opts \
  --reporter mocha-multi-reporters \
  --reporter-options configFile="$DIRNAME/../mocha-multi-reporters.json" \
  "$ENV/**/*.ts"