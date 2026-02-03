'use client';

import React from 'react';
import { QuizBlock } from '../../../../../../libs/types';
import PropertiesPanel from '../PropertiesPanel';

type Props = {
  block: QuizBlock | null;
  onChange: (next: QuizBlock) => void;
};

export default function PropertiesSidebar({ block, onChange }: Props) {
  return (
    <aside className="col-span-3 border-l border-[var(--ui-border)] p-4 bg-[var(--ui-surface-2)]">
      <PropertiesPanel block={block} onChange={onChange} />
    </aside>
  );
}
