#!/usr/bin/env bash

set -euxo pipefail

pnpm build
zip -9 -r publish.zip dist/ ./*.py ./*.txt
