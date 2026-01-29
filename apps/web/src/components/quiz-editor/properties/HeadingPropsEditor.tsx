'use client';

import React from 'react';
import {QuizBlock} from '@/lib/types';

type HeadingBlock = Extract<QuizBlock, { type: 'HEADING' }>;

export default function HeadingPropsEditor({block, onChange}: {
  block: HeadingBlock;
  onChange: (next: QuizBlock) => void;
}) {
  const setProps = (nextProps: HeadingBlock['props']) => onChange({...block, props: nextProps});

  return (
    <>
      <label className="block text-sm">
        Text
        <input
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.text}
          onChange={(e) => setProps({...block.props, text: e.target.value})}
        />
      </label>

      <label className="block text-sm">
        Level
        <select
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.level}
          onChange={(e) => setProps({...block.props, level: Number(e.target.value) as 1 | 2 | 3})}
        >
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
        </select>
      </label>
    </>
  );
}
