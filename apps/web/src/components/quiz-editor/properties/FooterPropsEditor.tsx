'use client';

import React from 'react';
import {QuizBlock} from '@/lib/types';

type FooterBlock = Extract<QuizBlock, { type: 'FOOTER' }>;

export default function FooterPropsEditor({block, onChange}: {
  block: FooterBlock;
  onChange: (next: QuizBlock) => void;
}) {
  const setProps = (nextProps: FooterBlock['props']) => onChange({...block, props: nextProps});

  return (
    <label className="block text-sm">
      Text
      <textarea
        className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
        value={block.props.text}
        onChange={(e) => setProps({...block.props, text: e.target.value})}
        rows={4}
      />
    </label>
  );
}
