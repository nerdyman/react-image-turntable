export interface ReactImageTurntableProps {
  /** List of image srcs. */
  images: string[];
  /** Initial image to start on. */
  initialImageIndex?: number;
}

/** Base props *and* all available HTML element props. */
export type ReactImageTurntableFullProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  ReactImageTurntableProps;
