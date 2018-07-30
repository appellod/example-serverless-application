#!/bin/bash
set -e

if [ -f settings.test.sh ]; then
  source settings.test.sh
elif [ -f settings.sh ]; then
  source settings.sh
fi

mocha --opts ./src/test/mocha.opts -r ./ts-node.js --watch-extensions ts --watch --inspect $(find ./src/test -name '*.ts') 
