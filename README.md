<div align="center">

# React Image Turntable

Display a set of images as a draggable 360 degree turntable.

[![React Image Turntable with rotating car](https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/capture.gif)](https://codesandbox.io/s/github/nerdyman/react-image-turntable/tree/main/example?file=/src/App.tsx:5537-5598)

<a href="https://codesandbox.io/s/github/nerdyman/react-image-turntable/tree/main/example?file=/src/App.tsx:5537-5598" target="_blank" rel="noopener, noreferrer">

### [👉 &nbsp; Try the demo &nbsp;👈](https://codesandbox.io/s/github/nerdyman/react-image-turntable/tree/main/example?file=/src/App.tsx:5537-5598)

</a>

<br />

<a href="https://npmjs.com/package/react-image-turntable"><img src="https://img.shields.io/npm/v/react-image-turntable.svg?label=version" alt="NPM package" /></a>
<a href="https://github.com/nerdyman/react-image-turntable/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-image-turntable.svg" alt="License MIT" /></a>
<a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild"><img alt="GitHub CI status" src="https://img.shields.io/github/actions/workflow/status/nerdyman/react-image-turntable/main.yml" /></a>
<a href="https://codeclimate.com/github/nerdyman/react-image-turntable/test_coverage"><img src="https://img.shields.io/codeclimate/coverage/nerdyman/react-image-turntable" /></a>

</div>

## Features

- Accessible
- Responsive & fluid with intrinsic sizing
- Supports keyboard navigation
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
`className`s to apply custom styles when needed.

| `className`                | Purpose                                                              |
| :------------------------- | :------------------------------------------------------------------- |
| `CLASS_NAME_IMG`           | Base class for images.                                               |
| `CLASS_NAME_IMG_PRIMARY`   | Class of first rendered image (sets the size of the main component). |
| `CLASS_NAME_IMG_SECONDARY` | Class of subsequent images.                                          |

---

## Contributing

See the [contributing guide](./CONTRIBUTING.md) to get started.

---

## Browser Support

The library is built for `ES2021`.

## Notes

- It's recommended you use a minimum of 24-36 for a smooth experience
- Legacy [v2.5.4 Demo](https://codesandbox.io/s/react-image-turntable-riy93)
- Original version by [@andrewmcoupe](https://github.com/andrewmcoupe)
