<div align="center">

# React Image Turntable

Display an array of images as a 360 degree turntable.

### [Try the demo](https://codesandbox.io/s/react-image-turntable-riy93) 👈

</div>

## Install

```sh
npm i react-image-turntable
# Or
yarn add react-image-turntable
# Or
pnpm i react-image-turntable
```

## Usage

| Props    |    Type    | Required |
| -------- | :--------: | :------: |
| `images` | `string[]` |    ✓     |

### Example

```ts
import React from 'react';
import { Turntable } from 'react-image-turntable';

const images = [
  'https://via.placholder.com/1200x800?text=1',
  'https://via.placholder.com/1200x800?text=2',
  'https://via.placholder.com/1200x800?text=3',
];

export const Turntable = () => <Turntable images={images} />;
```

---

## Notes

- It's recommended you use a minimum of 24-36 for a smooth experience
- Original implementation by [@andrewmcoupe](https://github.com/andrewmcoupe)
