export default class OpenButton {
    constructor(public himself: HTMLInputElement, public gridRow: number[], public gridColumn: number[]) {
        this.himself = himself;
        this.gridRow = gridRow.length == 1 ? [gridRow[0], gridRow[0]] : gridRow;
        this.gridColumn = gridColumn.length == 1 ? [gridColumn[0], gridColumn[0]] : gridColumn;

        himself.style.gridRow = `${this.gridRow[0]} / ${this.gridRow[1]}`;
        himself.style.gridColumn = `${this.gridColumn[0]} / ${this.gridColumn[1]}`;
    }
}