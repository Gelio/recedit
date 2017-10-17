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

  private readonly clonedReversePolygon: Polygon;
  private readonly clonedReverseStartingPoint: Point;

  constructor(polygon: Polygon, startingPoint: Point) {
    // TODO: inject ContinuousFixer constructor
    this.polygon = polygon;
    this.startingPoint = startingPoint;
    const startingPointIndex = polygon.findPointIndex(this.startingPoint);

    this.clonedPolygon = polygon.clone();
    this.clonedStartingPoint = this.clonedPolygon.getVertex(startingPointIndex);

    this.clonedReversePolygon = polygon.clone();
    this.clonedReverseStartingPoint = this.clonedReversePolygon.getVertex(startingPointIndex);
  }

  public fix() {
    const lastValidPosition = this.clonedStartingPoint.clone();
    this.clonedStartingPoint.moveTo(this.startingPoint);

    const conditionFixer = new ConditionFixer(this.clonedPolygon, this.clonedStartingPoint, []);
    conditionFixer.tryFix();

    if (conditionFixer.fixSuccessful) {
      this.synchronizePoints(this.clonedPolygon, this.clonedReversePolygon);
      this.synchronizePoints(this.clonedPolygon, this.polygon);

      return;
    }

    this.clonedReverseStartingPoint.moveTo(this.startingPoint);

    const reverseConditionFixer = new ConditionFixer(
      this.clonedReversePolygon,
      this.clonedReverseStartingPoint,
      [],
      FixingDirection.Reverse
    );
    reverseConditionFixer.tryFix();

    if (reverseConditionFixer.fixSuccessful) {
      this.synchronizePoints(this.clonedReversePolygon, this.clonedPolygon);
      this.synchronizePoints(this.clonedReversePolygon, this.polygon);

      return;
    }

    const translationVector = Point.subtract(this.startingPoint, lastValidPosition);

    this.clonedPolygon.getVertices().forEach(clonedPoint => {
      clonedPoint.moveTo(Point.add(clonedPoint, translationVector));
    });
    this.clonedStartingPoint.moveTo(this.startingPoint);

    this.synchronizePoints(this.clonedPolygon, this.polygon);
    this.synchronizePoints(this.clonedPolygon, this.clonedReversePolygon);
  }

  private synchronizePoints(source: Polygon, destination: Polygon) {
    destination.getVertices().forEach((originalPoint, index) => {
      originalPoint.moveTo(source.getVertex(index));
    });
  }
}
