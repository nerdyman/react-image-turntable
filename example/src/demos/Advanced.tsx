/* eslint no-console: 0 */

import type { FC, PointerEventHandler } from 'react';
import { useCallback, useState } from 'react';
import {
  ReactImageTurntable,
  type ReactImageTurntableAutoRotateProps,
  type ReactImageTurntableProps,
  useReactImageTurntable,
} from 'react-image-turntable';

export const images = Array.from({ length: 48 }, (_, index) => ({
  src: `https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/${index + 1}.webp`,
  alt: `Turntable image ${index + 1}`,
})).reverse();

import { AdvancedDemoControls } from './advanced-controls';

export const AdvancedDemo: FC = () => {
  const [movementSensitivity, setMovementSensitivity] = useState(50);
  const [currentImages, setCurrentImages] = useState<ReactImageTurntableProps['images']>(images);
  const [autoRotate, setAutoRotate] = useState<ReactImageTurntableAutoRotateProps>(() => ({
    enabled:
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('autoRotate') !== 'false',
    interval: 75,
  }));

  /** Stop autorotation on pointer down / left click. */
  const handlePointerDown: PointerEventHandler<HTMLDivElement> = useCallback((ev) => {
    if (ev.button === 0) {
      setAutoRotate((prev) => ({ ...prev, enabled: false }));
    }
  }, []);

  /** Log to console when the index changes. */
  const onIndexChange = useCallback((index: number) => {
    console.info('Index changed:', index);
  }, []);

  // Call the hook with the props you want.
  const turntableProps = useReactImageTurntable({
    autoRotate,
    initialImageIndex: 0,
    images: currentImages,
    movementSensitivity,
    onIndexChange,
  });

  return (
    <>
      <div className="main__turntable">
        {/* Render the component with the props from the hook. */}
        <ReactImageTurntable onPointerDown={handlePointerDown} {...turntableProps} />
      </div>

      <AdvancedDemoControls
        activeImageIndex={turntableProps.activeImageIndex}
        setActiveImageIndex={turntableProps.setActiveImageIndex}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        movementSensitivity={movementSensitivity}
        setMovementSensitivity={setMovementSensitivity}
        images={images}
        currentImages={currentImages}
        setCurrentImages={setCurrentImages}
      />
    </>
  );
};
