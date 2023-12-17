import type { HtmlHTMLAttributes, RefObject } from 'react';

export interface ReactImageTurntableAutoRotateProps {
  /**
   * Whether to automatically rotate the turntable.
   * @default false
   */
  enabled?: boolean;
  /**
   * The speed in ms at which the turntable autorotates.
   * @default 200
   */
  interval?: number;
}

export interface UseReactImageTurntableProps {
  /** Autorotation configuration. */
  autoRotate?: ReactImageTurntableAutoRotateProps;
  /** The array index of the image to show on first load. */
  initialImageIndex?: number;
  /** List of image `src` attributes. */
  images: string[];
  /** The amount a "drag" has to move before an image changes to next or previous. */
  movementSensitivity?: number;
  /** Callback to trigger whenever the active index changes. */
  onIndexChange?: (index: number) => void;
}

export interface UseReactImageTurntableReturn extends Pick<UseReactImageTurntableProps, 'images'> {
  /** Array index of the current image. */
  activeImageIndex: number;
  /** Set the active image index. */
  setActiveImageIndex: (index: number) => void;
  /** The ref of the root turntable element. */
  turntableRef: RefObject<HTMLDivElement>;
}

/** Base props *and* all available HTML element props. */
export type ReactImageTurntableRootProps = HtmlHTMLAttributes<HTMLDivElement> &
  UseReactImageTurntableReturn;
