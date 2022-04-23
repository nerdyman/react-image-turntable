<div align="center">

# React Image Turntable

Display a set of images as a draggable 360 degree turntable.

### [👉 &nbsp; Try the demo &nbsp;👈](https://githubbox.com/nerdyman/react-image-turntable/tree/main/example)

<br />

<a href="https://github.com/nerdyman/react-image-turntable/blob/main/LICENSE">
  <img src="https://img.shields.io/npm/l/react-image-turntable.svg" alt="License MIT" />
</a>
<a href="https://npmjs.com/package/react-image-turntable">
  <img src="https://img.shields.io/npm/v/react-image-turntable.svg?label=package" alt="NPM package" />
</a>
<a href="https://github.com/nerdyman/react-image-turntable/actions?query=workflow%3Aci">
  <img src="https://img.shields.io/github/workflow/status/nerdyman/react-image-turntable/ci?label=ci" alt="CI Status" />
</a>

</div>

## Features

- Accessible
- Responsive & fluid with intrinsic sizing
- Teeny Tiny (less than 1kb gzipped)
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

### Props

| Props                 | Type       | Required | Default Value | Description                                                                  |
| --------------------- | :--------- | :------: | :------------ | :--------------------------------------------------------------------------- |
| `images`              | `string[]` |    ✓     | `undefined`   | List of image `src` attributes.                                              |
| `initialImageIndex`   | `number`   |          | `0`           | Index of image to show first.                                                |
| `movementSensitivity` | `number`   |          | `20`          | The amount a "drag" has to move before an image changes to next or previous. |

### Example

```ts
import React from 'react';
import { ReactImageTurntable } from 'react-image-turntable';

const images = [
  'https://via.placeholder.com/1200x800?text=1',
  'https://via.placeholder.com/1200x800?text=2',
  'https://via.placeholder.com/1200x800?text=3',
];

export const Turntable = () => <ReactImageTurntable images={images} />;
```

Also see the [example code](./example) in the repo.

### Custom Styling

The library uses the first image passed to intrinsically size the component, it also exports following
`className`s to apply custom styles when needed:

| `className`                | Purpose                                                              |
| -------------------------- | -------------------------------------------------------------------- |
| `CLASS_NAME_IMG`           | Base class for images.                                               |
| `CLASS_NAME_IMG_PRIMARY`   | Class of first rendered image (sets the size of the main component). |
| `CLASS_NAME_IMG_SECONDARY` | Class of subsequent images.                                          |

## Contributing

See the [contributing guide](./CONTRIBUTING.md) to get started.

---

## Notes

- It's recommended you use a minimum of 24-36 for a smooth experience
- Legacy [v2.5.4 Demo](https://codesandbox.io/s/react-image-turntable-riy93)
- Original version by [@andrewmcoupe](https://github.com/andrewmcoupe)
