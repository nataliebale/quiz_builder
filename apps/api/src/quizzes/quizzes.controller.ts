import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzes: QuizzesService) {}

  @Get()
  list() {
    return this.quizzes.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.quizzes.get(id);
  }

  @Post()
  create(@Body() dto: CreateQuizDto) {
    return this.quizzes.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuizDto) {
    return this.quizzes.update(id, dto);
  }

  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.quizzes.publish(id);
  }
}
