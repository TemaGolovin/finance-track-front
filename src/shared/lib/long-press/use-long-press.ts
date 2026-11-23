'use client';

import {
  type DragEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
} from 'react';
import {
  type AncestorNode,
  type GestureCommand,
  type GestureResult,
  type GestureState,
  LONG_PRESS_DURATION_MS,
  TOUCH_CONTEXT_MENU_FALLBACK_MS,
  exceedsMoveTolerance,
  hasInteractiveAncestor,
  initialGestureState,
  reduceGesture,
} from './long-press-gesture';

interface UseLongPressOptions {
  onLongPress: () => void;
  disabled?: boolean;
}

interface PointerOrigin {
  x: number;
  y: number;
  pointerId: number;
  pointerType: string;
}

function isAncestorNode(value: EventTarget | null): value is AncestorNode & Element {
  return value instanceof Element;
}

function shouldIgnorePress(target: EventTarget | null, boundary: EventTarget | null): boolean {
  if (!isAncestorNode(target) || !isAncestorNode(boundary)) return false;
  return hasInteractiveAncestor(target, boundary);
}

export function useLongPress({ onLongPress, disabled = false }: UseLongPressOptions) {
  const onLongPressRef = useRef(onLongPress);
  onLongPressRef.current = onLongPress;

  const stateRef = useRef<GestureState>(initialGestureState);
  const originRef = useRef<PointerOrigin | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const detachRef = useRef<(() => void) | null>(null);

  const clearTimers = () => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const stopTracking = () => {
    detachRef.current?.();
    detachRef.current = null;
    originRef.current = null;
  };

  const dispatchRef = useRef<(command: GestureCommand, pointerType?: string) => GestureResult>(
    () => ({
      state: initialGestureState,
      openMenu: false,
      clearTimer: false,
      startTimer: false,
      armTouchFallback: false,
      consumeClick: false,
    }),
  );

  dispatchRef.current = (command, pointerType) => {
    const next = reduceGesture(stateRef.current, command);
    stateRef.current = next.state;

    if (next.clearTimer) clearTimers();

    if (next.startTimer) {
      holdTimerRef.current = window.setTimeout(() => {
        holdTimerRef.current = null;
        const pointerType = originRef.current?.pointerType;
        dispatchRef.current({ type: 'hold-elapsed' }, pointerType);
      }, LONG_PRESS_DURATION_MS);
    }

    if (next.armTouchFallback) {
      fallbackTimerRef.current = window.setTimeout(() => {
        fallbackTimerRef.current = null;
        if (originRef.current) return;
        dispatchRef.current({ type: 'touch-context-fallback' }, 'touch');
      }, TOUCH_CONTEXT_MENU_FALLBACK_MS);
    }

    if (next.openMenu) {
      if (pointerType === 'touch' || pointerType === 'pen') {
        try {
          navigator.vibrate?.(10);
        } catch {
          // браузер может запретить вибрацию
        }
      }
      onLongPressRef.current();
    }

    return next;
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
      if (fallbackTimerRef.current !== null) window.clearTimeout(fallbackTimerRef.current);
      detachRef.current?.();
      detachRef.current = null;
      originRef.current = null;
    };
  }, []);

  const trackPointer = (origin: PointerOrigin) => {
    stopTracking();
    originRef.current = origin;

    const onMove = (event: globalThis.PointerEvent) => {
      const current = originRef.current;
      if (!current || event.pointerId !== current.pointerId) return;
      if (!exceedsMoveTolerance(current.x, current.y, event.clientX, event.clientY)) return;
      stopTracking();
      dispatchRef.current({ type: 'move-beyond-tolerance' });
    };

    const onUp = (event: globalThis.PointerEvent) => {
      const current = originRef.current;
      if (!current || event.pointerId !== current.pointerId) return;
      const type = current.pointerType;
      stopTracking();
      dispatchRef.current({ type: 'pointer-up' }, type);
    };

    const onCancel = (event: globalThis.PointerEvent) => {
      const current = originRef.current;
      if (!current || event.pointerId !== current.pointerId) return;
      stopTracking();
      dispatchRef.current({ type: 'pointer-cancel' });
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    detachRef.current = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
    };
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (disabled || event.button !== 0) return;
    if (shouldIgnorePress(event.target, event.currentTarget)) return;

    trackPointer({
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
    });
    dispatchRef.current({ type: 'pointer-down' });
  };

  const onContextMenu = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return;
    if (shouldIgnorePress(event.target, event.currentTarget)) return;
    event.preventDefault();

    const kind = event.button === 2 || !originRef.current ? 'mouse' : 'touch';
    dispatchRef.current({ type: 'context-menu', kind }, kind === 'touch' ? 'touch' : 'mouse');
  };

  const onClickCapture = (event: MouseEvent<HTMLElement>) => {
    const next = dispatchRef.current({ type: 'click' });
    if (!next.consumeClick) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragStart = (event: DragEvent<HTMLElement>) => {
    if (stateRef.current.phase !== 'idle') event.preventDefault();
  };

  return {
    bind: {
      onPointerDown,
      onContextMenu,
      onClickCapture,
      onDragStart,
    },
  };
}
