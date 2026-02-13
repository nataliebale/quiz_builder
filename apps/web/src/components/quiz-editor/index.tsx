'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { toast } from 'sonner';
import { QuizzesApi } from '@/lib/api';
import { PALETTE } from '@/lib/palette';
import { QuizBlock, QuizContent } from '../../../../../libs/types';
import EditorHeader from './layout/EditorHeader';
import PaletteSidebar from './layout/PaletteSidebar';
import CanvasArea from './layout/CanvasArea';
import PropertiesSidebar from './layout/PropertiesSidebar';
import { QuizEditorProps } from './types';

export default function Index({ initialQuiz }: QuizEditorProps) {
  const router = useRouter();
  const [quizId] = useState<string | null>(initialQuiz?.id ?? null);
  const [title, setTitle] = useState(initialQuiz?.title ?? 'Untitled quiz');
  const [published, setPublished] = useState(initialQuiz?.published ?? false);
  const [blocks, setBlocks] = useState<QuizBlock[]>(initialQuiz?.blocks?.blocks ?? []);
  const [selectedId, setSelectedId] = useState<string | null>(initialQuiz?.blocks?.blocks?.[0]?.id ?? null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedBlock = useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId],
  );

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function upsertBlock(next: QuizBlock) {
    setBlocks((prev) => prev.map((b) => (b.id === next.id ? next : b)));
  }

  function removeSelected() {
    if (!selectedId) return;
    setBlocks((prev) => prev.filter((b) => b.id !== selectedId));
    setSelectedId(null);
    toast.success(
      'Block deleted successfully!'
    );
  }

  async function save(publishAfter: boolean) {
    setSaving(true);
    setError(null);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.error('Title is required');
      setSaving(false);
      return;
    }

    const payload = { title: trimmedTitle, blocks: { blocks } as QuizContent };

    try {
      if (!quizId) {
        const created = await QuizzesApi.create(payload);

        if (publishAfter) {
          const updated = await QuizzesApi.publish(created.id);
          setPublished(updated.published);
          toast.success(updated.published ? 'Quiz published' : 'Quiz unpublished');
        } else {
          toast.success('Quiz created');
        }
      } else {
        await QuizzesApi.update(quizId, payload);

        if (publishAfter) {
          const updated = await QuizzesApi.publish(quizId);
          setPublished(updated.published);
          toast.success(updated.published ? 'Quiz published' : 'Quiz unpublished');
        } else {
          toast.success('Quiz saved');
        }
      }
      router.push('/');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to save';
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  function handleDragStart(_e: DragStartEvent) {}

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith('palette:')) {
      const type = activeId.replace('palette:', '') as QuizBlock['type'];
      const palette = PALETTE.find((p) => p.paletteType === type);
      if (!palette) return;

      const newBlock = palette.make();

      setBlocks((prev) => {
        if (overId === 'canvas') return [...prev, newBlock];

        const overIndex = prev.findIndex((b) => b.id === overId);
        if (overIndex >= 0) {
          const next = [...prev];
          next.splice(overIndex, 0, newBlock);
          return next;
        }

        return [...prev, newBlock];
      });

      setSelectedId(newBlock.id);
      return;
    }

    const oldIndex = blocks.findIndex((b) => b.id === activeId);
    const newIndex = blocks.findIndex((b) => b.id === overId);
    if (oldIndex >= 0 && newIndex >= 0 && oldIndex !== newIndex) {
      setBlocks((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  }

  return (
    <div className="h-[100vh] flex flex-col">
      <EditorHeader
        title={title}
        onTitleChange={setTitle}
        saving={saving}
        published={published}
        onSave={() => save(false)}
        onPublishToggle={() => save(true)}
        rightSlot={
          <Link
            href="/"
            className="px-4 py-2 rounded border border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-2)] transition"
          >
            Back to list
          </Link>
        }
      />

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex-1 grid grid-cols-12">
          <PaletteSidebar />

          <section className="col-span-7 p-4 bg-[var(--ui-bg)]">
            <CanvasArea
              blocks={blocks}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDeleteSelected={removeSelected}
            ></CanvasArea>
          </section>

          <PropertiesSidebar block={selectedBlock} onChange={upsertBlock} />
        </div>
      </DndContext>
    </div>
  );
}
