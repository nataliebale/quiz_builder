'use client';

import React from 'react';
import { QuizBlock } from '@/lib/types';
import HeadingPropsEditor from './properties/HeadingPropsEditor';
import QuestionPropsEditor from './properties/QuestionPropsEditor';
import ButtonPropsEditor from './properties/ButtonPropsEditor';
import FooterPropsEditor from './properties/FooterPropsEditor';

type Props = {
  block: QuizBlock | null;
  onChange: (next: QuizBlock) => void;
};

export default function PropertiesPanel({ block, onChange }: Props) {
  if (!block) {
    return <div className="text-sm text-[var(--ui-muted)]">Select a block to edit its properties.</div>;
  }

  return (
    <div className="space-y-4 text-[var(--ui-text)]">
      <div className="text-sm font-semibold">Properties</div>

      {block.type === 'HEADING' && <HeadingPropsEditor block={block} onChange={onChange} />}
      {block.type === 'QUESTION' && <QuestionPropsEditor block={block} onChange={onChange} />}
      {block.type === 'BUTTON' && <ButtonPropsEditor block={block} onChange={onChange} />}
      {block.type === 'FOOTER' && <FooterPropsEditor block={block} onChange={onChange} />}
    </div>
  );
}
