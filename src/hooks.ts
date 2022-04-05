import { useEffect, useRef, useState } from 'react';

import type { ReactImageTurntableProps } from './types';

interface UseTurntableStateProps
  extends Required<Pick<ReactImageTurntableProps, 'initialImageIndex' | "movementSensitivity">> {
  imagesCount: number;
}

export const useTurntableState = ({
  initialImageIndex = 0,
  imagesCount,
  movementSensitivity = 20
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

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (document.activeElement === ref.current) {
        if (ev.key === 'ArrowLeft') {
          decrementActiveIndex();
        } else if (ev.key === 'ArrowRight') {
          incrementActiveIndex();
        }
      }
    };

    const handlePointerDown = (ev: PointerEvent) => {
      prevDragPosition = ev.clientX;
      isDragging = true;
      window.addEventListener('pointerup', handlePointerUp, { passive: true });
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
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

    target?.addEventListener('keydown', handleKeyDown, { capture: true });
    target?.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      target?.removeEventListener('keydown', handleKeyDown);
      target?.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [imagesCount]);

  return {
    ref,
    activeImageIndex,
  };
};
