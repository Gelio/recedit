import { Path } from 'common/Path';
import { Point } from 'common/Point';
import { Stage } from 'Stage';

import { PathPointComponent } from 'ui/components/PathPointComponent';
import { MousePositionTransformer } from 'ui/MousePositionTransformer';

import { EventAggregator } from 'events/EventAggregator';

interface PointSyncServiceDependencies {
  stage: Stage;
  container: HTMLElement;
  mousePositionTransformer: MousePositionTransformer;
  eventAggregator: EventAggregator;
}

interface PathPoint {
  path: Path;
  point: Point;
}

export class PointSyncService {
  private readonly stage: Stage;
  private pathPointComponents: PathPointComponent[] = [];
  private readonly container: HTMLElement;
  private readonly mousePositionTransformer: MousePositionTransformer;
  private readonly eventAggregator: EventAggregator;

  constructor(dependencies: PointSyncServiceDependencies) {
    this.stage = dependencies.stage;
    this.container = dependencies.container;
    this.mousePositionTransformer = dependencies.mousePositionTransformer;
    this.eventAggregator = dependencies.eventAggregator;
  }

  public synchronizeComponents() {
    const pathPoints = this.getPathPoints();

    const componentsToRemove = this.getRedundantComponents();
    const pointsWithoutComponents = this.getPointsWithoutComponents(pathPoints);
    const newComponents = this.createPathPointComponents(pointsWithoutComponents);

    const componentsToSync = this.pathPointComponents.filter(
      component => componentsToRemove.indexOf(component) === -1
    );
    componentsToSync.forEach(component => component.updatePosition());

    componentsToRemove.forEach(component => component.remove());
    this.pathPointComponents = [...newComponents, ...componentsToSync];
  }

  private getPathPoints() {
    const pathPoints: PathPoint[] = [];

    this.stage.layers.forEach(layer => {
      layer.paths.forEach(path => {
        path.getVertices().forEach(point => {
          pathPoints.push({
            path,
            point
          });
        });
      });
    });

    return pathPoints;
  }

  private createPathPointComponents(pathPoints: PathPoint[]) {
    return pathPoints.map(
      pathPoint =>
        new PathPointComponent(this.container, pathPoint.path, pathPoint.point, {
          eventAggregator: this.eventAggregator,
          mousePositionTransformer: this.mousePositionTransformer
        })
    );
  }

  private getRedundantComponents() {
    return this.pathPointComponents.filter(
      component => component.path.findPointIndex(component.point) === -1
    );
  }

  private getPointsWithoutComponents(pathPoints: PathPoint[]) {
    return pathPoints.filter(
      pathPoint =>
        !this.pathPointComponents.find(
          component => component.path === pathPoint.path && component.point === pathPoint.point
        )
    );
  }
}
