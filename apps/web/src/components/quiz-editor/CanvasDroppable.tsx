'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function CanvasDroppable({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[400px] rounded p-4 border border-[var(--ui-border)]"
      style={{
        background: isOver ? 'color-mix(in srgb, var(--ui-primary) 10%, var(--ui-surface-2))' : 'var(--ui-surface-2)',
      }}
    >
      {children}
    </div>
  );
}
