import 'index.scss';
import 'normalize.css';

import { Application } from 'Application';

window.addEventListener('load', bootstrap, false);

function bootstrap(): void {
  const canvasId = 'main-canvas';
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas with id', canvasId, 'not found');

    return;
  }

  const application = new Application(<HTMLCanvasElement>canvas);
  application.init();
}
