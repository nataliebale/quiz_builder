'use client';

import React from 'react';
import { QuizBlock } from '@/lib/types';

type QuestionBlock = Extract<QuizBlock, { type: 'QUESTION' }>;
type QuestionKind = QuestionBlock['props']['kind'];

export default function QuestionPropsEditor({block, onChange}: {
  block: QuestionBlock;
  onChange: (next: QuizBlock) => void;
}) {
  const setProps = (nextProps: QuestionBlock['props']) => onChange({ ...block, props: nextProps });

  const onKindChange = (kind: QuestionKind) => {
    if (kind === 'text') {
      setProps({ ...block.props, kind, options: [] });
      return;
    }

    const options = block.props.options.length ? block.props.options : ['Option 1'];
    setProps({ ...block.props, kind, options });
  };

  return (
    <>
      <label className="block text-sm">
        Prompt
        <input
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.prompt}
          onChange={(e) => setProps({ ...block.props, prompt: e.target.value })}
        />
      </label>

      <label className="block text-sm">
        Kind
        <select
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.kind}
          onChange={(e) => onKindChange(e.target.value as QuestionKind)}
        >
          <option value="single">single (radio)</option>
          <option value="multi">multi (checkbox)</option>
          <option value="text">text</option>
        </select>
      </label>

      {block.props.kind !== 'text' && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Options</div>

          {block.props.options.map((opt, idx) => (
            <div key={`${block.id}:${idx}`} className="flex gap-2">
              <input
                className="flex-1 border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
                value={opt}
                onChange={(e) => {
                  const next = [...block.props.options];
                  next[idx] = e.target.value;
                  setProps({ ...block.props, options: next });
                }}
              />
              <button
                type="button"
                className="px-2 py-2 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)]"
                onClick={() => {
                  const next = block.props.options.filter((_, i) => i !== idx);
                  setProps({ ...block.props, options: next });
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            className="px-3 py-2 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)]"
            onClick={() =>
              setProps({
                ...block.props,
                options: [...block.props.options, `Option ${block.props.options.length + 1}`],
              })
            }
          >
            + Add option
          </button>
        </div>
      )}
    </>
  );
}
