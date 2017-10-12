import { Layer } from 'common/Layer';
import { Line } from 'common/Line';
import { Path } from 'common/Path';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';

export type HitTestTarget = Point | Line;

export class HitTestResult {
  public readonly target: HitTestTarget;
  public readonly layer: Layer;
  public readonly path: Path;

  constructor(target: HitTestTarget, layer: Layer, path: Path) {
    this.target = target;
    this.layer = layer;
    this.path = path;
  }
}
