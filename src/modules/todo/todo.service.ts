import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto) {
    return { message: 'This action adds a new todo' };
  }

  findAll() {
    return { message: `This action returns all todo` };
  }

  findOne(id: number) {
    return { message: `This action returns a #${id} todo` };
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return { message: `This action updates a #${id} todo` };
  }

  remove(id: number) {
    return { message: `This action removes a #${id} todo` };
  }
}
