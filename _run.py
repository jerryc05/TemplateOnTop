#!/usr/bin/env python3

import subprocess as sp
import sys
import time
from traceback import print_exc
from pathlib import Path
from app import main

try:
    sp.check_call(
        (
            sys.executable,
            "-m",
            "pip",
            "install",
            "-r",
            str(Path(__file__).parent / "requirements.txt"),
        )
    )
    main()
    print("\n\n按回车键退出！\n\n")
except KeyboardInterrupt:
    ...
except Exception:
    print_exc()
    print("\n\n它寄了！！！把错误信息截图发给我！！！\n\n")

time.sleep(3)
input()
