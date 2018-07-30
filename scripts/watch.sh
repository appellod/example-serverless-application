#!/bin/bash
set -e

if [ -f settings.sh ]; then
  source settings.sh
fi

nodemon src/index.ts
