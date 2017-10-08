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
    const startX = Math.random() * canvas.clientWidth;
    const startY = Math.random() * canvas.clientHeight;
    const startPoint = new Point(startX, startY);

    const endX = Math.random() * canvas.clientWidth;
    const endY = Math.random() * canvas.clientHeight;
    const endPoint = new Point(endX, endY);

    renderer.drawLine(startPoint, endPoint, { color: COLORS.BLACK, thickness: 2 });
  }, 1000);

  const centerPoint = new Point(canvas.clientWidth / 2, canvas.clientHeight / 2);
  drawLinesInAllOctants(renderer, centerPoint, 100, 2);
}

function drawLinesInAllOctants(renderer: Renderer, point: Point, boxSize: number, thickness: number) {
  renderer.drawLine(point, Point.add(point, new Point(boxSize, 0)), { thickness, color: COLORS.RED });
  renderer.drawLine(point, Point.add(point, new Point(boxSize, boxSize / 2)), { thickness, color: COLORS.GREEN });
  renderer.drawLine(point, Point.add(point, new Point(boxSize, boxSize)), { thickness, color: COLORS.BLUE });
  renderer.drawLine(point, Point.add(point, new Point(boxSize / 2, boxSize)), { thickness, color: COLORS.RED });
  renderer.drawLine(point, Point.add(point, new Point(0, boxSize)), { thickness, color: COLORS.GREEN });
  renderer.drawLine(point, Point.add(point, new Point(-boxSize / 2, boxSize)), { thickness, color: COLORS.BLUE });
  renderer.drawLine(point, Point.add(point, new Point(-boxSize, boxSize)), { thickness, color: COLORS.RED });
  renderer.drawLine(point, Point.add(point, new Point(-boxSize, boxSize / 2)), { thickness, color: COLORS.GREEN });
  renderer.drawLine(point, Point.add(point, new Point(-boxSize, 0)), { thickness, color: COLORS.BLUE });
  renderer.drawLine(point, Point.add(point, new Point(-boxSize, -boxSize / 2)), { thickness, color: COLORS.RED });
  renderer.drawLine(point, Point.add(point, new Point(-boxSize, -boxSize)), { thickness, color: COLORS.GREEN });
  renderer.drawLine(point, Point.add(point, new Point(-boxSize / 2, -boxSize)), { thickness, color: COLORS.BLUE });
  renderer.drawLine(point, Point.add(point, new Point(0, -boxSize)), { thickness, color: COLORS.RED });
  renderer.drawLine(point, Point.add(point, new Point(boxSize / 2, -boxSize)), { thickness, color: COLORS.GREEN });
  renderer.drawLine(point, Point.add(point, new Point(boxSize, -boxSize)), { thickness, color: COLORS.BLUE });
  renderer.drawLine(point, Point.add(point, new Point(boxSize, -boxSize / 2)), { thickness, color: COLORS.RED });
}
