class TileType {
    static usedNames: Set<string> = new Set();
    static usedColors: Set<string> = new Set();
    static usedChars: Set<string> = new Set();
    private _defaultOption: HTMLOptionElement;
    private _selectedOption: HTMLOptionElement;
    name: string;
    char: string;
    color: string;

    constructor(name: string, char: string, color: string) {
        var defaultOption: HTMLOptionElement = document.createElement("option");
        var selectedOption: HTMLOptionElement = document.createElement("option");
        defaultOption.innerText = name;
        selectedOption.innerText = name;
        TileType.usedNames.add(name);
        TileType.usedChars.add(char);
        TileType.usedColors.add(color);
        this.name = name;
        this.char = char;
        this.color = color;
        this._defaultOption = defaultOption;
        this._selectedOption = selectedOption;
    }

    get defaultOption(): HTMLOptionElement {
        return this._defaultOption;
    }

    get selectedOption(): HTMLOptionElement {
        return this._selectedOption;
    }
}