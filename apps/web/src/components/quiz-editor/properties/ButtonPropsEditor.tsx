'use client';

import React from 'react';
import { QuizBlock } from '@/lib/types';

type ButtonBlock = Extract<QuizBlock, { type: 'BUTTON' }>;
type ButtonVariant = ButtonBlock['props']['variant'];

export default function ButtonPropsEditor({block, onChange}: {
  block: ButtonBlock;
  onChange: (next: QuizBlock) => void;
}) {
  const setProps = (nextProps: ButtonBlock['props']) => onChange({ ...block, props: nextProps });

  return (
    <>
      <label className="block text-sm">
        Label
        <input
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.label}
          onChange={(e) => setProps({ ...block.props, label: e.target.value })}
        />
      </label>

      <label className="block text-sm">
        Variant
        <select
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.variant}
          onChange={(e) => setProps({ ...block.props, variant: e.target.value as ButtonVariant })}
        >
          <option value="next">Next</option>
          <option value="submit">Submit</option>
        </select>
      </label>
    </>
  );
}
