from __future__ import annotations

import os
import shlex
import shutil
import subprocess
import sys
from pathlib import Path


def launch_linux(project_root: Path, python_exec: str) -> None:
    command = (
        f"cd {shlex.quote(str(project_root))} && "
        f"PYTHONPATH={shlex.quote(str(project_root / 'src'))} "
        f"{shlex.quote(python_exec)} -m game.main; "
        "printf '\\nPress Enter to close...'; read _"
    )

    terminal_candidates = [
        "x-terminal-emulator",
        "gnome-terminal",
        "konsole",
        "xfce4-terminal",
        "xterm",
    ]

    for terminal in terminal_candidates:
        if shutil.which(terminal):
            if terminal == "gnome-terminal":
                subprocess.Popen([terminal, "--", "bash", "-lc", command])
            else:
                subprocess.Popen([terminal, "-e", "bash", "-lc", command])
            return

    raise RuntimeError(
        "No supported terminal emulator found. Install one of: "
        + ", ".join(terminal_candidates)
    )


def launch_macos(project_root: Path, python_exec: str) -> None:
    command = (
        f"cd {shlex.quote(str(project_root))}; "
        f"PYTHONPATH={shlex.quote(str(project_root / 'src'))} "
        f"{shlex.quote(python_exec)} -m game.main"
    )
    apple_script = f'tell application "Terminal" to do script "{command}"'
    subprocess.Popen(["osascript", "-e", apple_script])


def launch_windows(project_root: Path, python_exec: str) -> None:
    command = (
        f"cd /d {project_root} && "
        f"set PYTHONPATH={project_root / 'src'} && "
        f"{python_exec} -m game.main"
    )
    subprocess.Popen(["cmd", "/c", "start", "cmd", "/k", command], shell=True)


def main() -> None:
    project_root = Path(__file__).resolve().parent.parent.parent
    python_exec = sys.executable

    if os.name == "nt":
        launch_windows(project_root, python_exec)
        return

    if sys.platform == "darwin":
        launch_macos(project_root, python_exec)
        return

    launch_linux(project_root, python_exec)
