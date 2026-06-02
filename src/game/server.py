from __future__ import annotations

import argparse
import socketserver
from typing import TextIO

from game.engine import TextGame


class GameTCPHandler(socketserver.StreamRequestHandler):
    def handle(self) -> None:
        game = TextGame()
        reader = self.rfile
        writer = self.wfile

        def output_fn(message: str) -> None:
            writer.write((message + "\r\n").encode("utf-8"))
            writer.flush()

        def input_fn(prompt: str) -> str:
            writer.write(prompt.encode("utf-8"))
            writer.flush()
            line = reader.readline()
            if not line:
                return "quit"
            return line.decode("utf-8", errors="replace").rstrip("\r\n")

        try:
            game.run(input_fn=input_fn, output_fn=output_fn)
        except (BrokenPipeError, ConnectionResetError):
            # Client disconnected unexpectedly.
            return


class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the text game on a TCP port")
    parser.add_argument("--host", default="127.0.0.1", help="Host interface to bind")
    parser.add_argument("--port", type=int, default=5050, help="TCP port to bind")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    with ThreadedTCPServer((args.host, args.port), GameTCPHandler) as server:
        print(f"Game server listening on {args.host}:{args.port}")
        print("Connect with: nc 127.0.0.1 5050")
        server.serve_forever()


if __name__ == "__main__":
    main()
