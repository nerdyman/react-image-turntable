<div align="center">

# React Image Turntable

Display a set of images as a draggable 360 degree turntable.

### [👉 &nbsp; Try the demo &nbsp;👈](https://githubbox.com/nerdyman/react-image-turntable/tree/main/example)

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

### Props

| Props    |    Type    | Required |
| -------- | :--------: | :------: |
| `images` | `string[]` |    ✓     |

### Example

```ts
import React from 'react';
import { Turntable } from 'react-image-turntable';

const images = [
  'https://via.placeholder.com/1200x800?text=1',
  'https://via.placeholder.com/1200x800?text=2',
  'https://via.placeholder.com/1200x800?text=3',
];

export const Turntable = () => <Turntable images={images} />;
```

Also see the [example code](./example) in the repo.

## Contributing

See the [contributing guide](./CONTRIBUTING.md) to get started.

---

## Notes

- It's recommended you use a minimum of 24-36 for a smooth experience
- Legacy [v2.5.4 Demo](https://codesandbox.io/s/react-image-turntable-riy93)
- Original version by [@andrewmcoupe](https://github.com/andrewmcoupe)
