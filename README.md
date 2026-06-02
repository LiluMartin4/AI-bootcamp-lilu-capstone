# AI-bootcamp-lilu-capstone

Starter scaffold for a text-based adventure game, including scripts to launch gameplay in a separate terminal window.

## React Web Host

The game is also available as a React app in the `web` folder.

Install and start host:

```bash
cd web
npm install
npm run dev
```

Open in browser:

- http://localhost:5173

## Folder Setup

```text
.
├── assets/
├── saves/
├── scripts/
│   ├── launch_game_terminal.py
│   └── run_game.sh
├── src/
│   └── game/
│       ├── __init__.py
│       ├── engine.py
│       ├── launch_terminal.py
│       ├── main.py
│       ├── server.py
│       └── world.py
├── tests/
│   └── test_engine.py
└── pyproject.toml
```

## Quick Start

Run the game in the current terminal:

```bash
PYTHONPATH=src python3 -m game.main
```

Launch the game in a separate terminal window:

```bash
PYTHONPATH=src python3 scripts/launch_game_terminal.py
```

Alternative runner script:

```bash
bash scripts/run_game.sh
```

Run the game on localhost port `5050`:

```bash
PYTHONPATH=src python3 -m game.server --host 127.0.0.1 --port 5050
```

Connect from another terminal:

```bash
nc 127.0.0.1 5050
```

## Commands In Game

- `look`
- `go <direction>`
- `take <item>`
- `inventory`
- `quit`

## Optional Local Tooling

Run tests:

```bash
PYTHONPATH=src pytest -q
```