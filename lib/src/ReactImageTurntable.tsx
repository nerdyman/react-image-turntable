import type { CSSProperties, FC, MouseEvent } from 'react';

import type { ReactImageTurntableRootProps } from './types';

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

export const ReactImageTurntable: FC<ReactImageTurntableRootProps> = ({
  activeImageIndex,
  images,
  style,
  tabIndex = 0,
  turntableRef,
  setActiveImageIndex: __setActiveImageIndex,
  ...props
}) => {
  const rootStyle: CSSProperties = {
    position: 'relative',
    touchAction: 'none',
    userSelect: 'none',
    ...style,
  };

  return (
    <div
      aria-label="Image turntable"
      {...props}
      ref={turntableRef}
      role="slider"
      aria-valuemin={1}
      aria-valuemax={images.length}
      aria-valuenow={activeImageIndex + 1}
      aria-valuetext={`${activeImageIndex + 1} of ${images.length}`}
      style={rootStyle}
      tabIndex={tabIndex}
    >
      {images.map((src, index) => (
        <img
          key={src}
          className={`${CLASS_NAME_IMG} ${
            index === 0 ? CLASS_NAME_IMG_PRIMARY : CLASS_NAME_IMG_SECONDARY
          }`}
          src={src}
          alt={`Turntable image ${index + 1}`}
          draggable={false}
          onDragStart={handleImgDragStart}
          style={{
            position: index === 0 ? undefined : 'absolute',
            opacity: index === activeImageIndex ? 1 : 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};
