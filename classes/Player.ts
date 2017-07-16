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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(Math.floor(this.position.x), Math.floor(this.position.y), Math.ceil(this._side), Math.ceil(this._side));
    }
}