import { QuizEntity, QuizListItem, QuizContent } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type CreateQuizPayload = {
  title: string;
  blocks: QuizContent;
};

type UpdateQuizPayload = {
  title: string;
  blocks: QuizContent;
  published?: boolean;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status} ${res.statusText} for ${url}\n${text}`);
  }

  return res.json() as Promise<T>;
}

export const QuizzesApi = {
  list() {
    return apiFetch<QuizListItem[]>('/quizzes');
  },

  get(id: string) {
    return apiFetch<QuizEntity>(`/quizzes/${id}`);
  },

  create(payload: CreateQuizPayload) {
    return apiFetch<QuizEntity>('/quizzes', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateQuizPayload) {
    return apiFetch<QuizEntity>(`/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  publish(id: string) {
    return apiFetch<QuizEntity>(`/quizzes/${id}/publish`, {
      method: 'POST',
    });
  },
};
