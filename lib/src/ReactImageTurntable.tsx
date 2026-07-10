'use client';

import { type CSSProperties, forwardRef, type MouseEvent } from 'react';

import type { ReactImageTurntableProps } from './types';

/** Base `className` for images. */
export const CLASS_NAME_IMG = '__react-image-turntable-img';
/** `className` of first rendered image (sets the size of the main component). */
export const CLASS_NAME_IMG_PRIMARY = `${CLASS_NAME_IMG}--primary`;
/** `className` of subsequent images. */
export const CLASS_NAME_IMG_SECONDARY = `${CLASS_NAME_IMG}--secondary`;

/**
 * Firefox desktop tries to drag the image on `pointerdown` + `pointermove` so we need to prevent it.
 */
const handleImgDragStart = (ev: MouseEvent<HTMLImageElement>) => {
  ev.preventDefault();
};

export const ReactImageTurntable = forwardRef<HTMLDivElement, ReactImageTurntableProps>(
  (
    { activeImageIndex, images, style, tabIndex = 0, setActiveImageIndex: __setActiveImageIndex, ...props },
    ref,
  ) => {
    const rootStyle: CSSProperties = {
      position: 'relative',
      touchAction: 'pan-y',
      userSelect: 'none',
      ...style,
    };

    return (
      <div
        aria-label="Image turntable"
        {...props}
        ref={ref}
        role="slider"
        aria-valuemin={1}
        aria-valuemax={images.length}
        aria-valuenow={activeImageIndex + 1}
        aria-valuetext={`${activeImageIndex + 1} of ${images.length}`}
        style={rootStyle}
        tabIndex={tabIndex}
      >
        {images.map(({ alt, className, draggable = false, src, style }, index) => (
          <img
            key={src}
            className={`${CLASS_NAME_IMG} ${index === 0 ? CLASS_NAME_IMG_PRIMARY : CLASS_NAME_IMG_SECONDARY}${className ? ` ${className}` : ''}`}
            src={src}
            alt={alt || `Turntable ${index + 1} of ${images.length + 1}`}
            draggable={draggable}
            onDragStart={handleImgDragStart}
            style={{
              position: index === 0 ? undefined : 'absolute',
              display: 'block',
              inset: index === 0 ? undefined : 0,
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              opacity: index === activeImageIndex ? 1 : 0,
              pointerEvents: index === activeImageIndex ? undefined : 'none',
              ...style,
            }}
          />
        ))}
      </div>
    );
  },
);

ReactImageTurntable.displayName = 'ReactImageTurntable';
