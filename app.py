#!/usr/bin/env python3

import asyncio
import json
from pathlib import Path
import time
from typing import Any, cast
import sys

from fastapi import FastAPI, HTTPException, Response, status
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from tinydb import JSONStorage, TinyDB, where
from tinydb.table import Document

from app_topmost import WindowInfo, get_visible_windows, set_hwnd_topmost

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


class CachedStaticFiles(StaticFiles):
    def file_response(self, *args: Any, **kwargs: Any):
        resp = super().file_response(*args, **kwargs)
        if self.directory is not None and isinstance(resp, FileResponse):
            if (Path(self.directory) / "assets") in Path(resp.path).parents:
                if resp.headers.get("Cache-Control"):
                    print(resp.headers.get("Cache-Control"))
                resp.headers["Cache-Control"] = (
                    "public, max-age=31536000, immutable, "
                    + resp.headers.get("Cache-Control", "")
                )
        return resp


if frontend_dist.is_dir():
    app.mount(
        "/",
        CachedStaticFiles(directory=frontend_dist, html=True),
    )
else:
    raise RuntimeError(f"Frontend dist directory {frontend_dist} does not exist!")

#
#
#


class MyJSONStorage(JSONStorage):
    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(  # pyright: ignore[reportUnknownMemberType]
            *args, **kwargs, indent=1
        )


TinyDB.default_query_cache_capacity = 30
TinyDB.default_storage_class = MyJSONStorage
db = TinyDB(working_dir / "db.json")

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


#
#
#

IdT = int
TitleT = str
HtmlT = str
LastModifiedT = float
CreatedT = float
FIELD_NAME_LAST_MODIFIED = "last_modified"
FIELD_NAME_CREATED = "created"


class TemplateOnlyTitleOrHtml(BaseModel):
    title: "TitleT|None" = None
    html: "HtmlT|None" = None


class TemplateContent(BaseModel):
    title: TitleT
    html: HtmlT


class TemplateNoId(TemplateContent):
    last_modified: LastModifiedT
    created: CreatedT


assert FIELD_NAME_LAST_MODIFIED in TemplateNoId.model_fields
assert FIELD_NAME_CREATED in TemplateNoId.model_fields


class Template(TemplateNoId):
    id: IdT


def template_from_doc(doc: Document) -> "Template":
    return Template(
        id=doc.doc_id,
        **doc,  # pyright: ignore[reportUnknownArgumentType]
    )


@api.get("/templates")
def get_all_templates() -> "list[Template]":
    return [template_from_doc(x) for x in db.all()]


def postprocess_db_get(res: "Document|list[Document]|None"):
    rt: "list[Template]" = []
    if res is not None:
        if not isinstance(res, list):
            rt = [template_from_doc(res)]
        else:
            rt = [template_from_doc(x) for x in res]
    return rt


@api.get("/templates/id/{id_}")
def get_template_by_id(id_: int) -> "Template":
    res = db.get(doc_id=id_)  # pyright: ignore[reportUnknownMemberType]
    return template_from_doc(cast(Document, res))


@api.get("/templates/title/{title}")
def get_template_by_title(title: str) -> "list[Template]":
    res = db.search(where("title") == title)  # pyright: ignore[reportUnknownMemberType]
    return postprocess_db_get(res)


@api.post("/templates")
def create_template(resp: Response, template: TemplateContent) -> int:
    cur_time = time.time()
    res = db.insert(  # pyright: ignore[reportUnknownMemberType]
        TemplateNoId(
            title=template.title,
            html=template.html,
            created=cur_time,
            last_modified=cur_time,
        ).model_dump()
    )
    resp.status_code = status.HTTP_201_CREATED
    return res


@api.patch("/templates/id/{id_}")
def patch_template(id_: int, template: TemplateOnlyTitleOrHtml) -> "list[int]":
    res = db.update(  # pyright: ignore[reportUnknownMemberType]
        fields={
            **{k: v for (k, v) in template.model_dump().items() if v is not None},
            FIELD_NAME_LAST_MODIFIED: time.time(),
        },
        doc_ids=[id_],
    )
    return res


@api.delete("/templates/{id_}")
def delete_template(id_: int) -> "list[int]":
    return db.remove(doc_ids=[id_])


#
#
#


@api.get("/ping")
def ping():
    return


with open(working_dir / "openapi.json", "w") as f:
    json.dump(obj=api.openapi(), fp=f, indent=1)


def main():
    import ipaddress
    import os
    import socket
    import webbrowser
    import uvicorn

    host = str(ipaddress.ip_address(socket.INADDR_LOOPBACK))
    port = int(os.getenv("PORT", 18080))

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.2)
        if sock.connect_ex((host, port)) == 0:
            raise RuntimeError(f"Port {port} is already in use!")

    webbrowser.open_new(f"http://{host}:{port}/")

    uvicorn.run(  # pyright: ignore[reportUnknownMemberType]
        f"{Path(__file__).stem}:{f'{app=}'.split('=')[0]}",
        port=port,
        reload="--reload" in sys.argv[1:],
        log_level="info",
    )


if __name__ == "__main__":
    if sys.argv[1:] == ["--dry-run"]:
        sys.exit(0)
    main()
