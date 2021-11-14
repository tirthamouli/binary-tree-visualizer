import CanvasComponent from '../canvas/Canvas';
import theme from '../config/theme';
import BezierCurve from '../strokes/BezierCurve';
import {
  HorizontalStartAndEndInput,
  VerticalStartAndEndInput,
} from '../canvas/types';

/**
 * Connect two points with a bezier curve
 *
 * @param {CanvasComponent} canvasComponent
 * @param {HorizontalStartAndEndInput} horizontalConfig
 * @param {VerticalStartAndEndInput} verticalConfig
 */
function connectPointsWithBezierCurve(
    canvasComponent: CanvasComponent,
    horizontalConfig: HorizontalStartAndEndInput,
    verticalConfig: VerticalStartAndEndInput,
) {
// X, Y Calculation
  const {xStart, xEnd} = horizontalConfig;
  const {yStart, yEnd} = verticalConfig;
  const halfY = (yStart + yEnd) / 2;
  const halfX = (xStart + xEnd) / 2;

  // Draw the bezier curve
  const berzierCurve = new BezierCurve(
      theme.strokeColor,
      {x: xStart, y: yStart},
      {x: halfX, y: halfY},
      {x: xEnd, y: halfY},
      {x: xEnd, y: yEnd},
  );
  berzierCurve.draw(canvasComponent.getContext());
}

export default connectPointsWithBezierCurve;
