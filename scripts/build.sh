#!/bin/bash
set -e

# Remove old build.
rm -rf lib/

# Build Typescript files.
tsc

# Copy non-Typescript files.
rsync -aPq --exclude=*.ts ./src/* ./lib/
