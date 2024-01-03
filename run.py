import subprocess as sp
import sys
from traceback import print_exc
from app import main

try:
    sp.call((sys.executable, "-m", "pip", "install", "-r", "requirements.txt"))
    main()

except Exception:
    print_exc()
    input("Press enter to continue...")
