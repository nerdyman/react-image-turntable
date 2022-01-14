import React from 'react'

enum ActionTypes {
  SET_TURNTABLE_IMAGES = 'SET_TURNTABLE_IMAGES',
  SET_ACTIVE_IMAGE_INDEX = 'SET_ACTIVE_IMAGE_INDEX',
  SET_DRAG_START_POSITION = 'SET_DRAG_START_POSITION',
  SET_IS_DRAGGING = 'SET_IS_DRAGGING',
  SET_DISTANCE_DRAGGED = 'SET_DISTANCE_DRAGGED',
  UNSUPPORTED_TYPE = 'UNSUPPORTED_TYPE',
}

interface ReducerState {
  activeImageIndex: number
  turntableImages: string | string[]
  dragStartPosition: number
  isDragging: boolean
  distanceDragged: number
}

interface Action {
  type: string
  payload: any
}

interface ReturnStructure {
  eventHandlers: {
    onTouchEnd: () => void
    onTouchStart: (event: React.TouchEvent<Element>) => void
    onTouchMove: (event: React.TouchEvent<Element>) => void
    onMouseUp: (event: React.MouseEvent) => void
    onMouseMove: (event: React.MouseEvent) => void
    onMouseDown: (event: React.MouseEvent) => void
    onDragStart: (event: React.DragEvent) => void
  }
  activeImageIndex: number
}

const initialState = {
  activeImageIndex: 0,
  turntableImages: [],
  dragStartPosition: 0,
  isDragging: false,
  distanceDragged: 0,
}

const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case ActionTypes.SET_TURNTABLE_IMAGES:
      return { ...state, turntableImages: action.payload }
    case ActionTypes.SET_ACTIVE_IMAGE_INDEX:
      return {
        ...state,
        activeImageIndex: action.payload,
      }
    case ActionTypes.SET_DRAG_START_POSITION:
      return {
        ...state,
        dragStartPosition: action.payload,
      }
    case ActionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.payload,
      }
    case ActionTypes.SET_DISTANCE_DRAGGED:
      return {
        ...state,
        distanceDragged: action.payload,
      }
    default:
      throw new Error(ActionTypes.UNSUPPORTED_TYPE)
  }
}

const useTurntable = (images: string[]): ReturnStructure => {
  const [
    {
      turntableImages,
      activeImageIndex,
      dragStartPosition,
      isDragging,
      distanceDragged,
    },
    dispatch,
  ] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    dispatch({ type: ActionTypes.SET_TURNTABLE_IMAGES, payload: images })
    dispatch({ type: ActionTypes.SET_ACTIVE_IMAGE_INDEX, payload: 0 })
  }, [])

  const handleLeftSwipe = (): void => {
    if (activeImageIndex === turntableImages.length - 1) {
      dispatch({ type: ActionTypes.SET_ACTIVE_IMAGE_INDEX, payload: 0 })
    } else {
      dispatch({
        type: ActionTypes.SET_ACTIVE_IMAGE_INDEX,
        payload: activeImageIndex + 1,
      })
    }
  }

  const handleRightSwipe = (): void => {
    if (activeImageIndex === 0) {
      dispatch({
        type: ActionTypes.SET_ACTIVE_IMAGE_INDEX,
        payload: images.length - 1,
      })
    } else {
      dispatch({
        type: ActionTypes.SET_ACTIVE_IMAGE_INDEX,
        payload: activeImageIndex - 1,
      })
    }
  }

  const updateImage = (dir: number) => {
    const isLeftSwipe = dir < 0

    if (isLeftSwipe) {
      handleLeftSwipe()
    } else {
      handleRightSwipe()
    }
  }

  const handleTouchStart = (event: React.TouchEvent): void => {
    const startOfTouchMove = Math.round(event.touches[0].clientX)
    dispatch({
      type: ActionTypes.SET_DRAG_START_POSITION,
      payload: startOfTouchMove,
    })
  }

  const resetDragMeasurement = (
    event: React.MouseEvent | React.TouchEvent
  ): void => {
    dispatch({
      type: ActionTypes.SET_IS_DRAGGING,
      payload: true,
    })

    if ('clientX' in event) {
      dispatch({
        type: ActionTypes.SET_DRAG_START_POSITION,
        payload: event.clientX,
      })
    } else {
      dispatch({
        type: ActionTypes.SET_DRAG_START_POSITION,
        payload: event.touches[0].clientX,
      })
    }
  }

  const handleTouchMove = (event: React.TouchEvent): void => {
    dispatch({
      type: ActionTypes.SET_IS_DRAGGING,
      payload: true,
    })
    dispatch({
      type: ActionTypes.SET_DISTANCE_DRAGGED,
      payload: dragStartPosition - Math.round(event.touches[0].clientX),
    })

    if (distanceDragged > 20) {
      resetDragMeasurement(event)
      updateImage(1)
    } else if (distanceDragged < -20) {
      resetDragMeasurement(event)
      updateImage(-1)
    }
  }

  const handleTouchEnd = (): void =>
    dispatch({
      type: ActionTypes.SET_IS_DRAGGING,
      payload: false,
    })

  const handleMouseDown = (event: React.MouseEvent): void => {
    dispatch({
      type: ActionTypes.SET_IS_DRAGGING,
      payload: true,
    })
    dispatch({
      type: ActionTypes.SET_DRAG_START_POSITION,
      payload: event.clientX,
    })
  }

  const handleMouseMove = (event: React.MouseEvent): void => {
    if (isDragging) {
      dispatch({
        type: ActionTypes.SET_DISTANCE_DRAGGED,
        payload: dragStartPosition - Math.round(event.clientX),
      })

      if (distanceDragged > 20) {
        resetDragMeasurement(event)
        updateImage(1)
      } else if (distanceDragged < -20) {
        resetDragMeasurement(event)
        updateImage(-1)
      }
    }
  }

  const eventHandlers = {
    onTouchEnd: handleTouchEnd,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onMouseUp: handleTouchEnd,
    onMouseMove: handleMouseMove,
    onMouseDown: handleMouseDown,
    onDragStart: (event: React.DragEvent) => event.preventDefault(),
  }

  return {
    eventHandlers,
    activeImageIndex,
  }
}

export { useTurntable }
