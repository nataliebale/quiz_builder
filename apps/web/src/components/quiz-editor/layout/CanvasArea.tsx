'use client';

import React, { PropsWithChildren, useMemo, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CanvasDroppable from '../CanvasDroppable';
import SortableBlock from '../SortableBlock';
import { QuizBlock } from '../../../../../../libs/types';
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

type Props = PropsWithChildren<{
  blocks: QuizBlock[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onDeleteSelected: () => void;
}>;

export default function CanvasArea({
                                     blocks,
                                     selectedId,
                                     onSelect,
                                     onDeleteSelected,
                                     children,
                                   }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectedBlock = useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId]
  );

  const openConfirm = () => {
    if (!selectedId) return;
    setConfirmOpen(true);
  };

  const closeConfirm = () => setConfirmOpen(false);

  const confirmDelete = () => {
    closeConfirm();
    onDeleteSelected();
  };

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

      {children}

      <div className="mt-3 flex justify-end items-center gap-2">
        <button
          type="button"
          className={[
            'px-3 py-2 border rounded transition',
            selectedId
              ? 'border-[var(--ui-danger)] bg-[var(--ui-danger)] text-[var(--ui-surface)] hover:bg-[var(--ui-danger-2)]'
              : 'border-[var(--ui-border)] bg-[var(--ui-surface)] text-[var(--ui-text)] hover:bg-[var(--ui-surface-2)] disabled:opacity-50',
          ].join(' ')}
          onClick={openConfirm}
          disabled={!selectedId}
        >
          Delete selected
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete block?"
        description={
          selectedBlock ? (
            <>
              You are about to delete <span className="font-medium">{selectedBlock.type}</span>. This action can’t be
              undone.
            </>
          ) : (
            <>This action can’t be undone.</>
          )
        }
        confirmText="Delete"
        cancelText="Cancel"
        onClose={closeConfirm}
        onConfirm={confirmDelete}
      />
    </>
  );
}
