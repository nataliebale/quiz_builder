'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuizBlock } from '@/lib/types';

type Props = {
  block: QuizBlock;
  selected: boolean;
  onSelect: () => void;
};

function BlockPreview({ block }: { block: QuizBlock }) {
  switch (block.type) {
    case 'HEADING':
      return <div className="font-semibold">{block.props.text}</div>;
    case 'QUESTION':
      return <div className="font-medium">{block.props.prompt}</div>;
    case 'BUTTON':
      return (
        <div className="inline-flex px-3 py-1 rounded text-white bg-[var(--ui-primary)] text-sm">
          {block.props.label}
        </div>
      );
    case 'FOOTER':
      return <div className="text-xs text-[var(--ui-muted)]">{block.props.text}</div>;
    default:
      return null;
  }
}

export default function SortableBlock({ block, selected, onSelect }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: selected ? '0 0 0 2px color-mix(in srgb, var(--ui-primary) 40%, transparent)' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-[var(--ui-border)] rounded p-3 bg-[var(--ui-surface)] text-[var(--ui-text)] hover:bg-[var(--ui-surface-2)] transition"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-[var(--ui-muted)]">{block.type}</div>

        <button
          type="button"
          className="text-xs px-2 py-1 border border-[var(--ui-border)] rounded cursor-grab active:cursor-grabbing bg-[var(--ui-surface)]"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          title="Drag"
        >
          Drag
        </button>
      </div>

      <div className="mt-2">
        <BlockPreview block={block} />
      </div>
    </div>
  );
}
