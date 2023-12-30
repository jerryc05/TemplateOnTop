from typing import Optional, cast
import os

import psutil
from pydantic import BaseModel


if os.name == "nt":
    import win32con
    import win32gui
    import win32process


class WindowInfo(BaseModel):
    hwnd: int
    title: str
    is_top: "Optional[int]"
    name_of_pid: "Optional[str]" = None
    exe_of_pid: "Optional[str]" = None


def set_hwnd_topmost(hwnd: int, is_top: bool):
    if os.name != "nt":
        return
    win32gui.SetWindowPos(
        hwnd,
        win32con.HWND_TOPMOST if is_top else win32con.HWND_NOTOPMOST,
        0,
        0,
        0,
        0,
        win32con.SWP_NOMOVE | win32con.SWP_NOSIZE,
    )


def get_hwnd_topmost(hwnd: int) -> "Optional[int]":
    if os.name != "nt":
        return None
    return (
        cast(int, win32gui.GetWindowLong(hwnd, win32con.GWL_EXSTYLE))
        & win32con.WS_EX_TOPMOST
    )


def get_visible_windows() -> "list[WindowInfo]":
    if os.name != "nt":
        return [
            WindowInfo(hwnd=0, title=f"不支持{os.name}", is_top=get_hwnd_topmost(0))
        ]

    def enum_windows_callback(hwnd: int, result: "list[WindowInfo]"):
        if not win32gui.IsWindowVisible(hwnd):
            return

        title = win32gui.GetWindowText(hwnd)

        _tid, pid = win32process.GetWindowThreadProcessId(hwnd)
        try:
            name_of_pid = psutil.Process(pid).name()
        except Exception:
            name_of_pid = None

        try:
            exe_of_pid = psutil.Process(pid).exe()
        except Exception:
            exe_of_pid = None

        result.append(
            WindowInfo(
                hwnd=hwnd,
                title=title,
                is_top=get_hwnd_topmost(hwnd=hwnd),
                name_of_pid=name_of_pid,
                exe_of_pid=exe_of_pid,
            )
        )

    def postprocess_list(lst: "list[WindowInfo]"):
        for i in range(len(lst)):
            name = lst[i].name_of_pid
            if name is None:
                continue
            for kw in ("chrome", "firefox", "msedge"):
                if kw in name:
                    lst.insert(0, lst.pop(i))
                    break

    windows: "list[WindowInfo]" = []
    win32gui.EnumWindows(enum_windows_callback, windows)
    postprocess_list(windows)
    return windows
