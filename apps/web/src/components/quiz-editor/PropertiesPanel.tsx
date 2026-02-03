'use client';

import React from 'react';
import { QuizBlock } from '../../../../../libs/types';
import HeadingPropsEditor from './properties/HeadingPropsEditor';
import QuestionPropsEditor from './properties/QuestionPropsEditor';
import ButtonPropsEditor from './properties/ButtonPropsEditor';
import FooterPropsEditor from './properties/FooterPropsEditor';

type Props = {
  block: QuizBlock | null;
  onChange: (next: QuizBlock) => void;
};

const BLOCK_EDITOR_MAP = {
  HEADING: HeadingPropsEditor,
  QUESTION: QuestionPropsEditor,
  BUTTON: ButtonPropsEditor,
  FOOTER: FooterPropsEditor,
} as const;

export default function PropertiesPanel({ block, onChange }: Props) {
  if (!block) {
    return <div className="text-sm text-[var(--ui-muted)]">Select a block to edit its properties.</div>;
  }

  const EditorComponent = BLOCK_EDITOR_MAP[block.type];

  return (
    <div className="space-y-4 text-[var(--ui-text)]">
      <div className="text-sm font-semibold">Properties</div>

      {EditorComponent && <EditorComponent block={block} onChange={onChange} />}
    </div>
  );
}
