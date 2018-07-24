#!/bin/bash

if [ -f settings.sh ]; then
  source settings.sh
fi

node dist/index.js
