import { IsString, MinLength } from "class-validator";

// EJEMPLO DE DTO EN FORMA DE CLASE CON VALIDACIONES
export class CreateTaskDTO {
    @IsString()
    @MinLength(4)
    title: string;

    @IsString()
    description: string;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
}