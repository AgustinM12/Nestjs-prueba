import { Controller, Get } from "@nestjs/common";
import { TasksService } from "./tasks.service"

// se pueden colocar prefijos de las url como parametro de Controller, ej /api
@Controller()

export class TaskController {
    //se crea una propiedad del tipo del servicio
    tasksService: TasksService

    // constructor que recibe la clase de los servicios del tipo servicio
    constructor(TaskService: TasksService) { 
        //se inicializa la propiedad del servicio en el constructor
        this.tasksService = TaskService
    }

    @Get("/tasks")
    getAllTasks() {
       return this.tasksService.getTasks()
    }

    @Get("/")
    index() {
        return "Inicio"
    }

}