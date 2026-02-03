'use client';

import React from 'react';

type Props = {
  title: string;
  onTitleChange: (v: string) => void;
  saving: boolean;
  published: boolean;
  onSave: () => void;
  onPublishToggle: () => void;
  rightSlot?: React.ReactNode;
};

export default function EditorHeader({
                                       title,
                                       onTitleChange,
                                       saving,
                                       published,
                                       onSave,
                                       onPublishToggle,
                                       rightSlot,
                                     }: Props) {
  return (
    <div className="p-4 flex items-center gap-3 border-b border-[var(--ui-border)] bg-[var(--ui-bg)]">
      <input
        className="flex-1 rounded px-3 py-2 border border-[var(--ui-border)] bg-[var(--ui-surface)] text-[var(--ui-text)]"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      {rightSlot}

      <button
        className="px-4 py-2 rounded border border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] transition"
        onClick={onSave}
        disabled={saving}
      >
        {saving ? 'Saving…' : 'Save'}
      </button>

      <button
        className="px-4 py-2 rounded text-white bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-2)] transition"
        onClick={onPublishToggle}
        disabled={saving}
        title={published ? 'Unpublish quiz' : 'Publish quiz'}
      >
        {published ? 'Unpublish' : 'Publish'}
      </button>
    </div>
  );
}
