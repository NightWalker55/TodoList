import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { todoSchema } from './schemas/todo.schema';



@Controller('todos')
export class TodosController {
    constructor(private readonly todoService:TodosService){}

    @Post()
    async createTodo(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('completed') completed: boolean,
        @Body('isDeleted') isDeleted: boolean,
        @Body('isArchived') isArchived: boolean
    ){
        const createList = await this.todoService.createToDo(
            title,
            description,
            completed,
            isDeleted,
            isArchived
        )

        return createList;
    }

    @Get()
    async getList(){
        const lists = await this.todoService.getAllList()
        return lists
    }

    @Get(':id')
    async getSingleList(@Param('id') id: string){
        const list = await this.todoService.getSingleList(id);
        return list;
    }

    @Patch(':id')
    async updataList(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('completed') completed: boolean,
        @Body('isDeleted') isDeleted: boolean,
        @Body('isArchived') isArchived: boolean

    ){
        const updatedList = await this.todoService.updateList(id,title,description,completed,isDeleted,isArchived)
        return updatedList;
    }

    @Delete(':id')
    async permanentDelete(@Param('id') id: string){
        return this.todoService.permanentDelete(id);
    }

    @Patch(':id/soft-delete')
    async softDelete(@Param('id') id: string){
        const softDeleteList = await this.todoService.softDelete(id);
        return softDeleteList;
    }

    @Patch(':id/archive')
    async archive(@Param('id') id: string){
        const archiveList = await this.todoService.archive(id);
        return archiveList;
    }

    @Patch(':id/restore')
    async restore(@Param('id') id: string){
        const restoreList = await this.todoService.restore(id);
        return restoreList;
    }


}
