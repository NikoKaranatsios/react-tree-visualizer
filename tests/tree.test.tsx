import { test } from 'node:test';
import assert from 'node:assert/strict';
import React, { useState } from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import TreeVisualizer from '../src/TreeVisualizer';
import { createComponentTree, formatProps } from '../src/componentTree';

test('declared elements, fragments and function components have names and depth limits', () => {
  function Hooked() { useState(0); throw new Error('Components must not be executed'); }
  const input = <section><React.Fragment><Hooked /></React.Fragment></section>;
  const tree = createComponentTree(input)!;
  assert.equal(tree.label, 'section');
  assert.equal(tree.children[0].label, 'Fragment');
  assert.equal(tree.children[0].children[0].label, 'Hooked');
  assert.equal(createComponentTree(input, 0)!.children.length, 0);
  assert.equal(createComponentTree(Hooked)!.label, 'Hooked');
});

test('selection persists across state updates and keyboard-accessible buttons are used', () => {
  const view = TestRenderer.create(<TreeVisualizer component={<section><span title="child" /></section>} />);
  let buttons = view.root.findAllByType('button');
  act(() => buttons[1].props.onClick());
  buttons = view.root.findAllByType('button');
  assert.equal(buttons[1].props['aria-pressed'], true);
  assert.equal(buttons[0].props['aria-pressed'], false);
  assert.equal(buttons[1].props.style.color, '#FF5722');
});

test('props may include circular references, bigint and callbacks', () => {
  const circular: Record<string, unknown> = {};
  circular.self = circular;
  const text = formatProps({ circular, count: BigInt(12), onClick() {} });
  assert.match(text, /Circular/);
  assert.match(text, /12n/);
  assert.match(text, /Function onClick/);
});
