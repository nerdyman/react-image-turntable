[![andrewmcoupe](https://circleci.com/gh/andrewmcoupe/react-image-turntable.svg?style=shield)](LINK)

# React Image Turntable

###### built with TypeScript

![](/readme-assets/example.gif)

### [Try the demo](https://codesandbox.io/s/react-image-turntable-riy93) 👈

This package aims to display an object in 360 degree perspective with the use of multiple, angled images from around the object itself which you need to provide.

A decent looking turntable will require 20-35 angled images from around the object, ordered correctly.

## Installation

`npm i react-image-turntable`

or

`yarn add react-image-turntable`

## Usage

| Props  |   Type   |
| ------ | :------: |
| images | string[] |

---

```javascript
import React from 'react'
import { Turntable } from 'react-image-turntable'

const myImages = [<YOUR_IMAGE_PATHS>]

const MyTurntable = () => (
    <Turntable images={myImages} />
)
```

## Notes

- Original implementation by @andrewmcoupe
