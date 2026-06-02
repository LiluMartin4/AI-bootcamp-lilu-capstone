from game.engine import TextGame


def test_quit_command_stops_game() -> None:
    game = TextGame()
    outputs: list[str] = []
    commands = iter(["quit"])

    game.run(input_fn=lambda _: next(commands), output_fn=outputs.append)

    assert game.running is False
    assert any("Thanks for playing." in line for line in outputs)


def test_take_item_adds_inventory() -> None:
    game = TextGame()
    outputs: list[str] = []

    game.handle_command("take lantern", outputs.append)

    assert "lantern" in game.state.inventory
