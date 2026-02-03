'use client';

import React from 'react';
import { QuizBlock } from '../../../../../../libs/types';

type QuestionBlock = Extract<QuizBlock, { type: 'QUESTION' }>;
type QuestionKind = QuestionBlock['props']['kind'];

export type BlockEditorProps<T extends QuizBlock = QuizBlock> = {
  block: T;
  onChange: (next: QuizBlock) => void;
};

export default function QuestionPropsEditor({
                                              block,
                                              onChange
                                            }: BlockEditorProps<QuestionBlock>) {
  const setProps = (nextProps: QuestionBlock['props']) => onChange({ ...block, props: nextProps });

  const handleKindChange = (kind: QuestionKind) => {
    if (kind === 'text') {
      setProps({ ...block.props, kind, options: [] });
      return;
    }

    const options = block.props.options.length ? block.props.options : ['Option 1'];
    setProps({ ...block.props, kind, options });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProps({ ...block.props, prompt: e.target.value });
  };

  const handleOptionChange = (idx: number, value: string) => {
    const next = [...block.props.options];
    next[idx] = value;
    setProps({ ...block.props, options: next });
  };

  const handleOptionDelete = (idx: number) => {
    const next = block.props.options.filter((_, i) => i !== idx);
    setProps({ ...block.props, options: next });
  };

  const handleOptionAdd = () => {
    setProps({
      ...block.props,
      options: [...block.props.options, `Option ${block.props.options.length + 1}`],
    });
  };

  return (
    <>
      <label className="block text-sm">
        Prompt
        <input
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.prompt}
          onChange={handlePromptChange}
        />
      </label>

      <label className="block text-sm">
        Kind
        <select
          className="mt-1 w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          value={block.props.kind}
          onChange={(e) => handleKindChange(e.target.value as QuestionKind)}
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
                onChange={(e) => handleOptionChange(idx, e.target.value)}
              />
              <button
                type="button"
                className="px-2 py-2 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)]"
                onClick={() => handleOptionDelete(idx)}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            className="px-3 py-2 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)]"
            onClick={handleOptionAdd}
          >
            + Add option
          </button>
        </div>
      )}
    </>
  );
}
