import { HitTestResult } from 'common/HitTestResult';
import { Path } from 'common/Path';
import { Point } from 'common/Point';
import { Renderer } from 'Renderer';

export class Layer {
  public paths: Path[] = [];
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public render(renderer: Renderer) {
    this.paths.forEach(path => renderer.drawPath(path));
  }

  public removePath(path: Path) {
    const index = this.paths.indexOf(path);
    if (index === -1) {
      return;
    }

    this.paths.splice(index, 1);
  }

  public hitTest(point: Point): HitTestResult | null {
    for (const path of this.paths) {
      const result = path.hitTest(point);
      if (!result) {
        continue;
      }

      result.layer = this;

      return result;
    }

    return null;
  }
}
