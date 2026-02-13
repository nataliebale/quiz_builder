'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmDialog({
                                        open,
                                        title,
                                        description,
                                        confirmText = 'Confirm',
                                        cancelText = 'Cancel',
                                        onConfirm,
                                        onClose,
                                      }: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[var(--ui-muted)]/50 backdrop-blur-xxs" />

      <div className="relative w-full max-w-md mx-4 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-surface)] text-[var(--ui-text)] shadow-2xl">
        <div className="p-5 border-b border-[var(--ui-border)]">
          <div id="confirm-title" className="font-semibold text-base">
            {title}
          </div>
          {description && (
            <div className="mt-2 text-sm text-[var(--ui-muted)]">
              {description}
            </div>
          )}
        </div>

        <div className="p-5 flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded border border-[var(--ui-border)] hover:cursor-pointer bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] transition"
            onClick={onClose}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={'px-4 py-2 rounded bg-[var(--ui-danger)] text-[var(--ui-surface)] hover:cursor-pointer hover:opacity-90 transition'}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
