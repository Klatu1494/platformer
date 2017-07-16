class Tile {
    private _left: number;
    private _top: number;
    private _right: number;
    private _bottom: number;
    private _side: number;

    constructor(point: Point, side: number) {
        var x: number = point.x;
        var y: number = point.y;
        this._left = x;
        this._top = y;
        this._right = x + side;
        this._bottom = y + side;
        this._side = side;
    }

    get side(): number {
        return this._side;
    }

    get top(): number {
        return this._top;
    }

    get bottom(): number {
        return this._bottom;
    }

    get left(): number {
        return this._left;
    }

    get right(): number {
        return this._right;
    }

    contains(point: Point): boolean {
        return (
            this.left < point.x && point.x < this.right &&
            this.top < point.y && point.y < this.bottom
        );
    }
}