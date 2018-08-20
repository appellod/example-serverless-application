#!/bin/bash
set -e

if [ -f settings.test.sh ]; then
  source settings.test.sh
elif [ -f settings.sh ]; then
  source settings.sh
fi

NODE_ENV=test mocha --opts ./test/mocha.opts -r ./ts-node.js --watch-extensions ts --watch --inspect $(find ./test -name '*.ts')
