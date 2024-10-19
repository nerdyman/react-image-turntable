<div align="center">

# React Image Turntable

Display a set of images as a draggable 360 degree turntable.

[![React Image Turntable with rotating car](https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/capture.gif)](https://codesandbox.io/s/github/nerdyman/react-image-turntable/tree/main/example?file=/src/App.tsx:5537-5598)

<a href="https://stackblitz.com/github/nerdyman/react-image-turntable/tree/main/example"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz"/></a>

<a href="https://npmjs.com/package/react-image-turntable"><img src="https://img.shields.io/npm/v/react-image-turntable.svg?label=npm" alt="NPM package" /></a>
<a href="https://github.com/nerdyman/react-image-turntable/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-image-turntable.svg" alt="License MIT" /></a>
<a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild"><img alt="GitHub CI status" src="https://img.shields.io/github/actions/workflow/status/nerdyman/react-image-turntable/main.yml" /></a>
<a href="https://codeclimate.com/github/nerdyman/react-image-turntable/test_coverage"><img src="https://img.shields.io/codeclimate/coverage/nerdyman/react-image-turntable" /></a>

</div>

## Features

- Accessible & screen-reader friendly
- Responsive & intrinsically sized
- Built-in keyboard navigation
- Programmatically controllable
- Teeny Tiny
- Zero dependencies
- Type safe

## Install

```sh
npm i react-image-turntable
# Or
yarn add react-image-turntable
# Or
pnpm i react-image-turntable
```

## Usage

### Example

```tsx
import { ReactImageTurntable, useReactImageTurntable } from 'react-image-turntable';

const images = [
  'https://via.placeholder.com/1200x800?text=1',
  'https://via.placeholder.com/1200x800?text=2',
  'https://via.placeholder.com/1200x800?text=3',
];

export const App = () => {
  const turntableProps = useReactImageTurntable({ images });

  return <ReactImageTurntable {...turntableProps} />;
};
```

See the [example code](./example) for full demo.

### `useReactImageTurntable` Props

#### Input Props

The `useReactImageTurntable` hook accepts the following properties.

| Props                 | Type                      | Required | Default Value | Description                                                                  |
| --------------------- | :------------------------ | :------: | :------------ | :--------------------------------------------------------------------------- |
| `autoRotate.enabled`  | `boolean`                 |          | `false`       | Whether to automatically rotate the turntable.                               |
| `autoRotate.interval` | `number`                  |          | `200`         | The interval between autorotations in ms.                                    |
| `images`              | `string[]`                |    ✓     | `undefined`   | List of image `src` attributes.                                              |
| `initialImageIndex`   | `number`                  |          | `0`           | Index of image to show first.                                                |
| `movementSensitivity` | `number`                  |          | `20`          | The amount a "drag" has to move before an image changes to next or previous. |
| `onIndexChange`       | `(index: number) => void` |          | `undefined`   | Callback to trigger whenever the active index changes.                       |

#### Output Props

The `useReactImageTurntable` hook returns the following properties.

| Props                 | Type                        | Description                                   |
| --------------------- | :-------------------------- | --------------------------------------------- |
| `activeImageIndex`    | `number`                    | The index of the image currently being shown. |
| `setActiveImageIndex` | `(index: number) => void`   | Function to set the active index.             |
| `images`              | `string[]`                  | The images passed into the hook.              |
| `ref`                 | `RefObject<HTMLDivElement>` | The ref of the root turntable element.        |

Note that there is no need for a `setImages` function. `images` is not stored in state. If you want
to change the images simply change the `images` prop passed into the hook.

##### Example Usage

<details>
<summary>View example</summary>

```tsx
import { ReactImageTurntable, useReactImageTurntable } from 'react-image-turntable';

const images = [
  'https://via.placeholder.com/1200x800?text=1',
  'https://via.placeholder.com/1200x800?text=2',
  'https://via.placeholder.com/1200x800?text=3',
];

export const App = () => {
  const turntableProps = useReactImageTurntable({
    autoRotate: { disabled: true, interval: 75 },
    images,
    initialImageIndex: 1, // Start on the second image.
    movementSensitivity: 50, // Increase the amount of drag needed to change images.
    onIndexChange: (index) => console.log(`Active image index changed to ${index}`),
  });

  const handleSelectFirstImage = () => {
    turntableProps.setActiveIndex(0);
  };

  return (
    <>
      <button type="button" onClick={handleSelectFirstImage}>
        Select first image
      </button>
      <ReactImageTurntable {...turntableProps} />
    </>
  );
};
```

</details>

### Custom Styling

The library uses the first image in `images[]` to intrinsically size the component, it also exports
the following `className`s allowing you to apply custom styles.

| `className`                | Purpose                                                                   |
| :------------------------- | :------------------------------------------------------------------------ |
| `CLASS_NAME_IMG`           | Base class for all images.                                                |
| `CLASS_NAME_IMG_PRIMARY`   | Class of first image in `images[]` (sets the size of the main component). |
| `CLASS_NAME_IMG_SECONDARY` | Class of subsequent images.                                               |

---

## Contributing

See the [contributing guide](./CONTRIBUTING.md) to get started.

---

## Browser Support

The library is built for `ES2021`.

## Notes

- It's recommended you use a minimum of 24-36 for a smooth experience
- Legacy version by [@andrewmcoupe](https://github.com/andrewmcoupe)
