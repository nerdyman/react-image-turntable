import { useEffect, useRef, useState } from 'react';

import type { ReactImageTurntableProps } from './types';

interface UseTurntableStateProps
  extends Required<
    Pick<ReactImageTurntableProps, 'initialImageIndex' | 'movementSensitivity' | 'autoRotate'>
  > {
  /** Number of images starting from zero. */
  imagesCount: number;
}

export const useTurntableState = ({
  initialImageIndex,
  imagesCount,
  movementSensitivity,
  autoRotate,
}: UseTurntableStateProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImageIndex(initialImageIndex);
  }, [initialImageIndex]);

  const clearAutoRotateInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  useEffect(() => {
    if (autoRotate.enabled && !hasUserInteracted && !intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        setActiveImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex > imagesCount ? 0 : nextIndex;
        });
      }, autoRotate.speed || 200);
    }
    if (hasUserInteracted) clearAutoRotateInterval();

    return () => clearAutoRotateInterval();
  }, [autoRotate, hasUserInteracted, imagesCount]);

  useEffect(() => {
    const target = ref.current as HTMLDivElement;
    let prevDragPosition = 0;

    const incrementActiveIndex = () => {
      setActiveImageIndex((prev) => (prev + 1 > imagesCount ? 0 : prev + 1));
    };

    const decrementActiveIndex = () => {
      setActiveImageIndex((prev) => (prev - 1 < 0 ? imagesCount : prev - 1));
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
      setHasUserInteracted(true);
      if (ev.key === 'ArrowLeft') {
        decrementActiveIndex();
      } else if (ev.key === 'ArrowRight') {
        incrementActiveIndex();
      }
    };

    const handlePointerMove = (ev: PointerEvent) => {
      setHasUserInteracted(true);
      const distanceDragged = prevDragPosition - ev.clientX;

      if (distanceDragged <= -movementSensitivity) {
        prevDragPosition = prevDragPosition + movementSensitivity;
        incrementActiveIndex();
      }

      if (distanceDragged >= movementSensitivity) {
        prevDragPosition = prevDragPosition - movementSensitivity;
        decrementActiveIndex();
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    const handlePointerDown = (ev: PointerEvent) => {
      setHasUserInteracted(true);
      if (ev.button == 2) {
        return;
      }

      prevDragPosition = ev.clientX;
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerup', handlePointerUp, { passive: true });
    };

    target.addEventListener('keydown', handleKeyDown, { capture: true });
    target.addEventListener('pointerdown', handlePointerDown, { capture: true });

    return () => {
      target.removeEventListener('keydown', handleKeyDown, { capture: true });
      target.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [imagesCount, movementSensitivity]);

  return {
    ref,
    activeImageIndex,
  };
};
