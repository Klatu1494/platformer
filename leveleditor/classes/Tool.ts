class Tool {
    private _onMouseDown: Function;
    private _onMouseMove: Function;
    private _onMouseUp: Function;

    constructor(
        onMouseDown: (
            grid: Array<Array<TileType>>,
            ctx: CanvasRenderingContext2D,
            gridX: number,
            gridY: number,
            canvasX: number,
            canvasY: number
        ) => void,
        onMouseMove: (
            grid: Array<Array<TileType>>,
            ctx: CanvasRenderingContext2D,
            gridX: number,
            gridY: number,
            canvasX: number,
            canvasY: number
        ) => void,
        onMouseUp: (
            grid: Array<Array<TileType>>,
            ctx: CanvasRenderingContext2D,
            gridX: number,
            gridY: number,
            canvasX: number,
            canvasY: number
        ) => void
    ) {
        this._onMouseDown = onMouseDown;
        this._onMouseMove = onMouseMove;
        this._onMouseUp = onMouseUp;
    }

    onMouseDown(
        grid: Array<Array<TileType>>,
        ctx: CanvasRenderingContext2D,
        gridX: number,
        gridY: number,
        canvasX: number,
        canvasY: number
    ) {
        this._onMouseDown(grid, ctx, gridX, gridY, canvasX, canvasY);
    }

    onMouseMove(grid: Array<Array<TileType>>,
        ctx: CanvasRenderingContext2D,
        gridX: number,
        gridY: number,
        canvasX: number,
        canvasY: number
    ) {
        this._onMouseMove(grid, ctx, gridX, gridY, canvasX, canvasY);
    }

    onMouseUp(grid: Array<Array<TileType>>,
        ctx: CanvasRenderingContext2D,
        gridX: number,
        gridY: number,
        canvasX: number,
        canvasY: number
    ) {
        this._onMouseUp(grid, ctx, gridX, gridY, canvasX, canvasY);
    }
}