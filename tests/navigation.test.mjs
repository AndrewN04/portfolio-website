import test from 'node:test';
import assert from 'node:assert/strict';
import { getIsTouchDevice } from '../app/lib/utils.ts';
import { vmFromHash, vms } from '../app/lib/vms.ts';

test('the URL hash picks the matching VM window', () => {
  assert.equal(vmFromHash('#projects'), 'projects');
  assert.equal(vmFromHash('#Contact'), 'contact');
  assert.equal(vmFromHash('about'), 'about');
  assert.equal(vmFromHash(''), null);
  assert.equal(vmFromHash('#main-content'), null);
  assert.deepEqual(vms.map(vm => vm.vmid), [100, 101, 102, 103]);
});

test('touch detection is safe during server rendering', () => {
  assert.equal(getIsTouchDevice(), true);
});
