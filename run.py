#!/usr/bin/env python3

import subprocess as sp
import sys
from traceback import print_exc
from app import main

try:
    sp.check_call((sys.executable, "-m", "pip", "install", "-r", "requirements.txt"))
    main()
    input("按回车键退出！")

except Exception:
    print_exc()
    input("寄了，把错误信息截图发给我！！！")
