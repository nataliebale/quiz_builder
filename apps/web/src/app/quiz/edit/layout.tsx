import { PropsWithChildren } from 'react';

export default function QuizEditLayout({ children }: PropsWithChildren) {
  return (
    <main className="p-0">
      {children}
    </main>
  );
}
