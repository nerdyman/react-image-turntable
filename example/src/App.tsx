import { useState } from 'react';
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

function App() {
  const [currentImages, setCurrentImages] = useState(images);
  // Call the hook with the props you want.
  const turntableProps = useReactImageTurntable({ images: currentImages });

  return (
    <div className="main">
      {/* Render the component with the props from the hook. */}
      <ReactImageTurntable id="turntable" {...turntableProps} />

      {/* Demo controls, ignore. */}
      <div className="main__toolbar main-toolbar">
        <label className="main-toolbar__item">
          <span>Index</span>
          <input
            style={{ maxWidth: '4.25ch', textAlign: 'center' }}
            type="number"
            className="output"
            value={turntableProps.activeImageIndex}
            onChange={(ev) => turntableProps.setActiveImageIndex(ev.target.valueAsNumber)}
          />
          <button
            onClick={() => turntableProps.setActiveImageIndex(turntableProps.activeImageIndex - 1)}
          >
            -
          </button>
          <button
            onClick={() => turntableProps.setActiveImageIndex(turntableProps.activeImageIndex + 1)}
          >
            +
          </button>
        </label>

        <button
          onClick={() => {
            setCurrentImages((prev) => {
              const next =
                prev.length === images.length
                  ? prev.filter((__img, index) => index % 2 === 0)
                  : images;

              return next;
            });
          }}
        >
          Set to {currentImages.length === images.length ? images.length : images.length / 2} images
        </button>
      </div>
    </div>
  );
}

export default App;
