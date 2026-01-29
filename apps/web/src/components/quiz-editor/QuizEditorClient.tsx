'use client';

import dynamic from 'next/dynamic';
import type { QuizEditorProps } from './types';

const QuizEditor = dynamic(() => import('./QuizEditor'), { ssr: false });

export default function QuizEditorClient(props: QuizEditorProps) {
  return <QuizEditor {...props} />;
}
