addEventListener("load", () => {
    function drawGrid() {
        for (var y: number = 0; y < grid.length; y++) {
            for (var x: number = 0; x < grid[y].length; x++) {
                drawTile(x, y, grid[y][x].color);
            }
        }
    }

    function updateOutput() {
        document.getElementById("output").innerText = JSON.stringify(
            grid.map(
                (row: Array<TileType>) => row.map(
                    (tileType: TileType) => tileType.char
                )
            )
        );
    }

    function expand(horizontal: number, vertical: number) {
        var i: number;
        if (horizontal) {
            var horizontalAbsValue: number = Math.trunc(Math.abs(horizontal));
            gridWidth += horizontalAbsValue;
            for (i = 0; i < horizontalAbsValue; i++)
                for (var row of grid)
                    if (0 < horizontal) row.push(defaultTileType);
                    else row.unshift(defaultTileType);
        }
        if (vertical) {
            var verticalAbsValue: number = Math.trunc(Math.abs(vertical));
            gridHeight += verticalAbsValue;
            for (i = 0; i < verticalAbsValue; i++) {
                var array: Array<TileType> = [];
                for (i = 0; i < gridWidth; i++) array.push(defaultTileType);
                if (0 < vertical) grid.push(array);
                else grid.unshift(array);
            }
        }
        canvas.width = gridWidth * tileSide;
        canvas.height = gridHeight * tileSide;
        drawGrid();
        updateOutput();
    }

    function createTileTypeFromPopup() {
        if (createTileType(
            newTileTypeNameInput.value,
            newTileTypeCharInput.value,
            newTileTypeColorInput.value
        )) document.getElementById("create-tile-type-popup-container").style.display = "none";
    }

    function createTileType(name: string, char: string, color: string): TileType {
        if (TileType.usedNames.has(name)) {
            alert("The name that you selected is already being used.");
            return null;
        }
        if (TileType.usedChars.has(char)) {
            alert("The character that you selected is already being used.");
            return null;
        }
        if (TileType.usedColors.has(color)) {
            alert("The color that you selected is already being used.");
            return null;
        }
        var tileType: TileType = new TileType(name, char, color);
        defaultTileTypeSelect.appendChild(tileType.defaultOption);
        defaultTileTypeSelect.addEventListener("change", function () {
            if (this.selectedOptions[0] === tileType.defaultOption)
                defaultTileType = tileType;
        });
        selectedTileTypeSelect.appendChild(tileType.selectedOption);
        selectedTileTypeSelect.addEventListener("change", function () {
            if (this.selectedOptions[0] === tileType.selectedOption)
                selectedTileType = tileType;
        });
        tileType.selectedOption.selected = true;
        selectedTileType = tileType;
        return tileType;
    }

    function drawTile(x: number, y: number, color: string) {
        ctx.fillStyle = color;
        ctx.fillRect(x * tileSide, y * tileSide, tileSide, tileSide);
        ctx.strokeRect(x * tileSide, y * tileSide, tileSide, tileSide);
    }

    var canvas: HTMLCanvasElement = document.createElement("canvas");
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    var mouseDown = false;
    var defaultTileTypeSelect: HTMLSelectElement = document.createElement("select");
    var selectedTileTypeSelect: HTMLSelectElement = document.createElement("select");
    var newTileTypeNameInput: HTMLInputElement = document.createElement("input");
    var newTileTypeCharInput: HTMLInputElement = document.createElement("input");
    var newTileTypeColorInput: HTMLInputElement = document.createElement("input");
    var defaultTileType: TileType = createTileType("Empty", " ", "#ffffff");
    var selectedTileType: TileType = defaultTileType;
    var grid: Array<Array<TileType>> = [[defaultTileType]];
    var gridWidth: number = 1;
    var gridHeight: number = 1;
    var tileSide: number = 10;
    document.getElementById("expand-nw").addEventListener(
        "click", () => expand(-1, -1)
    );
    document.getElementById("expand-n").addEventListener(
        "click", () => expand(0, -1)
    );
    document.getElementById("expand-ne").addEventListener(
        "click", () => expand(1, -1)
    );
    document.getElementById("expand-w").addEventListener(
        "click", () => expand(-1, 0)
    );
    document.getElementById("expand-e").addEventListener(
        "click", () => expand(1, 0)
    );
    document.getElementById("expand-sw").addEventListener(
        "click", () => expand(-1, 1)
    );
    document.getElementById("expand-s").addEventListener(
        "click", () => expand(0, 1)
    );
    document.getElementById("expand-se").addEventListener(
        "click", () => expand(1, 1)
    );
    document.getElementById("canvas-td").appendChild(canvas);
    defaultTileTypeSelect.id = "default-tile-type";
    document.getElementById("default-tile-type-div").appendChild(
        defaultTileTypeSelect
    );
    selectedTileTypeSelect.id = "selected-tile-type";
    document.getElementById("selected-tile-type-div").appendChild(
        selectedTileTypeSelect
    );
    document.getElementById("create-tile-type-button").addEventListener(
        "click",
        () => {
            document.getElementById("create-tile-type-popup-container").style.display = "flex";
        }
    );
    document.getElementById("new-tile-type-name-div").appendChild(newTileTypeNameInput);
    newTileTypeNameInput.id = "new-tile-type-name";
    document.getElementById("new-tile-type-char-div").appendChild(newTileTypeCharInput);
    newTileTypeCharInput.id = "new-tile-type-char";
    newTileTypeCharInput.maxLength = 1;
    document.getElementById("new-tile-type-color-div").appendChild(newTileTypeColorInput);
    newTileTypeColorInput.id = "new-tile-type-color";
    newTileTypeColorInput.type = "color";
    document.getElementById("create-tile-type-popup-button").addEventListener(
        "click",
        createTileTypeFromPopup
    );
    canvas.width = tileSide;
    canvas.height = tileSide;
    var currentTool = new Tool(
        (
            grid: Array<Array<TileType>>,
            ctx: CanvasRenderingContext2D,
            gridX: number,
            gridY: number,
            canvasX: number,
            canvasY: number
        ) => {
            grid[gridY][gridX] = selectedTileType;
            drawTile(gridX, gridY, selectedTileType.color);
        },
        (
            grid: Array<Array<TileType>>,
            ctx: CanvasRenderingContext2D,
            gridX: number,
            gridY: number,
            canvasX: number,
            canvasY: number
        ) => {
            grid[gridY][gridX] = selectedTileType;
            drawTile(gridX, gridY, selectedTileType.color);
        },
        (
            grid: Array<Array<TileType>>,
            ctx: CanvasRenderingContext2D,
            gridX: number,
            gridY: number,
            canvasX: number,
            canvasY: number
        ) => { }
    );
    canvas.addEventListener("mousedown", function (e: MouseEvent) {
        mouseDown = true;
        var canvasX = e.offsetX;
        var canvasY = e.offsetY;
        currentTool.onMouseDown(
            grid,
            ctx,
            Math.floor(canvasX / tileSide),
            Math.floor(canvasY / tileSide),
            canvasX,
            canvasY
        );
        updateOutput();
    });
    canvas.addEventListener("mousemove", function (e: MouseEvent) {
        if (mouseDown) {
            var canvasX = e.offsetX;
            var canvasY = e.offsetY;
            if (0 < canvasX && canvasX < canvas.width && 0 < canvasY && canvasY < canvas.height) {
                currentTool.onMouseMove(
                    grid,
                    ctx,
                    Math.floor(canvasX / tileSide),
                    Math.floor(canvasY / tileSide),
                    canvasX,
                    canvasY
                );
                updateOutput();
            }
        }
    });
    canvas.addEventListener("mouseup", function (e: MouseEvent) {
        mouseDown = false;
        var canvasX = e.offsetX;
        var canvasY = e.offsetY;
        currentTool.onMouseUp(
            grid,
            ctx,
            Math.floor(canvasX / tileSide),
            Math.floor(canvasY / tileSide),
            canvasX,
            canvasY
        );
        updateOutput();
    });
    drawGrid();
    updateOutput();
});