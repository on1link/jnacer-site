"""
Parse content/pages/projects.md into a structured projects_list
exposed in template context. Each H2 section followed by `- key: value`
lines becomes a dict. H2 sections without field lines are skipped.
"""

import re
from pathlib import Path

from pelican import signals


PROJECTS_MD = Path("content/pages/projects.md")

FIELD_RE = re.compile(r"^\s*-\s*([a-zA-Z_]+)\s*:\s*(.+?)\s*$")
H2_RE = re.compile(r"^##\s+(.+?)\s*$")


def parse_projects(md_path: Path) -> list[dict]:
    if not md_path.exists():
        return []
    projects: list[dict] = []
    current: dict | None = None
    for raw in md_path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        h2 = H2_RE.match(line)
        if h2:
            if current and current.get("_has_fields"):
                current.pop("_has_fields", None)
                projects.append(current)
            current = {"title": h2.group(1).strip()}
            continue
        if current is None:
            continue
        field = FIELD_RE.match(line)
        if field:
            key, val = field.group(1).lower(), field.group(2).strip()
            current[key] = val
            current["_has_fields"] = True
    if current and current.get("_has_fields"):
        current.pop("_has_fields", None)
        projects.append(current)

    for p in projects:
        stack = p.get("stack", "")
        p["stack_list"] = [s.strip() for s in stack.split("|") if s.strip()]
        metrics = p.get("metrics", "")
        metric_items: list[tuple[str, str]] = []
        for item in metrics.split("|"):
            item = item.strip()
            if not item:
                continue
            if "=" in item:
                k, v = item.split("=", 1)
                metric_items.append((k.strip(), v.strip()))
        p["metrics_list"] = metric_items
    return projects


def inject_projects(generator, **kwargs):
    base = Path(generator.settings.get("PATH", "content")).parent
    md_path = base / PROJECTS_MD
    generator.context["projects_list"] = parse_projects(md_path)


def register():
    signals.generator_init.connect(inject_projects)
