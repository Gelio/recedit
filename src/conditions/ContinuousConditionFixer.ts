import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { ConditionFixer } from 'conditions/ConditionFixer';

/**
 * Use when there is a need to fix conditions often (for instance when dragging).
 *
 * @export
 * @class ContinuousConditionFixer
 */
export class ContinuousConditionFixer {
  private readonly polygon: Polygon;
  private readonly clonedPolygon: Polygon;
  private readonly startingPoint: Point;
  private readonly clonedStartingPoint: Point;

  constructor(polygon: Polygon, startingPoint: Point) {
    // TODO: inject ContinuousFixer constructor
    this.polygon = polygon;
    this.startingPoint = startingPoint;
    const startingPointIndex = polygon.findPointIndex(this.startingPoint);

    this.clonedPolygon = polygon.clone();
    this.clonedStartingPoint = this.clonedPolygon.getVertex(startingPointIndex);
  }

  public fix() {
    const lastValidPosition = this.clonedStartingPoint.clone();
    this.clonedStartingPoint.moveTo(this.startingPoint);

    const conditionFixer = new ConditionFixer(this.clonedPolygon, this.clonedStartingPoint);
    conditionFixer.tryFix();

    if (!conditionFixer.fixSuccessful) {
      const translationVector = Point.subtract(this.startingPoint, lastValidPosition);

      this.clonedPolygon.getVertices().forEach(clonedPoint => {
        clonedPoint.moveTo(Point.add(clonedPoint, translationVector));
      });
      this.clonedStartingPoint.moveTo(this.startingPoint);
    }

    this.polygon.getVertices().forEach((originalPoint, index) => {
      originalPoint.moveTo(this.clonedPolygon.getVertex(index));
    });
  }
}
