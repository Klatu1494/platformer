addEventListener("load", () => {
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.move(pressedKeys);
        player.draw(ctx);
        requestAnimationFrame(loop);
    }

    function startLevel() {
        var level = levels[currentLevel];
        level.draw();
        level.movePlayerToStartingPosition(player);
    }

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var pressedKeys: Array<boolean> = [];
    var player: Player = new Player(
        new Controls({ up: 87, left: 65, down: 83, right: 68 }),
        new Controls({ up: 87, left: 65, down: 83, right: 68 })
    );
    var levels = [
        new Level(
            [["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"], ["W", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]]
        )
    ]
    var currentLevel: number = 0;
    startLevel();
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(Level.canvas);
    document.body.appendChild(canvas);
    addEventListener("keydown", (e: KeyboardEvent) => pressedKeys[e.which] = true);
    addEventListener("keyup", (e: KeyboardEvent) => pressedKeys[e.which] = false);
    addEventListener("resize", () => levels[currentLevel].draw());
    requestAnimationFrame(loop);
});