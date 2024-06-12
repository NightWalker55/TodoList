import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { todoSchema } from './schemas/todo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'todo', schema: todoSchema}])],
  providers: [TodosService],
  controllers: [TodosController]
})
export class TodosModule {}
