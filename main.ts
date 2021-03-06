addEventListener("load", () => {
    function color(color: string) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 1;
        canvas.height = 1;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return canvas.toDataURL();
    }
    var green: ImageLoader = new ImageLoader(color("#39741C"));
    var water: ImageLoader = new ImageLoader(color("#5C877C"));
    var wallImage: ImageLoader = new ImageLoader("https://0.s3.envato.com/files/55664521/tuongda2.jpg");
    Promise.all([wallImage]).then(async function () {
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.move(pressedKeys, levels[currentLevel]);
            player.draw(ctx, tileSide, leftMargin, topMargin);
            requestAnimationFrame(loop);
        }

        function startLevel() {
            var level = levels[currentLevel];
            level.draw(tileSide, leftMargin, topMargin);
            level.movePlayerToStartingPosition(player);
            player.stop();
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
                [["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "w", "w", "w", "w", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", "X", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "w", "w", "w", "w", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "T", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "W", "W", "w", "w", "w", "w", "w", "w", "w"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "W", "W", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "W", "W", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "w", "w", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "w", "w", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "w", "w", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "w", "w", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "w", "w", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "w", "w", "w", "w", "w", "w", "w", "w", "W", "W", "W", "W"], ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]],
                0.5,
                { wall: await green.promise, water: await water.promise }
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
});