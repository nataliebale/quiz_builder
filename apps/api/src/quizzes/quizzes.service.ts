import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Prisma } from '@prisma/client';
type QuizBlocksPayload = { blocks: Prisma.InputJsonValue[] };

function normalizeTitle(input: string): string {
  const title = input.trim();
  if (!title) throw new BadRequestException('Title is required');
  return title;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function isJsonArray(v: unknown): v is Prisma.InputJsonValue[] {
  return Array.isArray(v);
}

function normalizeBlocks(input: unknown): QuizBlocksPayload {
  if (isRecord(input) && 'blocks' in input) {
    const blocks = input.blocks;
    if (isJsonArray(blocks)) return { blocks };
  }
  return { blocks: [] };
}

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.quiz.findMany({
      select: { id: true, title: true, published: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async get(id: string) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async create(dto: CreateQuizDto) {
    const title = dto.title?.trim();
    if (!title) throw new BadRequestException('Title is required');

    return this.prisma.quiz.create({
      data: {
        title,
        blocks: (dto.blocks ?? { blocks: [] }) as any,
        published: dto.published ?? false,
      },
    });
  }

  async update(id: string, dto: UpdateQuizDto) {
    await this.get(id);

    return this.prisma.quiz.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title.trim() } : {}),
        ...(dto.blocks !== undefined ? { blocks: dto.blocks as any } : {}),
        ...(dto.published !== undefined ? { published: dto.published } : {}),
      },
    });
  }

  async publish(id: string) {
    await this.get(id);

    return this.prisma.quiz.update({
      where: { id },
      data: { published: true },
    });
  }
}
