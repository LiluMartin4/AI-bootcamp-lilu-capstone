from __future__ import annotations

from dataclasses import dataclass, field
from typing import Callable, List

from game.world import World, default_world

InputFn = Callable[[str], str]
OutputFn = Callable[[str], None]


@dataclass
class GameState:
    current_room: str
    inventory: List[str] = field(default_factory=list)


class TextGame:
    def __init__(self, world: World | None = None) -> None:
        self.world = world or default_world()
        self.state = GameState(current_room=self.world.start_room)
        self.running = True

    def run(self, input_fn: InputFn = input, output_fn: OutputFn = print) -> None:
        output_fn("Welcome to Trail of Echoes.")
        output_fn("Type 'help' to see commands.\n")
        self.describe_room(output_fn)

        while self.running:
            raw = input_fn("\n> ").strip()
            if not raw:
                continue
            self.handle_command(raw, output_fn)

    def handle_command(self, raw: str, output_fn: OutputFn) -> None:
        parts = raw.lower().split()
        command = parts[0]
        arg = " ".join(parts[1:]) if len(parts) > 1 else ""

        if command in {"quit", "exit"}:
            output_fn("Thanks for playing.")
            self.running = False
            return

        if command in {"look", "l"}:
            self.describe_room(output_fn)
            return

        if command in {"go", "move"}:
            if not arg:
                output_fn("Go where? Try: go east")
                return
            self.move(arg, output_fn)
            return

        if command in {"take", "get"}:
            if not arg:
                output_fn("Take what?")
                return
            self.take_item(arg, output_fn)
            return

        if command in {"inventory", "inv", "i"}:
            if self.state.inventory:
                output_fn("Inventory: " + ", ".join(self.state.inventory))
            else:
                output_fn("Inventory: empty")
            return

        if command == "help":
            output_fn("Commands: look, go <direction>, take <item>, inventory, quit")
            return

        output_fn("I do not understand that command.")

    def describe_room(self, output_fn: OutputFn) -> None:
        room = self.world.rooms[self.state.current_room]
        output_fn(f"\n{room.name}")
        output_fn(room.description)
        if room.items:
            output_fn("You see: " + ", ".join(room.items))
        output_fn("Exits: " + ", ".join(room.exits.keys()))

    def move(self, direction: str, output_fn: OutputFn) -> None:
        room = self.world.rooms[self.state.current_room]
        next_room = room.exits.get(direction)
        if not next_room:
            output_fn("You cannot go that way.")
            return
        self.state.current_room = next_room
        self.describe_room(output_fn)

    def take_item(self, item_name: str, output_fn: OutputFn) -> None:
        room = self.world.rooms[self.state.current_room]
        try:
            room.items.remove(item_name)
        except ValueError:
            output_fn("That item is not here.")
            return
        self.state.inventory.append(item_name)
        output_fn(f"You take the {item_name}.")
