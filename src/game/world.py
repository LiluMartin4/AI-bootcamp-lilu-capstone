from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class Room:
    name: str
    description: str
    exits: Dict[str, str]
    items: List[str] = field(default_factory=list)


@dataclass
class World:
    rooms: Dict[str, Room]
    start_room: str


def default_world() -> World:
    rooms = {
        "camp": Room(
            name="Camp",
            description="A quiet campsite with an old lantern and a trail heading east.",
            exits={"east": "forest"},
            items=["lantern"],
        ),
        "forest": Room(
            name="Forest Path",
            description="Tall trees line the path. You can hear running water to the north.",
            exits={"west": "camp", "north": "stream"},
            items=[],
        ),
        "stream": Room(
            name="Stream",
            description="A clear stream blocks the way. There is a small wooden bridge nearby.",
            exits={"south": "forest"},
            items=["coin"],
        ),
    }
    return World(rooms=rooms, start_room="camp")
