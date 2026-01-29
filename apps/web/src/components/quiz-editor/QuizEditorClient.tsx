'use client';

import dynamic from 'next/dynamic';

const QuizEditor = dynamic(() => import('./QuizEditor'), {
  ssr: false,
});

export default QuizEditor;
