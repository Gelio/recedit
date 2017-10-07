export class Color {
  public r: number;
  public g: number;
  public b: number;

  constructor(r: number, b: number, g: number) {
    this.r = r;
    this.b = b;
    this.g = g;
  }

  public getFillStyle() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
