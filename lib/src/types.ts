import type { HtmlHTMLAttributes, RefObject } from 'react';

export interface UseReactImageTurntableProps {
  /** The array index of the active image. */
  initialImageIndex?: number;
  /** Properties to automatically rotate the turntable. */
  autoRotate?: {
    /** Enable or disable the autorotation of the turntable. */
    disabled?: boolean;
    /** The speed (in ms) at which the turntable rotates. */
    interval?: number;
  };
  /** List of image `src` attributes. */
  images: string[];
  /** The amount a "drag" has to move before an image changes to next or previous. */
  movementSensitivity?: number;
  /** Callback that triggers whenever the active index changes. */
  onIndexChange?: (index: number) => void;
}

export interface UseReactImageTurntableReturn extends Pick<UseReactImageTurntableProps, 'images'> {
  /** The array index of the active image. */
  activeImageIndex: number;
  /** Function to programatically set the active image index. */
  setActiveImageIndex: (index: number) => void;
  /** The ref to the root turntable element. */
  turntableRef: RefObject<HTMLDivElement>;
}

/** Base props *and* all available HTML element props. */
export type ReactImageTurntableRootProps = HtmlHTMLAttributes<HTMLDivElement> &
  UseReactImageTurntableReturn;
