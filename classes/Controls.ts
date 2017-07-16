class Controls {
    private _right: number;
    private _down: number;
    private _left: number;
    private _up: number;

    constructor(
        { up = null, left = null, down = null, right = null }: { up: number, left: number, down: number, right: number }
    ) {
        this._up = up;
        this._left = left;
        this._down = down;
        this._right = right;
    }

    get up(): number {
        return this._up;
    }

    get down(): number {
        return this._down;
    }

    get left(): number {
        return this._left;
    }

    get right(): number {
        return this._right;
    }
}