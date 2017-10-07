import { Point } from 'common/Point';
import { LineRasterizer } from 'LineRasterizer';

describe('LineRasterizer', () => {
  let lineRasterizer: LineRasterizer;

  beforeAll(() => {
    lineRasterizer = new LineRasterizer();
  });

  describe('rasterizeLine', () => {
    describe('diagonal directions', () => {
      it('should return a straight line north', () => {
        const startPoint = new Point(0, 0);
        const endPoint = new Point(0, 5);

        const rasterizedLine = lineRasterizer.rasterizeLine(
          startPoint,
          endPoint,
          1
        );
        expect(rasterizedLine).toHaveLength(6);
        expect(rasterizedLine.filter(point => point.x !== 0)).toHaveLength(0);

        rasterizedLine.reduce((previousPoint, point) => {
          expect(point.y).toBe(previousPoint.y + 1);

          return point;
        });
      });

      it('should return a straight line east', () => {
        const startPoint = new Point(0, 0);
        const endPoint = new Point(5, 0);

        const rasterizedLine = lineRasterizer.rasterizeLine(
          startPoint,
          endPoint,
          1
        );
        expect(rasterizedLine).toHaveLength(6);
        expect(rasterizedLine.filter(point => point.y !== 0)).toHaveLength(0);

        rasterizedLine.reduce((previousPoint, point) => {
          expect(point.x).toBe(previousPoint.x + 1);

          return point;
        });
      });

      it('should return a straight line south', () => {
        const startPoint = new Point(0, 0);
        const endPoint = new Point(0, -5);

        const rasterizedLine = lineRasterizer.rasterizeLine(
          startPoint,
          endPoint,
          1
        );
        expect(rasterizedLine).toHaveLength(6);
        expect(rasterizedLine.filter(point => point.x !== 0)).toHaveLength(0);

        rasterizedLine.reduce((previousPoint, point) => {
          expect(point.y).toBe(previousPoint.y - 1);

          return point;
        });
      });

      it('should return a straight line west', () => {
        const startPoint = new Point(0, 0);
        const endPoint = new Point(-5, 0);

        const rasterizedLine = lineRasterizer.rasterizeLine(
          startPoint,
          endPoint,
          1
        );
        expect(rasterizedLine).toHaveLength(6);
        expect(rasterizedLine.filter(point => point.y !== 0)).toHaveLength(0);

        rasterizedLine.reduce((previousPoint, point) => {
          expect(point.x).toBe(previousPoint.x - 1);

          return point;
        });
      });
    });
  });
});
