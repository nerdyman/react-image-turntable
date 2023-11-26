import type { HtmlHTMLAttributes } from 'react';

export interface ReactImageTurntableProps {
  /** List of image `src` attributes. */
  images: string[];
  /** Index of image to show first. */
  initialImageIndex?: number;
  /** The amount a "drag" has to move before an image changes to next or previous. */
  movementSensitivity?: number;
  /** Callback that triggers whenever the active index changes. */
  onIndexChange?: (index: number) => void;
  autoRotate?: {
    /** Automatically rotate the turntable. */
    disabled: boolean;
    /** The speed (in ms) at which the turntable rotates. */
    interval?: number;
  };
}

/** Base props *and* all available HTML element props. */
export type ReactImageTurntableFullProps = HtmlHTMLAttributes<HTMLDivElement> &
  ReactImageTurntableProps;
