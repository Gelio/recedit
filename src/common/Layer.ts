import { Path } from 'common/Path';
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
}
