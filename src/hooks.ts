import { useEffect, useRef, useState } from 'react';

import type { ReactImageTurntableProps } from './types';

interface UseTurntableStateProps
  extends Required<Pick<ReactImageTurntableProps, 'initialImageIndex'>> {
  imagesCount: number;
}

export const useTurntableState = ({
  initialImageIndex = 0,
  imagesCount,
}: UseTurntableStateProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = ref.current;
    let prevDragPosition = 0;
    let isDragging = false;

    const incrementActiveIndex = () => {
      setActiveImageIndex((prev) => (prev + 1 > imagesCount - 1 ? 0 : prev + 1));
    };

    const decrementActiveIndex = () => {
      setActiveImageIndex((prev) => (prev - 1 < 0 ? imagesCount - 1 : prev - 1));
    };

    const handlePointerDown = (ev: PointerEvent) => {
      // ev.preventDefault();
      prevDragPosition = ev.clientX;
      isDragging = true;
    };

    const handlePointerMove = (ev: PointerEvent) => {
      if (isDragging) {
        const distanceDragged = prevDragPosition - ev.clientX;

        if (distanceDragged <= -20) {
          incrementActiveIndex();
          prevDragPosition = prevDragPosition + 20;
        } else if (distanceDragged >= 20) {
          prevDragPosition = prevDragPosition - 20;
          decrementActiveIndex();
        }
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    target?.addEventListener('pointerdown', handlePointerDown, { passive: true });
    target?.addEventListener('pointermove', handlePointerMove, { passive: true });
    target?.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      target?.removeEventListener('pointerdown', handlePointerDown);
      target?.removeEventListener('pointermove', handlePointerMove);
      target?.removeEventListener('pointerup', handlePointerUp);
    };
  }, [imagesCount]);

  return {
    ref,
    activeImageIndex,
  };
};
