class Player {
    private _primaryControls: Controls;
    private _secondaryControls: Controls;
    private _acceleration: number = 0.02;
    private _maxVerticalSpeed: number = 0.24;
    private _weight = 0.007; //this value must not divide this._maxVerticalSpeed
    private _horizontalSpeed: number;
    private _friction = 0.01;
    private _maxHorizontalSpeed: number = 0.2;
    private _verticalSpeed: number;
    private _onGround: boolean;
    position: Point;

    constructor(primaryControls: Controls, secondaryControls: Controls) {
        this._primaryControls = primaryControls;
        this._secondaryControls = secondaryControls;
    }

    move(pressedKeys: Array<boolean>, level: Level) {
        var x: number = this.position.x;
        var y: number = this.position.y;
        var xDirection: number;
        var yDirection: number;
        var tile: Tile;
        if (pressedKeys[this._primaryControls.left] || pressedKeys[this._secondaryControls.left])
            this._horizontalSpeed -= this._acceleration;
        if (pressedKeys[this._primaryControls.right] || pressedKeys[this._secondaryControls.right])
            this._horizontalSpeed += this._acceleration;
        this._verticalSpeed += this._weight;
        if (this._onGround && (pressedKeys[this._primaryControls.up] || pressedKeys[this._secondaryControls.up])) {
            this._onGround = false;
            this._verticalSpeed = -this._maxVerticalSpeed;
        }
        xDirection = Math.sign(this._horizontalSpeed);
        yDirection = Math.sign(this._verticalSpeed);
        this._horizontalSpeed = xDirection * Math.max(0, Math.min(Math.abs(this._horizontalSpeed), this._maxHorizontalSpeed) - this._friction);
        this._verticalSpeed = yDirection * Math.min(Math.abs(this._verticalSpeed), this._maxVerticalSpeed);
        x += this._horizontalSpeed;
        y += this._verticalSpeed;
        tile = level.getTileThatCollidesWith(new Point(x, y + 0.25));
        if (tile) {
            x = tile.right;
            this._horizontalSpeed = 0;
        }
        tile = level.getTileThatCollidesWith(new Point(x + 1, y + 0.25));
        if (tile) {
            x = tile.left - 1;
            this._horizontalSpeed = 0;
        }
        tile = level.getTileThatCollidesWith(new Point(x, y + 0.75));
        if (tile) {
            x = tile.right;
            this._horizontalSpeed = 0;
        }
        tile = level.getTileThatCollidesWith(new Point(x + 1, y + 0.75));
        if (tile) {
            x = tile.left - 1;
            this._horizontalSpeed = 0;
        }
        tile = level.getTileThatCollidesWith(new Point(x + 0.25, y + 1));
        if (tile) {
            y = tile.top - 1;
            this._verticalSpeed = 0;
        }
        tile = level.getTileThatCollidesWith(new Point(x + 0.75, y + 1));
        if (tile) {
            y = tile.top - 1;
            this._verticalSpeed = 0;
        }
        tile = level.getTileThatCollidesWith(new Point(x + 0.25, y));
        if (tile) {
            y = tile.bottom;
            this._verticalSpeed *= -0.1;
        }
        tile = level.getTileThatCollidesWith(new Point(x + 0.75, y));
        if (tile) {
            y = tile.bottom;
            this._verticalSpeed *= -0.1;
        }
        this._onGround = !this._verticalSpeed;
        this.position = new Point(x, y);
    }

    draw(ctx: CanvasRenderingContext2D, tileSide: number, leftMargin: number, topMargin: number) {
        ctx.fillRect(
            Math.floor(leftMargin + this.position.x * tileSide),
            Math.floor(topMargin + this.position.y * tileSide),
            Math.ceil(tileSide),
            Math.ceil(tileSide)
        );
    }

    stop() {
        this._horizontalSpeed = 0;
        this._verticalSpeed = 0;
        this._onGround = false;
    }
}