import { useEffect, useState } from 'react';

import App, { images as baseImages } from './App';

/**
 * Wrapper to manipulate props on the component in E2E tests.
 * @NOTE This is only for internal testing, it is not required to use the library.
 */
export const Test = () => {
  const [images, setImages] = useState(baseImages);
  const [initialImageIndex, setInitialImageIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    setInitialImageIndex(0);
  }, []);

  return (
    <>
      <App images={images} initialImageIndex={initialImageIndex} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() =>
            setImages((prev) =>
              prev.length == baseImages.length ? baseImages.slice(0, 12) : baseImages,
            )
          }
        >
          Toggle image set
        </button>

        <button
          onClick={() => setInitialImageIndex((prev) => (prev === 0 ? images.length - 1 : 0) || 0)}
        >
          Toggle initial index
        </button>
      </div>
    </>
  );
};
