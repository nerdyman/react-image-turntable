/* eslint no-console: 0 */

import type { FC, PointerEventHandler } from 'react';
import { useCallback, useState } from 'react';

import { ReactImageTurntable, useReactImageTurntable } from 'react-image-turntable';

export const images = [
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_01.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_02.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_03.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_04.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_05.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_06.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_07.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_08.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_09.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_10.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_11.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_12.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_13.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_14.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_15.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_16.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_17.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_18.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_19.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_20.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_21.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_22.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_23.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_24.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_25.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_26.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_27.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_28.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_29.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_30.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_31.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_32.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_33.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_34.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_35.jpg?v=1',
  'https://static2.zerolight.com/web/df3a45687480167bb4451d79c02f67bd/img/2d-explorer/bmw/P0C1G__S022B__FX3A9/P0C1G__S022B__FX3A9__Spin_36.jpg?v=1',
];

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
                onClick={() =>
                  turntableProps.setActiveImageIndex(turntableProps.activeImageIndex - 1)
                }
              >
                &lt;
              </button>
              <button
                type="button"
                title="Next image"
                onClick={() =>
                  turntableProps.setActiveImageIndex(turntableProps.activeImageIndex + 1)
                }
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
                      prev.length === images.length
                        ? prev.filter((__img, index) => index % 2 === 0)
                        : images;

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
