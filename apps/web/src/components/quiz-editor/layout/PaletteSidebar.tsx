'use client';

import React from 'react';
import { PALETTE } from '@/lib/palette';
import PaletteItem from '../PaletteItem';

export default function PaletteSidebar() {
  return (
    <aside className="col-span-2 border-r border-[var(--ui-border)] p-4 bg-[var(--ui-surface-2)]">
      <div className="text-sm font-semibold mb-3 text-[var(--ui-text)]">Building blocks</div>
      <div className="space-y-3">
        {PALETTE.map((p) => (
          <PaletteItem key={p.paletteType} label={p.label} type={p.paletteType} />
        ))}
        <div className="text-xs text-[var(--ui-muted)]">Tip: drag from here into the canvas.</div>
      </div>
    </aside>
  );
}
