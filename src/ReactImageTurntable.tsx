import React from 'react';
import type { FC } from 'react';

import { useTurntableState } from './hooks';
import type { ReactImageTurntableFullProps } from './types';

export const CLASS_NAME_IMG = '__react-image-turntable-img';
export const CLASS_NAME_IMG_PRIMARY = `${CLASS_NAME_IMG}--primary`;
export const CLASS_NAME_IMG_SECONDARY = `${CLASS_NAME_IMG}--secondary`;

const imgBaseStyle = {
  maxWidth: '100%',
};

export const ReactImageTurntable: FC<ReactImageTurntableFullProps> = ({
  images,
  initialImageIndex = 0,
  style,
  tabIndex = 0,
  movementSensitivity = 20,
  ...props
}) => {
  const { ref, activeImageIndex } = useTurntableState({
    initialImageIndex,
    imagesCount: images.length,
    movementSensitivity,
  });

  const [firstImage, ...otherImages] = images;
  const rootStyle: React.CSSProperties = {
    position: 'relative',
    userSelect: 'none',
    ...style,
  };

  return (
    <div
      {...props}
      ref={ref}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={images.length - 1}
      aria-valuenow={activeImageIndex}
      aria-valuetext={`${activeImageIndex + 1} of ${images.length}`}
      style={rootStyle}
      tabIndex={tabIndex}
    >
      <img
        className={`${CLASS_NAME_IMG} ${CLASS_NAME_IMG_PRIMARY}`}
        src={firstImage}
        alt="Turntable image 1"
        style={imgBaseStyle}
      />

      {otherImages?.map((src, index) => (
        <img
          key={src}
          className={`${CLASS_NAME_IMG} ${CLASS_NAME_IMG_SECONDARY}`}
          src={src}
          alt={`Turntable image ${index + 1}`}
          draggable={false}
          style={{
            ...imgBaseStyle,
            position: 'absolute',
            opacity: index === activeImageIndex ? 1 : 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};
