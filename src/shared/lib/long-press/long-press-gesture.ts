export const LONG_PRESS_DURATION_MS = 500;
export const LONG_PRESS_MOVE_TOLERANCE_PX = 10;
export const TOUCH_CONTEXT_MENU_FALLBACK_MS = 350;

const INTERACTIVE_TAGS = new Set(['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']);

export interface AncestorNode {
  tagName: string;
  parentElement: AncestorNode | null;
}

export function hasInteractiveAncestor(
  start: AncestorNode | null,
  boundary: AncestorNode | null,
): boolean {
  let node = start;
  while (node && node !== boundary) {
    if (INTERACTIVE_TAGS.has(node.tagName)) return true;
    node = node.parentElement;
  }
  return false;
}

export function exceedsMoveTolerance(
  startX: number,
  startY: number,
  x: number,
  y: number,
  tolerance = LONG_PRESS_MOVE_TOLERANCE_PX,
): boolean {
  const dx = x - startX;
  const dy = y - startY;
  return dx * dx + dy * dy > tolerance * tolerance;
}

export type GesturePhase = 'idle' | 'pending' | 'armed';

export interface GestureState {
  phase: GesturePhase;
  suppressClick: boolean;
}

export const initialGestureState: GestureState = {
  phase: 'idle',
  suppressClick: false,
};

export type GestureCommand =
  | { type: 'pointer-down' }
  | { type: 'move-beyond-tolerance' }
  | { type: 'pointer-up' }
  | { type: 'pointer-cancel' }
  | { type: 'hold-elapsed' }
  | { type: 'context-menu'; kind: 'mouse' | 'touch' }
  | { type: 'touch-context-fallback' }
  | { type: 'click' };

export interface GestureResult {
  state: GestureState;
  openMenu: boolean;
  clearTimer: boolean;
  startTimer: boolean;
  armTouchFallback: boolean;
  consumeClick: boolean;
}

function result(
  state: GestureState,
  patch: Partial<Omit<GestureResult, 'state'>> = {},
): GestureResult {
  return {
    state,
    openMenu: false,
    clearTimer: false,
    startTimer: false,
    armTouchFallback: false,
    consumeClick: false,
    ...patch,
  };
}

export function reduceGesture(state: GestureState, command: GestureCommand): GestureResult {
  switch (command.type) {
    case 'pointer-down':
      return result(
        { phase: 'pending', suppressClick: false },
        { clearTimer: true, startTimer: true },
      );
    case 'move-beyond-tolerance':
    case 'pointer-cancel':
      if (state.phase === 'idle') return result(state);
      return result(
        { phase: 'idle', suppressClick: state.phase === 'armed' },
        { clearTimer: true },
      );
    case 'hold-elapsed':
      if (state.phase !== 'pending') return result(state);
      return result({ phase: 'armed', suppressClick: true }, { openMenu: true });
    case 'pointer-up':
      if (state.phase === 'armed') {
        return result({ phase: 'idle', suppressClick: true }, { clearTimer: true });
      }
      if (state.phase === 'pending') {
        return result({ phase: 'idle', suppressClick: false }, { clearTimer: true });
      }
      return result(state);
    case 'context-menu':
      if (command.kind === 'mouse') {
        return result(
          { phase: 'idle', suppressClick: state.suppressClick },
          { openMenu: true, clearTimer: true },
        );
      }
      return result(
        { phase: 'armed', suppressClick: true },
        { openMenu: true, clearTimer: true },
      );
    case 'touch-context-fallback':
      if (state.phase !== 'armed') return result(state);
      return result({ phase: 'idle', suppressClick: true }, { openMenu: true });
    case 'click':
      if (!state.suppressClick) return result(state);
      return result({ phase: 'idle', suppressClick: false }, { consumeClick: true });
    default:
      return result(state);
  }
}
