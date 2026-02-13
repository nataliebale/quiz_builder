'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuizBlock } from '../../../../../libs/types';
import { GripVertical } from 'lucide-react';

type Props = {
  block: QuizBlock;
  selected: boolean;
  onSelect: () => void;
};

type QuestionBlock = Extract<QuizBlock, { type: 'QUESTION' }>;

function QuestionPreview({ block }: { block: QuestionBlock }) {
  const prompt = block.props.prompt ?? 'Question';
  const kind = block.props.kind;
  const options = (block.props.options ?? []).map((o: any) =>
    typeof o === 'string' ? { id: o, label: o } : { id: o.id ?? o.value ?? o.label, label: o.label ?? o.value ?? String(o) }
  );

  return (
    <div className="space-y-2">
      <div className="font-medium">{prompt}</div>

      {kind === 'single' && (
        <div className="space-y-2">
          {(options.length ? options : [{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]).map((o) => (
            <label key={o.id} className="flex items-center gap-2 text-sm text-[var(--ui-text)]">
              <input type="radio" disabled aria-disabled="true" />
              <span className="text-[var(--ui-muted)]">{o.label}</span>
            </label>
          ))}
        </div>
      )}

      {kind === 'multi' && (
        <div className="space-y-2">
          {(options.length ? options : [{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]).map((o) => (
            <label key={o.id} className="flex items-center gap-2 text-sm text-[var(--ui-text)]">
              <input type="checkbox" disabled aria-disabled="true" />
              <span className="text-[var(--ui-muted)]">{o.label}</span>
            </label>
          ))}
        </div>
      )}

      {kind === 'text' && (
        <input
          className="w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)] text-sm"
          value={block.props.placeholder ?? ''}
          placeholder={block.props.placeholder ?? 'Answer…'}
          readOnly
          disabled
        />
      )}
    </div>
  );
}

function assertNever(value: never): never {
  throw new Error(`Unhandled block type: ${JSON.stringify(value)}`);
}

function HeadingPreview({ block }: { block: Extract<QuizBlock, { type: 'HEADING' }> }) {
  const level = block.props.level;

  const className =
    level === 1 ? 'text-3xl font-semibold' :
      level === 2 ? 'text-2xl font-semibold' :
        'text-xl font-semibold';

  if (level === 1) return <h1 className={className}>{block.props.text}</h1>;
  if (level === 2) return <h2 className={className}>{block.props.text}</h2>;
  return <h3 className={className}>{block.props.text}</h3>;
}

function BlockPreview({ block }: { block: QuizBlock }) {
  switch (block.type) {
    case 'HEADING':
      return <HeadingPreview block={block} />;
    case 'QUESTION':
      return <QuestionPreview block={block} />;
    case 'BUTTON':
      return (
        <div className="inline-flex px-3 py-1 rounded text-white bg-[var(--ui-primary)] text-sm">
          {block.props.label}
        </div>
      );
    case 'FOOTER':
      return <div className="text-xs text-[var(--ui-muted)]">{block.props.text}</div>;
    default:
      return assertNever(block);
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
    backgroundColor: selected ? 'color-mix(in srgb, var(--ui-primary) 10%, transparent)' : undefined,
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
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2">
        <BlockPreview block={block} />
      </div>
    </div>
  );
}
