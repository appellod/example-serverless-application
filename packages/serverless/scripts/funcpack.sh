#!/bin/bash
set -e

# Pack the build with funcpack.
funcpack pack ./lib -c -e ../webpack.config.js -o ../

# Copy JSON files into funcpack.
cp ./lib/host.json ./.funcpack/host.json

if [ -f ./lib/local.settings.json ]; then
  cp ./lib/local.settings.json ./.funcpack/local.settings.json
fi
