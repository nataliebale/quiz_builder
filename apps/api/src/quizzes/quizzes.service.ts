import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Quiz } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

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

  async get(id: string): Promise<Quiz> {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  private async assertExists(id: string) {
    const exists = await this.prisma.quiz.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Quiz not found');
  }

  async create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: normalizeTitle(dto.title),
        blocks: normalizeBlocks(dto.blocks) as Prisma.InputJsonValue,
        published: dto.published ?? false,
      },
    });
  }

  async update(id: string, dto: UpdateQuizDto) {
    await this.assertExists(id);

    const data: Prisma.QuizUpdateInput = {};

    if (dto.title !== undefined) data.title = normalizeTitle(dto.title);
    if (dto.blocks !== undefined) data.blocks = normalizeBlocks(dto.blocks) as Prisma.InputJsonValue;
    if (dto.published !== undefined) data.published = dto.published;

    return this.prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async publish(id: string) {
    await this.assertExists(id);

    return this.prisma.quiz.update({
      where: { id },
      data: { published: true },
    });
  }
}
