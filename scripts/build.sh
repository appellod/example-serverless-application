#!/bin/bash
set -e

# Remove old build.
rm -rf build/

# Build Typescript files.
tsc

# Copy non-Typescript files.
rsync -aP --exclude=*.ts ./e2e/* ./build/e2e/
rsync -aP --exclude=*.ts ./src/* ./build/src/
rsync -aP --exclude=*.ts ./test/* ./build/test/
