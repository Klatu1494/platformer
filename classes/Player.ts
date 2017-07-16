class Player {
    private _primaryControls: Controls;
    private _secondaryControls: Controls;
    private _side: number = 50;
    private _speed: number = 5;
    position: Point;

    constructor(primaryControls: Controls, secondaryControls: Controls) {
        this._primaryControls = primaryControls;
        this._secondaryControls = secondaryControls;
    }

    move(pressedKeys: Array<boolean>) {
        var x = this.position.x;
        var y = this.position.y;
        if (pressedKeys[this._primaryControls.left] ||
            pressedKeys[this._secondaryControls.left]) x -= this._speed;
        if (pressedKeys[this._primaryControls.right] ||
            pressedKeys[this._secondaryControls.right]) x += this._speed;
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
}