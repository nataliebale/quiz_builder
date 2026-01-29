'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { QuizBlock } from '@/lib/types';

export default function PaletteItem({label, type}: {
  label: string;
  type: QuizBlock['type'];
}) {
  const id = `palette:${type}`;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 rounded border border-[var(--ui-border)] bg-[var(--ui-surface)] text-[var(--ui-text)] cursor-grab active:cursor-grabbing hover:bg-[var(--ui-surface-2)] transition"
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}
