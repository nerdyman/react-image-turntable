import { useEffect, useRef, useState } from 'react';

import type { ReactImageTurntableProps } from './types';

interface UseTurntableStateProps
  extends Required<Pick<ReactImageTurntableProps, 'initialImageIndex' | 'movementSensitivity'>> {
  /** Number of images starting from zero. */
  imagesCount: number;
}

export const useTurntableState = ({
  initialImageIndex,
  imagesCount,
  movementSensitivity,
}: UseTurntableStateProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImageIndex(initialImageIndex);
  }, [initialImageIndex]);

  useEffect(() => {
    const target = ref.current as HTMLDivElement;
    let prevDragPosition = 0;
    let isDragging = false;

    const incrementActiveIndex = () => {
      setActiveImageIndex((prev) => (prev + 1 > imagesCount ? 0 : prev + 1));
    };

    const decrementActiveIndex = () => {
      setActiveImageIndex((prev) => (prev - 1 < 0 ? imagesCount : prev - 1));
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (document.activeElement === ref.current) {
        if (ev.key === 'ArrowLeft') {
          decrementActiveIndex();
        } else if (ev.key === 'ArrowRight') {
          incrementActiveIndex();
        }
      }
    };

    const handlePointerMove = (ev: PointerEvent) => {
      if (isDragging) {
        const distanceDragged = prevDragPosition - ev.clientX;

        if (distanceDragged <= -movementSensitivity) {
          incrementActiveIndex();
          prevDragPosition = prevDragPosition + movementSensitivity;
        } else if (distanceDragged >= movementSensitivity) {
          prevDragPosition = prevDragPosition - movementSensitivity;
          decrementActiveIndex();
        }
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    const handlePointerDown = (ev: PointerEvent) => {
      isDragging = true;
      prevDragPosition = ev.clientX;
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerup', handlePointerUp, { passive: true });
    };

    target.addEventListener('keydown', handleKeyDown, { capture: true });
    target.addEventListener('pointerdown', handlePointerDown, { capture: true });

    return () => {
      target.removeEventListener('keydown', handleKeyDown);
      target.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [imagesCount, movementSensitivity]);

  return {
    ref,
    activeImageIndex,
  };
};
