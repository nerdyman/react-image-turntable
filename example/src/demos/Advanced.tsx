/* eslint no-console: 0 */

import type { FC, PointerEventHandler } from 'react';
import { useCallback, useState } from 'react';
import { ReactImageTurntable, useReactImageTurntable } from 'react-image-turntable';

export const images = Array.from({ length: 48 }, (_, index) => ({
  src: `https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/${index + 1}.webp`,
  alt: `Turntable image ${index + 1}`,
})).reverse();

export const AdvancedDemo: FC = () => {
  const [currentImages, setCurrentImages] = useState(images);
  const [movementSensitivity, setMovementSensitivity] = useState(50);
  const [autoRotate, setAutoRotate] = useState(() => ({
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
      {/* Render the component with the props from the hook. */}
      <div className="main__turntable">
        <ReactImageTurntable onPointerDown={handlePointerDown} {...turntableProps} />
      </div>

      {/**
       * Demo toolbar, ignore.
       */}
      <details open={true} className="main__controls controls">
        <summary className="controls__head">
          <div className="controls__indicator" aria-hidden="true" />
          <h2 className="controls__title">Controls</h2>
        </summary>

        <div className="toolbar">
          <div className="toolbar__item">
            <label className="toolbar-field toolbar-field--inputs">
              <code className="toolbar-field__label">activeImageIndex</code>
              <input
                style={{ maxWidth: '4.25ch', textAlign: 'center' }}
                type="number"
                value={turntableProps.activeImageIndex}
                onChange={(ev) => turntableProps.setActiveImageIndex(ev.target.valueAsNumber)}
              />
            </label>

            <div className="toolbar-field">
              <button
                type="button"
                title="Previous image"
                onClick={() => turntableProps.setActiveImageIndex(turntableProps.activeImageIndex - 1)}
              >
                &lt;
              </button>
              <button
                type="button"
                title="Next image"
                onClick={() => turntableProps.setActiveImageIndex(turntableProps.activeImageIndex + 1)}
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="toolbar__item">
            <label className="toolbar-field toolbar-field--inputs">
              <code className="toolbar-field__label">autoRotate.enabled</code>
              <input
                type="checkbox"
                checked={autoRotate?.enabled}
                onChange={(ev) =>
                  setAutoRotate((prev) => ({
                    ...prev,
                    enabled: ev.target.checked,
                  }))
                }
              />
            </label>
          </div>

          <div className="toolbar__item">
            <label className="toolbar-field toolbar-field--inputs">
              <code className="toolbar-field__label">autoRotate.interval</code>
              <input
                style={{ maxWidth: '4.25ch', textAlign: 'center' }}
                disabled={!autoRotate.enabled}
                min={0}
                type="number"
                value={autoRotate?.interval}
                onChange={(ev) =>
                  setAutoRotate((prev) => ({
                    ...prev,
                    interval: ev.target.valueAsNumber,
                  }))
                }
              />
            </label>
          </div>

          <div className="toolbar__item">
            <label className="toolbar-field toolbar-field--inputs">
              <code className="toolbar-field__label">movementSensitivity</code>
              <input
                style={{ maxWidth: '4.25ch', textAlign: 'center' }}
                type="number"
                min={0}
                className="output"
                value={movementSensitivity}
                onChange={(ev) => setMovementSensitivity(ev.target.valueAsNumber)}
              />
            </label>
          </div>

          <div className="toolbar__item">
            <label className="toolbar-field toolbar-field--inputs">
              <span className="toolbar-field__label">Splice images</span>
              <input
                type="button"
                value={`Set to ${
                  currentImages.length === images.length ? images.length / 2 : images.length
                } images`}
                onClick={() => {
                  setCurrentImages((prev) => {
                    const next =
                      prev.length === images.length ? prev.filter((__img, index) => index % 2 === 0) : images;

                    return next;
                  });
                }}
              />
            </label>
          </div>
        </div>
      </details>
    </>
  );
};
