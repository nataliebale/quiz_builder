'use client';

import type { QuizEditorProps } from './types';
import dynamic from "next/dynamic";

const IndexClient = dynamic(
  () => import('@/components/quiz-editor/index'),
  { ssr: false }
);

export default function QuizEditorClient(props: QuizEditorProps) {
  return <IndexClient {...props} />;
}
