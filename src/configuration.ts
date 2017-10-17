import { COLORS } from 'common/COLORS';
import { LineProperties } from 'common/LineProperties';

const configuration = {
  newLinePreviewProperties: new LineProperties(COLORS.BLUE, 2),
  newPolygonLineProperties: new LineProperties(COLORS.RED, 1),
  polygonLineProperties: LineProperties.getDefault(),
  applicationUIContainerID: 'application-ui',
  hitTolerance: 10,
  minPolygonPoints: 3,
  doubleClickMaxDelay: 500,
  displayPathGhostWhenDragging: false,
  epsilon: 10e-4,
  lineDeviationAllowanceInDegrees: 20
};

export {
  configuration
};
