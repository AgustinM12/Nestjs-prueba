import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/Task.dto';

@Injectable()
export class TasksService {

    private tasks = []

    getAllTasks() {
        return this.tasks;
    }

    getTask(id: string) {
        const tarea = this.tasks.find(task => task.id === Number(id))

        if (!tarea) {
            return new NotFoundException(`Task with id ${id} not found`)
        }

        return tarea

    }

    createTasks(task: CreateTaskDTO) {
        console.log(task);
        this.tasks.push({ ...task, id: this.tasks.length + 1 })
        return task
    }

    updateTasks(task: UpdateTaskDTO) {
        return "updating a task"
    }

    deleteTasks() {
        return "deleting a task"
    }

}
