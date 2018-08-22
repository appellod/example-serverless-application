#!/bin/bash
set -e

# Authentication
apidoc -i src/microservices/authentication/routes \
  -i src/common/koa/documentation \
  -o src/microservices/authentication/documentation

# Rest
apidoc -i src/microservices/rest/routes \
  -i src/common/koa/documentation \
  -o src/microservices/rest/documentation
