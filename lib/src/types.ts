import type { ComponentProps, RefObject } from 'react';

export type ReactImageTurntableAutoRotateProps = {
  /**
   * Whether to automatically rotate the turntable.
   * @default false
   */
  enabled?: boolean;
  /**
   * Whether the turntable should rotate counterclockwise.
   * @default false
   */
  counterClockwise?: boolean;
  /**
   * The speed in ms at which the turntable autorotates.
   * @default 200
   */
  interval?: number;
};

export type ReactCompareImageImageProps = ComponentProps<'img'>;

export type UseReactImageTurntableProps = {
  /** Autorotation configuration. */
  autoRotate?: ReactImageTurntableAutoRotateProps;
  /** The array index of the image to show on first load. */
  initialImageIndex?: number;
  /** List of image `src` attributes. */
  images: ReactCompareImageImageProps[];
  /**
   * The amount a "drag" has to move before an image changes to next or previous.
   * @default 20
   */
  movementSensitivity?: number;
  /** Callback to trigger whenever the active index changes. */
  onIndexChange?: (index: number) => void;
};

export type UseReactImageTurntableReturn = Pick<UseReactImageTurntableProps, 'images'> & {
  /** Array index of the current image. */
  activeImageIndex: number;
  /** Set the active image index. */
  setActiveImageIndex: (index: number) => void;
  /** The ref of the root turntable element. */
  ref: RefObject<HTMLDivElement | null>;
};

/** Base props *and* all available HTML element props. */
export type ReactImageTurntableProps = ComponentProps<'div'> & UseReactImageTurntableReturn;
