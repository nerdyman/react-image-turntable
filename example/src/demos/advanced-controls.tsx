import type {
  ReactImageTurntableAutoRotateProps,
  UseReactImageTurntableProps,
  UseReactImageTurntableReturn,
} from 'react-image-turntable';

type AdvancedDemoControlsProps = Omit<UseReactImageTurntableReturn, 'ref'> & {
  autoRotate: ReactImageTurntableAutoRotateProps;
  setAutoRotate: React.Dispatch<React.SetStateAction<ReactImageTurntableAutoRotateProps>>;
  currentImages: UseReactImageTurntableReturn['images'];
  setCurrentImages: React.Dispatch<React.SetStateAction<UseReactImageTurntableReturn['images']>>;
  movementSensitivity: UseReactImageTurntableProps['movementSensitivity'];
  setMovementSensitivity: React.Dispatch<React.SetStateAction<number>>;
};

export const AdvancedDemoControls: React.FC<AdvancedDemoControlsProps> = ({
  autoRotate,
  setAutoRotate,
  activeImageIndex,
  setActiveImageIndex,
  movementSensitivity,
  setMovementSensitivity,
  images,
  currentImages,
  setCurrentImages,
}) => {
  return (
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
              value={activeImageIndex}
              onChange={(ev) => setActiveImageIndex(ev.target.valueAsNumber)}
            />
          </label>

          <div className="toolbar-field">
            <button
              type="button"
              title="Previous image"
              onClick={() => setActiveImageIndex(activeImageIndex - 1)}
            >
              &lt;
            </button>
            <button
              type="button"
              title="Next image"
              onClick={() => setActiveImageIndex(activeImageIndex + 1)}
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
              disabled={!autoRotate?.enabled}
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
  );
};
