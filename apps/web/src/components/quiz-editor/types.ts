import { QuizEntity } from '@/lib/types';

export type EditorMode = 'create' | 'edit';

export type QuizEditorProps = {
  mode: EditorMode;
  initialQuiz?: QuizEntity;
};
