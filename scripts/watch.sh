#!/bin/bash
set -e

if [ -f settings.sh ]; then
  source settings.sh
fi

knex migrate:latest
nodemon src/index.ts
