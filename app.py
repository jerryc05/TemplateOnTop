#!/usr/bin/env python3

import json
from pathlib import Path

from fastapi import FastAPI, HTTPException, status
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from app_topmost import get_visible_windows, WindowInfo, set_hwnd_topmost

#
#
#

api = FastAPI(servers=[{"url": "/api"}])
api.openapi_version = "3.0.3"

app = FastAPI()
app.mount(api.servers[0]["url"], api)

#
#
#

working_dir = Path(__file__).parent.absolute()
frontend_dist = working_dir / "dist"
if frontend_dist.is_dir():
    app.mount(
        "/",
        StaticFiles(directory=frontend_dist, html=True),
    )
else:
    raise RuntimeError(f"Frontend dist directory {frontend_dist} does not exist!")

#
#
#


@api.post("/windows")
def visible_windows() -> "list[WindowInfo]":
    res = get_visible_windows()
    if isinstance(res, str):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"不支持当前操作系统 ({res})，仅支持 Windows！",
        )
    return res


class TopMostRequest(BaseModel):
    hwnd: int
    top: bool


@api.post("/topmost")
def topmost_windows(req: TopMostRequest):
    set_hwnd_topmost(req.hwnd, req.top)


with open(working_dir / "openapi.json", "w") as f:
    json.dump(obj=api.openapi(), fp=f, indent=1)


if __name__ == "__main__":
    import sys

    if sys.argv[1:] == ["--dry-run"]:
        sys.exit(0)

    import os
    import socket
    import uvicorn
    import netifaces

    port = int(os.getenv("PORT", 18080))

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.2)
        if sock.connect_ex(("127.0.0.1", port)) == 0:
            raise RuntimeError(f"Port {port} is already in use!")

    uvicorn.run(  # pyright: ignore[reportUnknownMemberType]
        f"{Path(__file__).stem}:{f'{app=}'.split('=')[0]}",
        port=port,
        reload="--reload" in sys.argv[1:],
        log_level="info",
    )
