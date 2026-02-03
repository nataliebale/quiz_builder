import { QuizEntity } from '../../../../../libs/types';

export type EditorMode = 'create' | 'edit';

export type QuizEditorProps = {
  mode: EditorMode;
  initialQuiz?: QuizEntity;
};
