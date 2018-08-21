#!/bin/bash
set -e

# Remove old build.
rm -rf dist/

# Build Typescript files.
tsc

# Copy non-Typescript files.
cp -r src/common/koa/documentation dist/src/common/koa/documentation
cp -r src/microservices/authentication/documentation dist/src/microservices/authentication/documentation
cp -r src/microservices/rest/documentation dist/src/microservices/rest/documentation
