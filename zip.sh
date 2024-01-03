#!/usr/bin/env bash

set -euxo pipefail

pnpm build
rm publish.zip || true
zip -9 -r publish.zip dist/ ./*.py ./*.txt





./setup.py py2exe
