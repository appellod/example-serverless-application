#!/bin/bash
set -e

if [ -f settings.sh ]; then
  . settings.sh
fi

node dist/index.js
