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
    var brown: ImageLoader = new ImageLoader(color("#473425"));
    var wallImage: ImageLoader = new ImageLoader("https://0.s3.envato.com/files/55664521/tuongda2.jpg");
    Promise.all([wallImage.promise, green.promise, water.promise, brown.promise]).then(async function () {
        function loop() {
            onLoop();
            requestAnimationFrame(loop);
        }

        function onLoop() {
            levels[currentLevel].customScript();
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            player.move(pressedKeys, levels[currentLevel]);
            player.draw(ctx, tileSide, leftMargin, topMargin);
        }

        function startLevel() {
            var level = levels[currentLevel];
            level.movePlayerToStartingPosition(player);
            player.stop();
            requestAnimationFrame(drawLevel);
        }

        function onResize() {
            var level = levels[currentLevel];
            tileSide = Math.min(innerWidth / level.width, innerHeight / level.height);
            leftMargin = (innerWidth - level.width * tileSide) / 2;
            topMargin = (innerHeight - level.height * tileSide) / 2;
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            requestAnimationFrame(drawLevel);
            onLoop();
        }

        function drawLevel() {
            var level = levels[currentLevel];
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
                { wall: await green.promise, water: await water.promise, toggleableWall: await brown.promise },
                (level: Level) => {
                    if (new Tile(new Point(6, 12), 2).contains(player.position)) {
                        level.deactivateWalls();
                        drawLevel();
                    }
                }
            )
        ];
        var currentLevel: number = 0;
        let leftMargin: number = 0;
        let topMargin: number = 0;
        let tileSide: number = 0;
        startLevel();
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        document.body.appendChild(Level.canvas);
        document.body.appendChild(canvas);
        addEventListener("keydown", (e: KeyboardEvent) => pressedKeys[e.which] = true);
        addEventListener("keyup", (e: KeyboardEvent) => pressedKeys[e.which] = false);
        addEventListener("resize", onResize);
        onResize();
        requestAnimationFrame(loop);
    });
});