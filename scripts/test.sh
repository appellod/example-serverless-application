#!/bin/bash
set -e

if [ -f settings.test.sh ]; then
  . settings.test.sh
elif [ -f settings.sh ]; then
  . settings.sh
fi

mocha dist/test --opts dist/test/mocha.opts --exit
