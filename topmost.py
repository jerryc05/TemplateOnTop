from dataclasses import dataclass
from os import name
from typing import cast

import psutil
import win32con
import win32gui
import win32process


def get_hwnd_topmost(hwnd: int):
    return (
        cast(int, win32gui.GetWindowLong(hwnd, win32con.GWL_EXSTYLE))
        & win32con.WS_EX_TOPMOST
    )


def set_hwnd_topmost(hwnd: int, is_top):
    win32gui.SetWindowPos(
        hwnd,
        win32con.HWND_TOPMOST if is_top else win32con.HWND_NOTOPMOST,
        0,
        0,
        0,
        0,
        win32con.SWP_NOMOVE | win32con.SWP_NOSIZE,
    )


@dataclass
class WindowInfo:
    hwnd: int
    title: str
    is_top: int
    name_of_pid: "str|None"
    exe_of_pid: "str|None"


def enum_windows_callback(hwnd: int, resultList: "list[WindowInfo]"):
    # append tuple of hwnd and window title to resultList
    title = win32gui.GetWindowText(hwnd)
    if not title or title in ("Default IME", "MSCTFIME UI", "Widgets"):
        return
    _tid, pid = win32process.GetWindowThreadProcessId(hwnd)
    try:
        name_of_pid = psutil.Process(pid).name()
    except Exception:
        name_of_pid = None
    try:
        exe_of_pid = psutil.Process(pid).exe()
    except Exception:
        exe_of_pid = None
    resultList.append(
        WindowInfo(
            hwnd=hwnd,
            title=title,
            is_top=get_hwnd_topmost(hwnd=hwnd),
            name_of_pid=name_of_pid,
            exe_of_pid=exe_of_pid,
        )
    )


def postprocess_list(windows: "list[WindowInfo]"):
    for i in range(len(windows)):
        for kw in ("chrome", "firefox", "msedge"):
            if kw in windows[i].name_of_pid:
                windows.insert(0, windows.pop(i))
                break


def get_all_windows():
    # create an empty list to store results
    windows: "list[WindowInfo]" = []
    # call EnumWindows to append all top-level windows to list
    win32gui.EnumWindows(enum_windows_callback, windows)

    postprocess_list(windows)
    return windows


# print all windows
for x in get_all_windows():
    print(x)
