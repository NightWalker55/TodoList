import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { todo } from './schemas/todo.schema';

@Injectable()
export class TodosService {

   constructor(@InjectModel('todo') private readonly todoModel: Model<todo>){}

    async createToDo(title: string, description: string, completed: boolean, isDeleted: boolean, isArchived: boolean):Promise<todo>{
       const create = new this.todoModel({
        title,
        description,
        completed,
        isDeleted,
        isArchived
       })

       const result = await create.save()
       return result;
    } 

    async getAllList(): Promise<todo[]>{
      const lists = await this.todoModel.find().exec();
      return lists.map((list)=>({
         id: list.id,
         title: list.title,
         description: list.description,
         completed: list.completed,
         isDeleted: list.isDeleted,
         isArchived: list.isArchived
      }))
    }

    async getSingleList(id: string):Promise<todo>{
      const listItem = await this.todoModel.findById(id).exec();

      return listItem;
    }

    async updateList(id: string, title: string, description: string,  completed: boolean, isDeleted: boolean, isArchived: boolean):Promise<todo>{
      const updateData = {title,description, completed, isDeleted, isArchived};
      const updatedList = await this.todoModel.findByIdAndUpdate(id, updateData).exec()
      return updatedList;
    }
    
    async permanentDelete(id: string):Promise<todo>{
      const deleteList = await this.todoModel.findByIdAndDelete(id).exec()
      return deleteList;
    }

    async softDelete(id: string):Promise<todo>{
      const deleteList = await this.todoModel.findByIdAndUpdate(id,{isDeleted:true},{new:true}).exec();
      return deleteList;
    }

    async archive(id: string):Promise<todo>{
      const archiveList = await this.todoModel.findByIdAndUpdate(id,{isArchived:true},{new:true}).exec();
      return archiveList;
    }

    async restore(id: string):Promise<todo>{
      const restoreList = await this.todoModel.findByIdAndUpdate(id,{isDeleted:false, isArchived:false},{new:true}).exec()
      return restoreList;
    }


}
