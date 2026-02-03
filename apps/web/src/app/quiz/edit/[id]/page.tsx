import QuizEditorClient from '@/components/quiz-editor/QuizEditorClient';
import { QuizzesApi } from '@/lib/api';

export default async function EditQuizPage({
                                             params
                                           }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await QuizzesApi.get(id);

  return <QuizEditorClient mode="edit" initialQuiz={quiz} />;
}
