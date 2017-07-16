addEventListener("load", () => {
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.move(pressedKeys);
        player.draw(ctx);
        requestAnimationFrame(loop);
    }

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var pressedKeys: Array<boolean> = [];
    var player: Player = new Player(
        new Controls({ up: 87, left: 65, down: 83, right: 68 }),
        new Controls({ up: 87, left: 65, down: 83, right: 68 })
    );
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);
    addEventListener("keydown", (e: KeyboardEvent) => pressedKeys[e.which] = true);
    addEventListener("keyup", (e: KeyboardEvent) => pressedKeys[e.which] = false);
    player.x = innerWidth / 2 - 25;
    player.y = innerHeight / 2 - 25;
    requestAnimationFrame(loop);
});