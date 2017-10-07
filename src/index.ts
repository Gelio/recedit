import 'index.scss';
import 'normalize.css';

import { COLORS } from 'common/COLORS';
import { Point } from 'common/Point';
import { LineRasterizer } from 'LineRasterizer';
import { Renderer } from 'Renderer';

window.addEventListener('load', bootstrap, false);

function bootstrap(): void {
  const canvas = <HTMLCanvasElement>document.getElementById('main-canvas');
  const renderer = new Renderer(canvas, { lineRasterizer: new LineRasterizer() });

  setInterval(() => {
    const x = Math.random() * canvas.clientWidth;
    const y = Math.random() * canvas.clientHeight;
    const startPoint = new Point(x, y);
    const endPoint = new Point(x + 40, y + 10);

    renderer.drawLine(startPoint, endPoint, { color: COLORS.RED, thickness: 2 });
  }, 250);
}
