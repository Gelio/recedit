import { Line } from 'common/Line';
import { Point } from 'common/Point';

describe('Line', () => {
  it('should instantiate correctly for two different points', () => {
    const p1 = new Point(0, 5);
    const p2 = new Point(0, 10);

    expect(new Line(p1, p2)).toBeDefined();
  });

  it('should throw an error when it\'s the same point', () => {
    const p1 = new Point(0, 5);
    const p2 = new Point(0, 5);

    expect(() => new Line(p1, p2)).toThrow();
  });

  describe('distanceToPoint', () => {
    it('should work when point is near the line', () => {
      const p1 = new Point(0, 5);
      const p2 = new Point(0, 10);
      const line = new Line(p1, p2);

      const p = new Point(1, 8);

      expect(line.distanceToPoint(p)).toEqual(1);
    });

    it('should work when point is out of bounds of the line', () => {
      const p1 = new Point(0, 5);
      const p2 = new Point(5, 10);
      const line = new Line(p1, p2);

      const p = new Point(100, 202);

      expect(line.distanceToPoint(p)).toBeGreaterThan(50);
    });
  });
});
