#!/bin/bash
set -e

COMMAND="concurrently"

for d in ./src/microservices/*/ ; do
  MICROSERVICE=$(basename "$d")
  COMMAND="$COMMAND \"npm run watch $MICROSERVICE\""
done

eval $COMMAND
