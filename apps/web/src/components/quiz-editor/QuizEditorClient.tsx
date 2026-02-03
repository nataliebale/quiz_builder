'use client';

import type { QuizEditorProps } from './types';
import Index from "@/components/quiz-editor/index";

export default function QuizEditorClient(props: QuizEditorProps) {
  return <Index {...props} />;
}
