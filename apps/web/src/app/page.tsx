import Link from 'next/link';
import { QuizzesApi } from '@/lib/api';
import QuizListTable from '@/components/quiz-list/QuizListTable';

export default async function HomePage() {
  const quizzes = await QuizzesApi.list().catch(() => []);

  return (
    <main className="p-6 max-w-5xl mx-auto bg-[var(--ui-bg)] text-[var(--ui-text)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          Quizzes
        </h1>

        <Link
          href="/quiz/edit"
          className="px-4 py-2 rounded text-white bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-2)] transition"
        >
          Create Quiz
        </Link>
      </div>

      <QuizListTable quizzes={quizzes} />
    </main>
  );
}
