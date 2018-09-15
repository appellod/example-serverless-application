#!/bin/bash
set -e

# Remove old build.
rm -rf dist/

# Build Typescript files.
tsc

# Copy non-Typescript files.
rsync -aP --exclude=*.ts ./src/* ./dist/
