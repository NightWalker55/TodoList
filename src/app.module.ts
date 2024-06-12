import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [TodosModule,MongooseModule.forRoot('mongodb+srv://iktidar55:aezakmi55@cluster0.curknea.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
