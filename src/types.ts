export interface ReactImageTurntableProps {
  /** List of image `src` attributes. */
  images: string[];
  /** Image index to start on at first render. */
  initialImageIndex?: number;
  /** The amount a "drag" has to move before an image changes to next or previous */
  movementSensitivity?: number 
}

/** Base props *and* all available HTML element props. */
export type ReactImageTurntableFullProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  ReactImageTurntableProps;
