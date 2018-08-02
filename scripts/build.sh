#!/bin/bash
set -e

# Remove old build.
rm -rf dist/

# Build Typescript files.
tsc

# Copy non-Typescript files.
cp -r src/documentation/public dist/documentation/public
cp -r src/koa/views dist/koa/views
cp src/test/mocha.opts dist/test/mocha.opts