import { Color } from 'common/Color';
import { COLORS } from 'common/COLORS';
import { Point } from 'common/Point';
import { LineRasterizer } from 'LineRasterizer';

interface RendererDependencies {
  lineRasterizer: LineRasterizer;
}

interface LineProperties {
  color: Color;
  thickness: number;
}

export class Renderer {
  private canvas: HTMLCanvasElement;
  private renderingContext: CanvasRenderingContext2D;
  private lineRasterizer: LineRasterizer;

  constructor(canvas: HTMLCanvasElement, dependencies: RendererDependencies) {
    this.canvas = canvas;
    this.renderingContext = canvas.getContext('2d');
    this.lineRasterizer = dependencies.lineRasterizer;
  }

  public drawPoint(point: Point, color?: Color) {
    this.drawPixel(point.x, point.y, color);
  }

  public drawPixel(x: number, y: number, color: Color = COLORS.BLACK) {
    this.renderingContext.fillStyle = color.getFillStyle();
    this.renderingContext.fillRect(x, y, 1, 1);
  }

  public drawLine(startPoint: Point, endPoint: Point, lineProperties: Partial<LineProperties> = {}) {
    lineProperties.color = lineProperties.color || COLORS.BLACK;
    lineProperties.thickness = lineProperties.thickness || 1;

    const rasterizedLinePoints = this.lineRasterizer.rasterizeLine(startPoint, endPoint, lineProperties.thickness);

    rasterizedLinePoints.forEach(point => this.drawPoint(point, lineProperties.color));
  }
}
