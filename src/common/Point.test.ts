import { Octant } from 'common/Octant';
import { Point } from 'common/Point';

describe('Point', () => {
  it('should instantiate correctly', () => {
    expect(new Point(1, 2)).toBeDefined();
  });

  describe('getOctant', () => {
    it('should work for the first octant', () => {
      const point = new Point(5, 2);
      expect(point.getOctant()).toEqual(Octant.First);
    });

    it('should work for the second octant', () => {
      const point = new Point(2, 5);
      expect(point.getOctant()).toEqual(Octant.Second);
    });

    it('should work for the third octant', () => {
      const point = new Point(-2, 5);
      expect(point.getOctant()).toEqual(Octant.Third);
    });

    it('should work for the fourth octant', () => {
      const point = new Point(-5, 2);
      expect(point.getOctant()).toEqual(Octant.Fourth);
    });

    it('should work for the fifth octant', () => {
      const point = new Point(-5, -2);
      expect(point.getOctant()).toEqual(Octant.Fifth);
    });

    it('should work for the sixth octant', () => {
      const point = new Point(-2, -5);
      expect(point.getOctant()).toEqual(Octant.Sixth);
    });

    it('should work for the seventh octant', () => {
      const point = new Point(2, -5);
      expect(point.getOctant()).toEqual(Octant.Seventh);
    });

    it('should work for the eighth octant', () => {
      const point = new Point(5, -2);
      expect(point.getOctant()).toEqual(Octant.Eighth);
    });
  });

  describe('equals', () => {
    it('should return true for points with the same coordinates', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(1, 2);

      expect(p1.equals(p2)).toBe(true);
    });

    it('should return false for points with different coordinates', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(3, 4);

      expect(p1.equals(p2)).toBe(false);
    });
  });

  describe('getDistanceSquaredTo', () => {
    it('should return correct results', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(1, 4);

      expect(p1.getDistanceSquaredTo(p2)).toEqual(4);
    });

    it('should be symmetric', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(1, 4);

      const distance1 = p1.getDistanceSquaredTo(p2);
      const distance2 = p2.getDistanceSquaredTo(p1);

      expect(distance1).toEqual(distance2);
    });
  });

  describe('getDistanceTo', () => {
    it('should return correct results', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(1, 4);

      expect(p1.getDistanceTo(p2)).toEqual(2);
    });

    it('should be symmetric', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(1, 4);

      const distance1 = p1.getDistanceTo(p2);
      const distance2 = p2.getDistanceTo(p1);

      expect(distance1).toEqual(distance2);
    });
  });

  describe('static', () => {
    describe('add', () => {
      it('should return a new point with added coordinates', () => {
        const p1 = new Point(1, 2);
        const p2 = new Point(3, 4);

        const result = Point.add(p1, p2);

        expect(result.x).toEqual(4);
        expect(result.y).toEqual(6);
        expect(result === p1 || result === p2).toBe(false);
      });
    });

    describe('subtract', () => {
      it('should return a new point with subtracted coordinates', () => {
        const p1 = new Point(1, 2);
        const p2 = new Point(3, 4);

        const result = Point.subtract(p1, p2);

        expect(result.x).toEqual(-2);
        expect(result.y).toEqual(-2);
        expect(result === p1 || result === p2).toBe(false);
      });
    });

    describe('getDistanceBetween', () => {
      it('should return correct results', () => {
        const p1 = new Point(1, 2);
        const p2 = new Point(1, 4);

        expect(Point.getDistanceBetween(p1, p2)).toEqual(2);
      });
    });

    describe('getDistanceBetweenSquared', () => {
      it('should return correct results', () => {
        const p1 = new Point(1, 2);
        const p2 = new Point(1, 4);

        expect(Point.getDistanceBetweenSquared(p1, p2)).toEqual(4);
      });
    });
  });
});
