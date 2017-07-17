class Level {
    private static _canvas: HTMLCanvasElement;
    private _width: number;
    private _height: number;
    private _walls: Array<Tile>;
    private _startingPosition: Point;
    private _assets: IAssets;

    constructor(array: Array<Array<string>>, charSize: number, assets: IAssets) {
        var width: number = 0;
        var height: number = array.length;
        for (var row of array) width = Math.max(width, row.length);
        this._width = width * charSize;
        this._height = height * charSize;
        this._assets = assets;
        this._walls = [];
        for (var i: number = 0; i < height; i++) {
            for (var j: number = 0; j < array[i].length; j++) {
                switch (array[i][j]) {
                    case "W":
                        this._walls.push(new Tile(new Point(j * charSize, i * charSize), charSize));
                        break;
                    case "X":
                        this._startingPosition = new Point(j * charSize, i * charSize);
                        break;
                }
            }
        }
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

    getTileThatCollidesWith(point: Point): Tile {
        for (var wall of this._walls) if (wall.contains(point)) return wall;
        return null;
    }

    draw(tileSide: number, leftMargin: number, topMargin: number) {
        var canvas: HTMLCanvasElement = Level.canvas;
        var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(leftMargin, topMargin);
        for (var wall of this._walls)
            if (this._assets.wallImage)
                ctx.drawImage(
                    this._assets.wallImage,
                    Math.floor(wall.left * tileSide),
                    Math.floor(wall.top * tileSide),
                    Math.ceil(wall.side * tileSide),
                    Math.ceil(wall.side * tileSide)
                );
        ctx.translate(-leftMargin, -topMargin);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    //change Player to Creature when Creature is implemented
    moveCreatureToPoint(creature: Player, point: Point) {
        creature.position = point;
    }

    movePlayerToStartingPosition(player: Player) {
        this.moveCreatureToPoint(player, this._startingPosition);
    }
}