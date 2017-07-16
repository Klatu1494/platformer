class Level {
    private static _canvas: HTMLCanvasElement;
    private _width: number;
    private _height: number;
    private _walls: Array<Tile>;
    private _startingPosition: Point;

    constructor(array: Array<Array<string>>) {
        function onResize() {
            var tileSide: number = Math.min(innerWidth / width, innerHeight / height);
            self._walls = [];
            for (var i: number = 0; i < height; i++) {
                for (var j: number = 0; j < array[i].length; j++) {
                    switch (array[i][j]) {
                        case "W":
                            self._walls.push(new Tile(new Point(j * tileSide, i * tileSide), tileSide));
                            break;
                        case "X":
                            self._startingPosition = new Point(j * tileSide, i * tileSide);
                            break;
                    }
                }
            }
        }

        var self: Level = this;
        var width: number = 0;
        var height: number = array.length;
        for (var row of array) width = Math.max(width, row.length);
        addEventListener("resize", onResize);
        onResize();
    }

    private static createCanvas() {
        function onResize() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        }

        var canvas: HTMLCanvasElement;
        if (this._canvas) return this._canvas;
        canvas = document.createElement("canvas");
        addEventListener("resize", onResize);
        onResize();
        this._canvas = canvas;
    }

    static get canvas(): HTMLCanvasElement {
        if (!this._canvas) this.createCanvas();
        return this._canvas;
    }

    checkColisionOn(point: Point): boolean {
        for (var wall of this._walls) if (wall.contains(point)) return true;
        return false;
    }

    draw() {
        var canvas: HTMLCanvasElement = Level.canvas;
        var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var wall of this._walls) ctx.fillRect(Math.floor(wall.left), Math.floor(wall.top), Math.ceil(wall.side), Math.ceil(wall.side));
    }

    //change Player to Creature when Creature is implemented
    moveCreatureToPoint(creature: Player, point: Point) {
        creature.position = point;
    }

    movePlayerToStartingPosition(player: Player) {
        this.moveCreatureToPoint(player, this._startingPosition);
    }
}