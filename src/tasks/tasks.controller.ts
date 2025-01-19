import { Controller, Get, Post, Put, Delete, Body, Query, Param, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service"
import { CreateTaskDTO, UpdateTaskDTO } from "./dto/Task.dto";

// se pueden colocar prefijos de las url como parametro de Controller, ej /api
// @Controller()

// ! FORMA LARGA
// export class TaskController {
//     //se crea una propiedad del tipo del servicio
//     tasksService: TasksService

//     // constructor que recibe la clase de los servicios del tipo servicio
//     constructor(TaskService: TasksService) {
//         //se inicializa la propiedad del servicio en el constructor
//         this.tasksService = TaskService
//     }

//     @Get("/tasks")
//     getAllTasks() {
//         return this.tasksService.getTasks()
//     }

//     @Get("/")
//     index() {
//         return "Inicio"
//     }

// }

@Controller("/tasks")
export class TaskController {
    constructor(private tasksService: TasksService) { }

    // @Get()
    // getAllTasks() {
    //     return this.tasksService.getAllTasks()
    // }

    // * EJEMPLO DE RECIBIR POR QUERY
    @Get()
    getTasks(@Query() query: any) {
        console.log(query);
        return this.tasksService.getAllTasks()
    }


    // * EJEMPLO DE RECIBIR POR PARAMS
    @Get("/:id")
    getTask(@Param("id") id: string) {
        console.log(id);
        return this.tasksService.getTask(id);
    }

    // * EJEMPLO DE RECIBIR POR BODY
    // * EJEMPLO DE APLICACION DE LOS DTO
    @Post()
    @UsePipes(new ValidationPipe())
    createTasks(@Body() task: CreateTaskDTO) {
        return this.tasksService.createTasks(task)
    }

    @Put()
    updateTasks(@Body() task: UpdateTaskDTO) {
        return this.tasksService.updateTasks(task)
    }

    @Delete()
    deleteTasks() {
        return this.tasksService.deleteTasks()
    }
} 