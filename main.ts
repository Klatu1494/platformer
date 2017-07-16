addEventListener("load", () => {
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.move(pressedKeys);
        player.draw(ctx, tileSide, leftMargin, topMargin);
        requestAnimationFrame(loop);
    }

    function startLevel() {
        var level = levels[currentLevel];
        level.draw(tileSide, leftMargin, topMargin);
        level.movePlayerToStartingPosition(player);
    }

    function onResize() {
        var level = levels[currentLevel];
        tileSide = Math.min(innerWidth / level.width, innerHeight / level.height);
        leftMargin = (innerWidth - level.width * tileSide) / 2;
        topMargin = (innerHeight - level.height * tileSide) / 2;
        level.draw(tileSide, leftMargin, topMargin);
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
            [["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"], ["W", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", " ", " ", " ", " ", " ", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]],
            1
        )
    ];
    var currentLevel: number = 0;
    var leftMargin: number;
    var topMargin: number;
    var tileSide: number;
    onResize();
    startLevel();
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(Level.canvas);
    document.body.appendChild(canvas);
    addEventListener("keydown", (e: KeyboardEvent) => pressedKeys[e.which] = true);
    addEventListener("keyup", (e: KeyboardEvent) => pressedKeys[e.which] = false);
    addEventListener("resize", onResize);
    requestAnimationFrame(loop);
});