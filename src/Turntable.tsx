import React from 'react';
import { useTurntable } from './useTurntable';

interface TurntableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  images: string[];
}

export const Turntable: React.FC<TurntableProps> = ({ images }) => {
  const { activeImageIndex, eventHandlers } = useTurntable(images);
  const [firstImage, ...otherImages] = images;

  return (
    <div {...eventHandlers} style={{ position: 'relative' }}>
      <img src={firstImage} alt="Turntable image 1" />

      {otherImages &&
        otherImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Turntable image ${index + 1}`}
            style={{
              position: 'absolute',
              opacity: index === activeImageIndex ? 1 : 0,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              willChange: 'opacity',
            }}
          />
        ))}
    </div>
  );
};
