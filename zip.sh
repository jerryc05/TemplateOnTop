#!/usr/bin/env bash

set -euxo pipefail

./_incr-version.py

pnpm build
rm publish.zip || true
zip -9 -r publish.zip dist/ ./*.py ./*.txt ./*.cmd src/*.json
