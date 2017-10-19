import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { ConditionFixer, FixingDirection } from 'conditions/ConditionFixer';

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
    this.clonedPolygon.moveTo(this.polygon);
    this.clonedStartingPoint.moveTo(this.startingPoint);

    const conditionFixer = new ConditionFixer(this.clonedPolygon, this.clonedStartingPoint, []);
    conditionFixer.tryFix();

    if (conditionFixer.fixSuccessful) {
      return;
    }

    this.clonedStartingPoint.moveTo(this.startingPoint);
    this.clonedPolygon.moveTo(this.polygon);
    conditionFixer.reset();
    conditionFixer.direction = FixingDirection.Reverse;
    conditionFixer.tryFix();

    if (conditionFixer.fixSuccessful) {
      return;
    }

    const translationVector = Point.subtract(this.startingPoint, lastValidPosition);

    this.clonedPolygon.moveTo(this.polygon);
    this.clonedPolygon.getVertices().forEach(clonedPoint => {
      clonedPoint.moveTo(Point.add(clonedPoint, translationVector));
    });
    this.clonedStartingPoint.moveTo(this.startingPoint);
  }

  public propagateChangesToOriginalPolygon() {
    this.polygon.moveTo(this.clonedPolygon);
  }
}
