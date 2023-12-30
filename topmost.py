from dataclasses import dataclass
from typing import cast

import psutil
from pydantic import BaseModel, Field

try:
    import win32con
    import win32gui
    import win32process
except Exception:
    if psutil.WINDOWS:
        raise


@dataclass
class WindowInfo(BaseModel):
    hwnd: int
    title: str
    is_top: int
    name_of_pid: "str|None" = Field(None)
    exe_of_pid: "str|None" = Field(None)

    def set_topmost(self, is_top: bool):
        win32gui.SetWindowPos(
            self.hwnd,
            win32con.HWND_TOPMOST if is_top else win32con.HWND_NOTOPMOST,
            0,
            0,
            0,
            0,
            win32con.SWP_NOMOVE | win32con.SWP_NOSIZE,
        )

    def get_topmost(self):
        return self.__class__.get_hwnd_topmost(hwnd=self.hwnd)

    @staticmethod
    def get_hwnd_topmost(hwnd: int):
        return (
            cast(int, win32gui.GetWindowLong(hwnd, win32con.GWL_EXSTYLE))
            & win32con.WS_EX_TOPMOST
        )


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
            is_top=WindowInfo.get_hwnd_topmost(hwnd=hwnd),
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


def get_visible_windows():
    windows: "list[WindowInfo]" = []
    win32gui.EnumWindows(enum_windows_callback, windows)
    postprocess_list(windows)
    return windows
