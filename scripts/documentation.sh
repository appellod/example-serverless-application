#!/bin/bash
set -e

apidoc -i src/microservices/authentication/ -o src/microservices/authentication/documentation/apidoc/
apidoc -i src/microservices/rest/ -o src/microservices/rest/documentation/apidoc/
