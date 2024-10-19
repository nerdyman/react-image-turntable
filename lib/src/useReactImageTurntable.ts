import { useCallback, useEffect, useRef, useState } from 'react';

import type { UseReactImageTurntableProps, UseReactImageTurntableReturn } from './types.js';

const defaultAutoRotate = {};

export const useReactImageTurntable = ({
  initialImageIndex = 0,
  autoRotate = defaultAutoRotate,
  images,
  movementSensitivity = 20,
  onIndexChange,
}: UseReactImageTurntableProps): UseReactImageTurntableReturn => {
  const imagesCount = images.length - 1;
  const { interval: autoRotateInterval = 200, enabled: autoRotateIsEnabled = false } = autoRotate;
  const [activeImageIndex, setActiveImageIndexUnsafe] = useState(initialImageIndex);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const turntableRef = useRef<HTMLDivElement>(null);

  /**
   * Safely set the image index with fallback to 0 if the index is out of bounds.
   */
  const setActiveImageIndex = useCallback(
    (index: number) => {
      const nextIndex = index > imagesCount ? 0 : index < 0 ? imagesCount : index;
      setActiveImageIndexUnsafe(nextIndex);
    },
    [imagesCount],
  );

  // Handle image count changes.
  useEffect(() => {
    if (activeImageIndex > imagesCount) setActiveImageIndexUnsafe(0);
  }, [activeImageIndex, imagesCount]);

  // Handle `onIndexChange` callback.
  useEffect(() => {
    if (onIndexChange) onIndexChange(activeImageIndex);
  }, [activeImageIndex, onIndexChange]);

  // Control autorotation.
  useEffect(() => {
    const clearAutoRotateInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (autoRotateIsEnabled && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndexUnsafe((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex > imagesCount ? 0 : nextIndex;
        });
      }, autoRotateInterval);
    }

    if (!autoRotateIsEnabled) {
      clearAutoRotateInterval();
    }

    return () => clearAutoRotateInterval();
  }, [autoRotateInterval, autoRotateIsEnabled, imagesCount]);

  // Event bindings.
  useEffect(() => {
    const target = turntableRef.current as HTMLDivElement;
    let prevDragPosition = 0;

    const incrementActiveIndex = () => {
      setActiveImageIndexUnsafe((prev) => {
        const next = prev + 1 > imagesCount ? 0 : prev + 1;
        return next;
      });
    };

    const decrementActiveIndex = () => {
      setActiveImageIndexUnsafe((prev) => {
        const next = prev - 1 < 0 ? imagesCount : prev - 1;
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
    activeImageIndex,
    setActiveImageIndex,
    images,
    ref: turntableRef,
  };
};
