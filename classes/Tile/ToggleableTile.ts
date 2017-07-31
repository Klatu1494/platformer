class ToggleableTile extends Tile {
    private _state: boolean;

    constructor(point: Point, side: number, initialState: boolean) {
        super(point, side);
        this._state = initialState;
    }

    get state(): boolean {
        return this._state;
    }

    toggle() {
        this._state = !this._state;
    }

    activate() {
        this._state = true;
    }

    deactivate() {
        this._state = false;
    }
}