#!/usr/bin/env python3
from pathlib import Path
import json

with Path(__file__).parent.joinpath("src/version.json").open("r+") as f:
    obj = json.load(f)
    obj["version"] += 1
    f.truncate(0)
    f.seek(0)
    json.dump(obj, f)
