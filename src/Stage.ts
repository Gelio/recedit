import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';

export class Stage {
  public polygons: Polygon[] = [];
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
}
