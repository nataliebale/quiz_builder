import Link from 'next/link';
import { QuizListItem } from '@/lib/types';

type Props = {
  quizzes: QuizListItem[];
};

function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="px-2 py-1 rounded bg-[var(--ui-surface-2)] text-[var(--ui-primary)] border border-[var(--ui-border)]">
      Published
    </span>
  ) : (
    <span className="px-2 py-1 rounded bg-[var(--ui-surface-2)] text-[var(--ui-muted)] border border-[var(--ui-border)]">
      Not published yet
    </span>
  );
}

function ActionButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1 rounded border border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] text-sm transition"
    >
      {children}
    </Link>
  );
}

export default function QuizListTable({ quizzes }: Props) {
  return (
    <div className="border border-[var(--ui-border)] rounded overflow-hidden bg-[var(--ui-surface)]">
      <div className="grid grid-cols-12 p-3 text-sm font-medium bg-[var(--ui-surface-2)] border-b border-[var(--ui-border)]">
        <div className="col-span-5">Title</div>
        <div className="col-span-3">Updated</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {quizzes.length === 0 ? (
        <div className="p-6 text-sm text-[var(--ui-muted)]">No quizzes yet.</div>
      ) : (
        quizzes.map((q) => (
          <div
            key={q.id}
            className="grid grid-cols-12 p-3 items-center border-t border-[var(--ui-border)] hover:bg-[var(--ui-surface-2)] transition"
          >
            <div className="col-span-5 font-medium">{q.title}</div>

            <div className="col-span-3 text-sm text-[var(--ui-muted)]">
              {new Date(q.updatedAt).toLocaleString()}
            </div>

            <div className="col-span-2 text-xs">
              <StatusBadge published={q.published} />
            </div>

            <div className="col-span-2 flex justify-end gap-2">
              <ActionButton href={`/quiz/edit/${q.id}`}>Edit</ActionButton>
              <ActionButton href={`/quiz/${q.id}`}>View</ActionButton>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
