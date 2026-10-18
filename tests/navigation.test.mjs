import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollToSection, getIsTouchDevice } from '../app/lib/utils.ts';

test('section navigation respects reduced motion and missing targets', () => {
  let options;
  let focusedWithoutScrolling = false;
  globalThis.document = { getElementById: id => id === 'projects' ? { scrollIntoView: value => { options = value; }, focus: value => { focusedWithoutScrolling = value.preventScroll; } } : null };
  globalThis.window = { matchMedia: () => ({ matches: true }) };
  scrollToSection('projects');
  assert.equal(options.behavior, 'instant');
  assert.equal(focusedWithoutScrolling, true);
  window.matchMedia = () => ({ matches: false });
  scrollToSection('projects');
  assert.equal(options.behavior, 'smooth');
  assert.doesNotThrow(() => scrollToSection('missing'));
  delete globalThis.window;
  delete globalThis.document;
});

test('touch detection is safe during server rendering', () => {
  assert.equal(getIsTouchDevice(), true);
});
