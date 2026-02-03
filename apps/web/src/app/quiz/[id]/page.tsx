import Link from 'next/link';
import { QuizzesApi } from '@/lib/api';
import QuizRenderer from '@/components/quiz-renderer/QuizRenderer';

export default async function QuizRenderPage({
                                               params,
                                             }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let quiz: Awaited<ReturnType<typeof QuizzesApi.get>> | null = null;

  try {
    quiz = await QuizzesApi.get(id);
  } catch {
    return (
      <main className="p-6 max-w-5xl mx-auto bg-[var(--ui-bg)] text-[var(--ui-text)]">
        <div className="p-4 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)]">
          <div className="text-lg font-semibold mb-1">Quiz not found</div>
          <div className="text-sm text-[var(--ui-muted)]">
            This quiz doesn’t exist or is not available.
          </div>
          <div className="mt-4">
            <Link
              href="/"
              className="px-4 py-2 rounded border border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] transition"
            >
              Back to list
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!quiz.published) {
    return (
      <main className="p-6 max-w-5xl mx-auto bg-[var(--ui-bg)] text-[var(--ui-text)]">
        <div className="p-4 border border-[var(--ui-border)] rounded bg-[var(--ui-surface)]">
          <div className="text-lg font-semibold mb-1">Not published yet</div>
          <div className="text-sm text-[var(--ui-muted)]">
            This quiz exists but hasn’t been published.
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded border border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] transition"
            >
              Back to list
            </Link>
            <Link
              href={`/quiz/edit/${quiz.id}`}
              className="px-4 py-2 rounded text-white bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-2)] transition"
            >
              Edit
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-5xl mx-auto bg-[var(--ui-bg)] text-[var(--ui-text)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-[var(--ui-muted)]">Published quiz</div>
        <Link
          href="/"
          className="px-4 py-2 rounded border border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] transition"
        >
          Back to list
        </Link>
      </div>

      <QuizRenderer blocks={quiz.blocks?.blocks ?? []} />
    </main>
  );
}
