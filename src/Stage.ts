import { Layer } from 'common/Layer';
import { Renderer } from 'Renderer';

export class Stage {
  public layers: Layer[] = [];

  public render(renderer: Renderer) {
    this.layers.forEach(layer => layer.render(renderer));
  }

  public removeLayer(layer: Layer) {
    const index = this.layers.indexOf(layer);
    if (index === -1) {
      return;
    }

    this.layers.splice(index, 1);
  }
}
