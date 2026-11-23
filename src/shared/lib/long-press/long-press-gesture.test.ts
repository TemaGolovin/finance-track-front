import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  type AncestorNode,
  type GestureCommand,
  type GestureState,
  exceedsMoveTolerance,
  hasInteractiveAncestor,
  initialGestureState,
  reduceGesture,
} from './long-press-gesture.ts';

function run(commands: GestureCommand[], start: GestureState = initialGestureState) {
  const opened: boolean[] = [];
  let state = start;
  let lastConsume = false;
  for (const command of commands) {
    const next = reduceGesture(state, command);
    state = next.state;
    if (next.openMenu) opened.push(true);
    lastConsume = next.consumeClick;
  }
  return { state, openedCount: opened.length, lastConsume };
}

const row: AncestorNode = { tagName: 'DIV', parentElement: null };
const link: AncestorNode = { tagName: 'A', parentElement: row };
const button: AncestorNode = { tagName: 'BUTTON', parentElement: row };
const icon: AncestorNode = { tagName: 'SVG', parentElement: button };

describe('hasInteractiveAncestor', () => {
  it('игнорирует удержание, начатое на кнопке внутри строки', () => {
    assert.equal(hasInteractiveAncestor(icon, row), true);
    assert.equal(hasInteractiveAncestor(button, row), true);
  });

  it('не считает ссылку строки вложенным контролом', () => {
    assert.equal(hasInteractiveAncestor(link, row), false);
  });

  it('не игнорирует сам корень, даже если это кнопка', () => {
    assert.equal(hasInteractiveAncestor(button, button), false);
  });
});

describe('exceedsMoveTolerance', () => {
  it('прощает дрожание пальца в пределах допуска', () => {
    assert.equal(exceedsMoveTolerance(0, 0, 6, 8), false);
  });

  it('считает сдвигом жест длиннее допуска', () => {
    assert.equal(exceedsMoveTolerance(0, 0, 10, 1), true);
  });
});

describe('reduceGesture', () => {
  it('короткое нажатие не открывает меню и не гасит клик', () => {
    const { state, openedCount, lastConsume } = run([
      { type: 'pointer-down' },
      { type: 'pointer-up' },
      { type: 'click' },
    ]);
    assert.equal(openedCount, 0);
    assert.equal(lastConsume, false);
    assert.equal(state.suppressClick, false);
  });

  it('открывает меню по таймеру удержания и гасит следующий клик один раз', () => {
    const duringHold = run([{ type: 'pointer-down' }, { type: 'hold-elapsed' }]);
    assert.equal(duringHold.openedCount, 1);
    assert.equal(duringHold.state.phase, 'armed');

    const held = run([{ type: 'pointer-down' }, { type: 'hold-elapsed' }, { type: 'pointer-up' }]);
    assert.equal(held.openedCount, 1);
    assert.equal(held.state.suppressClick, true);

    const consumed = reduceGesture(held.state, { type: 'click' });
    assert.equal(consumed.consumeClick, true);
    assert.equal(consumed.state.suppressClick, false);

    const nextClick = reduceGesture(consumed.state, { type: 'click' });
    assert.equal(nextClick.consumeClick, false);
  });

  it('не открывает меню повторно на отпускании после удержания', () => {
    const { openedCount } = run([
      { type: 'pointer-down' },
      { type: 'hold-elapsed' },
      { type: 'pointer-up' },
    ]);
    assert.equal(openedCount, 1);
  });

  it('отменяет удержание, если палец сдвинулся до порога', () => {
    const { openedCount, state } = run([
      { type: 'pointer-down' },
      { type: 'move-beyond-tolerance' },
      { type: 'pointer-up' },
    ]);
    assert.equal(openedCount, 0);
    assert.equal(state.phase, 'idle');
  });

  it('после открытия меню сдвиг пальца не открывает клик по ссылке', () => {
    const moved = run([
      { type: 'pointer-down' },
      { type: 'hold-elapsed' },
      { type: 'move-beyond-tolerance' },
    ]);
    assert.equal(moved.openedCount, 1);
    assert.equal(moved.state.suppressClick, true);
  });

  it('не даёт сработавшему таймеру открыть меню после отмены', () => {
    const { openedCount } = run([
      { type: 'pointer-down' },
      { type: 'move-beyond-tolerance' },
      { type: 'hold-elapsed' },
    ]);
    assert.equal(openedCount, 0);
  });

  it('правый клик открывает меню и не съедает следующее нажатие', () => {
    const opened = reduceGesture(initialGestureState, { type: 'context-menu', kind: 'mouse' });
    assert.equal(opened.openMenu, true);
    assert.equal(opened.state.suppressClick, false);
    assert.equal(opened.clearTimer, true);
  });

  it('контекстное меню тача сразу открывает меню', () => {
    const touch = reduceGesture(initialGestureState, { type: 'context-menu', kind: 'touch' });
    assert.equal(touch.openMenu, true);
    assert.equal(touch.state.phase, 'armed');
    assert.equal(touch.state.suppressClick, true);

    const released = reduceGesture(touch.state, { type: 'pointer-up' });
    assert.equal(released.openMenu, false);
    assert.equal(released.state.suppressClick, true);
  });

  it('запасной таймер тача открывает меню, только если жест ещё взведён', () => {
    const armed = reduceGesture(
      { phase: 'armed', suppressClick: false },
      { type: 'touch-context-fallback' },
    );
    assert.equal(armed.openMenu, true);

    const idle = reduceGesture(initialGestureState, { type: 'touch-context-fallback' });
    assert.equal(idle.openMenu, false);
  });

  it('новое нажатие снимает подавление, если клик после удержания не пришёл', () => {
    const held = run([
      { type: 'pointer-down' },
      { type: 'hold-elapsed' },
      { type: 'pointer-up' },
      { type: 'pointer-down' },
    ]);
    assert.equal(held.state.suppressClick, false);
    assert.equal(held.state.phase, 'pending');
  });

  it('сохраняет подавление клика, если контекстное меню пришло сразу после удержания', () => {
    const held = run([
      { type: 'pointer-down' },
      { type: 'hold-elapsed' },
      { type: 'pointer-up' },
      { type: 'context-menu', kind: 'mouse' },
    ]);
    assert.equal(held.state.suppressClick, true);
    assert.equal(held.openedCount, 2);
  });
});
