import { useCallback, useEffect, useRef, useState } from 'react';

import type { UseReactImageTurntableProps, UseReactImageTurntableReturn } from './types';

export const useReactImageTurntable = ({
  initialImageIndex = 0,
  autoRotate = { disabled: true, interval: 200 },
  images,
  movementSensitivity = 20,
  onIndexChange,
}: UseReactImageTurntableProps): UseReactImageTurntableReturn => {
  const [activeImageIndex, setActiveImageIndexState] = useState(initialImageIndex);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const turntableRef = useRef<HTMLDivElement>(null);
  const imagesCount = images.length - 1;

  /**
   * Safely set the next image index with negative indexes set to `0` and indexes greater than the total
   * images set to the last image.
   */
  const setActiveImageIndex = useCallback(
    (index: number) => {
      const nextIndex = index > imagesCount ? 0 : index < 0 ? imagesCount : index;
      setActiveImageIndexState(nextIndex);
    },
    [imagesCount],
  );

  const clearAutoRotateInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  // Handle image count changes.
  useEffect(() => {
    if (activeImageIndex > imagesCount) setActiveImageIndexState(imagesCount);
  }, [imagesCount]);

  // Control autorotation.
  useEffect(() => {
    if (!autoRotate?.disabled && !intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        setActiveImageIndexState((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex > imagesCount ? 0 : nextIndex;
        });
      }, autoRotate.interval || 200);
    }

    if (autoRotate.disabled) {
      clearAutoRotateInterval();
    }

    return () => clearAutoRotateInterval();
  }, [autoRotate, imagesCount]);

  // Event bindings.
  useEffect(() => {
    const target = turntableRef.current as HTMLDivElement;
    let prevDragPosition = 0;

    const incrementActiveIndex = () => {
      setActiveImageIndexState((prev) => {
        const next = prev + 1 > imagesCount ? 0 : prev + 1;
        onIndexChange?.(next);
        return next;
      });
    };

    const decrementActiveIndex = () => {
      setActiveImageIndexState((prev) => {
        const next = prev - 1 < 0 ? imagesCount : prev - 1;
        onIndexChange?.(next);
        return next;
      });
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'ArrowLeft') {
        decrementActiveIndex();
      } else if (ev.key === 'ArrowRight') {
        incrementActiveIndex();
      }
    };

    const handlePointerMove = (ev: PointerEvent) => {
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
  }, [imagesCount, movementSensitivity, onIndexChange]);

  return {
    images,
    activeImageIndex,
    setActiveImageIndex,
    turntableRef,
  };
};
