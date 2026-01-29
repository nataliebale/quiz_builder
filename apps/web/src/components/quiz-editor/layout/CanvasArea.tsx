'use client';

import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CanvasDroppable from '../CanvasDroppable';
import SortableBlock from '../SortableBlock';
import { QuizBlock } from '@/lib/types';

type Props = {
  blocks: QuizBlock[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onDeleteSelected: () => void;
  children?: React.ReactNode;
};

export default function CanvasArea({ blocks, selectedId, onSelect, onDeleteSelected }: Props) {
  return (
    <>
      <div className="text-sm font-semibold mb-3 text-[var(--ui-text)]">Canvas</div>

      <CanvasDroppable>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {blocks.length === 0 ? (
              <div className="text-sm text-[var(--ui-muted)]">Drag blocks here to build the quiz.</div>
            ) : (
              blocks.map((b) => (
                <SortableBlock
                  key={b.id}
                  block={b}
                  selected={b.id === selectedId}
                  onSelect={() => onSelect(b.id)}
                />
              ))
            )}
          </div>
        </SortableContext>
      </CanvasDroppable>

      <div className="mt-3 flex items-center gap-2">
        <button
          className="px-3 py-2 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] transition"
          onClick={onDeleteSelected}
          disabled={!selectedId}
        >
          Delete selected
        </button>
      </div>
    </>
  );
}
