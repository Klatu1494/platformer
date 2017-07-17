class ImageLoader {
    private _promise: Promise<HTMLImageElement>;

    constructor(src: string) {
        this._promise = new Promise((resolve) => {
            var img: HTMLImageElement = document.createElement("img");
            img.src = src;
            img.addEventListener("load", () => resolve(img));
        })
    }

    get promise(): Promise<HTMLImageElement> {
        return this._promise;
    }
}