import React from 'react';
import { useTurntableState } from './hooks';
import type { ReactImageTurntableProps } from './types';

type RootProps = React.HtmlHTMLAttributes<HTMLDivElement> & ReactImageTurntableProps;

export const CLASS_NAME_IMG = '__react-image-turntable__img';

export const Turntable: React.FC<RootProps> = ({
  images,
  initialImageIndex = 0,
  style,
  tabIndex = 0,
  ...props
}) => {
  const { ref, activeImageIndex } = useTurntableState({
    initialImageIndex,
    imagesCount: images.length,
  });

  const [firstImage, ...otherImages] = images;
  const rootStyle: React.CSSProperties = {
    position: 'relative',
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
      <img className={CLASS_NAME_IMG} src={firstImage} alt="Turntable image 1" />

      {otherImages?.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Turntable image ${index + 1}`}
          draggable={false}
          style={{
            position: 'absolute',
            opacity: index === activeImageIndex ? 1 : 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            userSelect: 'none',
          }}
        />
      ))}
    </div>
  );
};
