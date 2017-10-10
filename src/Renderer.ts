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

  private fillColor: Color;

  constructor(canvas: HTMLCanvasElement, dependencies: RendererDependencies) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (context === null) {
      throw new Error('Cannot get canvas 2d rendering context');
    }

    this.renderingContext = context;
    this.lineRasterizer = dependencies.lineRasterizer;
    this.setFillColor(COLORS.BLACK);
  }

  public drawPoint(point: Point) {
    this.drawPixel(point.x, point.y);
  }

  public drawPixel(x: number, y: number) {
    this.renderingContext.fillRect(x, y, 1, 1);
  }

  public drawLine(startPoint: Point, endPoint: Point, lineProperties: LineProperties) {
    const rasterizedLinePoints = this.lineRasterizer.rasterizeLine(
      startPoint,
      endPoint,
      lineProperties.thickness
    );

    this.setFillColor(lineProperties.color);
    rasterizedLinePoints.forEach(point => this.drawPoint(point));
  }

  public drawPolygon(polygon: Polygon) {
    const polygonLineProperties = polygon.getLineProperties();
    let previousPoint = null;

    for (const point of polygon.getVerticesIterator()) {
      if (!previousPoint) {
        previousPoint = point;
        continue;
      }

      this.drawLine(previousPoint, point, polygonLineProperties);
      previousPoint = point;
    }

    if (previousPoint) {
      this.drawLine(previousPoint, polygon.getStartingPoint(), polygonLineProperties);
    }
  }

  public clear() {
    this.renderingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public setFillColor(color: Color) {
    if (color === this.fillColor) {
      return;
    }

    this.renderingContext.fillStyle = color.getFillStyle();
  }
}
