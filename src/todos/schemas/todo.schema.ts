import * as mongoose from 'mongoose'

export const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, default: false },
    isDeleted: {type: Boolean, default: false},
    isArchived: {type: Boolean, default: false}

})

export interface todo{
        id: string,
        title: string,
        description: string,
        completed: boolean,
        isDeleted: boolean,
        isArchived: boolean
}