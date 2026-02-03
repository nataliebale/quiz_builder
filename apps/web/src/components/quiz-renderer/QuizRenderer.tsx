import { QuizBlock } from '../../../../../libs/types';

type Props = {
  blocks: QuizBlock[];
};

function Heading({ level, text }: { level: 1 | 2 | 3; text: string }) {
  const Tag = (['h1', 'h2', 'h3'] as const)[level - 1];
  return <Tag className="font-semibold text-xl">{text}</Tag>;
}

function QuestionBlock({ block }: { block: Extract<QuizBlock, { type: 'QUESTION' }> }) {
  return (
    <div className="p-4 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)]">
      <div className="font-medium mb-2">{block.props.prompt}</div>

      {block.props.kind === 'text' ? (
        <input
          className="w-full border border-[var(--ui-border)] rounded px-3 py-2 bg-[var(--ui-surface)]"
          placeholder="Your answer..."
        />
      ) : (
        <div className="space-y-2">
          {block.props.options.map((opt, idx) => (
            <label key={`${block.id}:${idx}`} className="flex items-center gap-2 text-sm">
              <input type={block.props.kind === 'multi' ? 'checkbox' : 'radio'} name={block.id} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function ButtonBlock({ block }: { block: Extract<QuizBlock, { type: 'BUTTON' }> }) {
  return (
    <button
      type="button"
      className="px-4 py-2 rounded text-white bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-2)] transition"
    >
      {block.props.variant === 'submit' ? 'Submit' : 'Next'}
    </button>
  );
}

function FooterBlock({ block }: { block: Extract<QuizBlock, { type: 'FOOTER' }> }) {
  return (
    <div className="text-xs text-[var(--ui-muted)] pt-6 border-t border-[var(--ui-border)]">
      {block.props.text}
    </div>
  );
}

export default function QuizRenderer({ blocks }: Props) {
  return (
    <div className="space-y-4">
      {blocks.map((block) => {
        switch (block.type) {
          case 'HEADING':
            return <Heading key={block.id} level={block.props.level} text={block.props.text} />;
          case 'QUESTION':
            return <QuestionBlock key={block.id} block={block} />;
          case 'BUTTON':
            return <ButtonBlock key={block.id} block={block} />;
          case 'FOOTER':
            return <FooterBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
