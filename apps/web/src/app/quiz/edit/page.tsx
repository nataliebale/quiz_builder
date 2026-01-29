import QuizEditorClient from '@/components/quiz-editor/QuizEditorClient';

export default function NewQuizPage() {
  return (
    <main className="p-0">
      <QuizEditorClient mode="create" />
    </main>
  );
}
