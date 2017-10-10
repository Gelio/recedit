import { Color } from 'common/Color';
import { COLORS } from 'common/COLORS';
import { LineProperties } from 'common/LineProperties';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { LineRasterizer } from 'line-rasterizer/LineRasterizer';

interface RendererDependencies {
  lineRasterizer: LineRasterizer;
}

export class Renderer {
  private canvas: HTMLCanvasElement;
  private renderingContext: CanvasRenderingContext2D;
  private lineRasterizer: LineRasterizer;

  constructor(canvas: HTMLCanvasElement, dependencies: RendererDependencies) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (context === null) {
      throw new Error('Cannot get canvas 2d rendering context');
    }

    this.renderingContext = context;
    this.lineRasterizer = dependencies.lineRasterizer;
  }

  public drawPoint(point: Point, color?: Color) {
    this.drawPixel(point.x, point.y, color);
  }

  public drawPixel(x: number, y: number, color: Color = COLORS.BLACK) {
    this.renderingContext.fillStyle = color.getFillStyle();
    this.renderingContext.fillRect(x, y, 1, 1);
  }

  public drawLine(
    startPoint: Point,
    endPoint: Point,
    lineProperties: LineProperties
  ) {
    const rasterizedLinePoints = this.lineRasterizer.rasterizeLine(
      startPoint,
      endPoint,
      lineProperties.thickness
    );

    rasterizedLinePoints.forEach(point =>
      this.drawPoint(point, lineProperties.color)
    );
  }

  public drawPolygon(polygon: Polygon) {
    // TODO
  }
}
