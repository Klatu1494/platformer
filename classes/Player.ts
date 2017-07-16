class Player {
    private _primaryControls: Controls;
    private _secondaryControls: Controls;
    x: number;
    y: number;
    private _side: number = 50;
    private _speed: number = 5;

    constructor(primaryControls: Controls, secondaryControls: Controls) {
        this._primaryControls = primaryControls;
        this._secondaryControls = secondaryControls;
    }

    move(pressedKeys: Array<boolean>) {
        if (pressedKeys[this._primaryControls.left] ||
            pressedKeys[this._secondaryControls.left]) this.x -= this._speed;
        if (pressedKeys[this._primaryControls.right] ||
            pressedKeys[this._secondaryControls.right]) this.x += this._speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.x, this.y, this._side, this._side);
    }
}