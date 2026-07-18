import { ReactImageTurntable, useReactImageTurntable } from 'react-image-turntable';

export const images = Array.from({ length: 48 }, (_, index) => ({
  src: `https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/${index + 1}.webp`,
  alt: `Turntable image ${index + 1}`,
})).reverse();

/**
 * Basic demo with required props only.
 */
export const BasicDemo = () => {
  const turntableProps = useReactImageTurntable({ images, initialImageIndex: 6 });

  return <ReactImageTurntable {...turntableProps} />;
};
