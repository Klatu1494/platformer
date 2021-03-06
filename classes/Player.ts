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
        function checkHorizontalCollisionOn(point: Point, leftCollision: boolean) {
            var tile: Tile = level.getTileThatCollidesWith(point);
            if (tile) {
                x = leftCollision ? tile.right : tile.left - 1;
                self._horizontalSpeed = 0;
            }
        }

        function checkFloorCollisionOn(point: Point) {
            var tile: Tile = level.getTileThatCollidesWith(point);
            if (tile) {
                y = tile.top - 1;
                self._verticalSpeed = 0;
            }
        }

        function checkCeilCollisionOn(point: Point) {
            var tile: Tile = level.getTileThatCollidesWith(point);
            if (tile) {
                y = tile.bottom;
                self._verticalSpeed *= -0.1;
            }
        }

        var self: Player = this;
        var x: number = this.position.x;
        var y: number = this.position.y;
        var xDirection: number;
        var yDirection: number;
        //horizontal movement
        if (pressedKeys[this._primaryControls.left] || pressedKeys[this._secondaryControls.left])
            this._horizontalSpeed -= this._acceleration;
        if (pressedKeys[this._primaryControls.right] || pressedKeys[this._secondaryControls.right])
            this._horizontalSpeed += this._acceleration;
        xDirection = Math.sign(this._horizontalSpeed);
        this._horizontalSpeed = xDirection * Math.max(0, Math.min(Math.abs(this._horizontalSpeed), this._maxHorizontalSpeed) - this._friction);
        //vertical movement
        if (this.isInWater(level)) {
            if ((pressedKeys[this._primaryControls.up] || pressedKeys[this._secondaryControls.up])) {
                this._verticalSpeed -= this._acceleration;
            }
            if ((pressedKeys[this._primaryControls.down] || pressedKeys[this._secondaryControls.down])) {
                this._verticalSpeed += this._acceleration;
            }
            yDirection = Math.sign(this._verticalSpeed);
            this._verticalSpeed = yDirection * Math.max(0, Math.min(Math.abs(this._verticalSpeed), this._maxVerticalSpeed) - this._friction);
        }
        else {
            this._verticalSpeed += this._weight;
            if (this._onGround && (pressedKeys[this._primaryControls.up] || pressedKeys[this._secondaryControls.up])) {
                this._onGround = false;
                this._verticalSpeed = -this._maxVerticalSpeed;
            }
            yDirection = Math.sign(this._verticalSpeed);
            this._verticalSpeed = yDirection * Math.min(Math.abs(this._verticalSpeed), this._maxVerticalSpeed);
        }
        x += this._horizontalSpeed;
        y += this._verticalSpeed;
        checkHorizontalCollisionOn(new Point(x, y + 0.25), true);
        checkHorizontalCollisionOn(new Point(x, y + 0.75), true);
        checkHorizontalCollisionOn(new Point(x + 1, y + 0.25), false);
        checkHorizontalCollisionOn(new Point(x + 1, y + 0.75), false);
        checkFloorCollisionOn(new Point(x + 0.25, y + 1));
        checkFloorCollisionOn(new Point(x + 0.75, y + 1));
        checkCeilCollisionOn(new Point(x + 0.25, y));
        checkCeilCollisionOn(new Point(x + 0.75, y));
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


    isInWater(level: Level): boolean {
        return level.pointInWater(new Point(this.position.x, this.position.y)) &&
            level.pointInWater(new Point(this.position.x + 1, this.position.y)) &&
            level.pointInWater(new Point(this.position.x, this.position.y + 1)) &&
            level.pointInWater(new Point(this.position.x + 1, this.position.y + 1));
    }
}