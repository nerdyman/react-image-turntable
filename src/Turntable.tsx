import React from 'react';
import { useTurntable } from './useTurntable';

interface TurntableProps {
  images: string[];
}

export const Turntable: React.FC<TurntableProps> = ({ images }) => {
  const { activeImageIndex, eventHandlers } = useTurntable(images);

  return (
    <div {...eventHandlers} style={{ position: 'relative' }}>
      {!images || (!images.length && <h1>Your gonna need to add your images...</h1>)}
      {images &&
        images.map((imageSrc, index) => (
          <img
            key={imageSrc}
            src={imageSrc}
            style={{
              position: 'absolute',
              opacity: index === activeImageIndex ? 1 : 0,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
            }}
            alt={`turntable image ${index}`}
          />
        ))}
    </div>
  );
};
