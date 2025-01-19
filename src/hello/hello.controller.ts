import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomPipePipe } from './pipes/custom-pipe/custom-pipe.pipe';
import { CustomguardGuard } from './guards/customguard/customguard.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// * EJEMPLO DE COMO USAR SINTAXIS DE EXPRESS EN NESTJS

@Controller()
// * EJEMPLO DE COMO AGRUPAR RUTAS EN TAGS DE SWAGGER
@ApiTags("Hello")
export class HelloController {

    @Get("/")
    index(@Req() request: Request, @Res() response: Response) {
        console.log(request.url);
        response.status(200).json({ message: "Hello World!" });
    }

    @Get("/error")
    // * EJEMPLO DE COMO USAR CODIGOS DE RESPUESTA
    @HttpCode(404)
    errorPage() {
        return "Error Page"
    }

    @Get("test/:id")
    // ! EJEMPLOs DE COMO USAR PIPES
    // * las pipes son funciones que se ejecutan antes de que se ejecute el metodo 
    getTestNumber(@Param("id", ParseIntPipe) id: string) {
        return id + 12;
    }

    @Get("/status/:id")
    viewStatus(@Param("id", ParseBoolPipe) status: boolean) {
        console.log(typeof status);
        return status
    }

    // * EJEMPLO DE CUSTOM PIPE
    @Get("/customPipe")
    // * EJEMPLO DE COMO USAR GUARD
    @UseGuards(CustomguardGuard)
    customPipe(@Query(CustomPipePipe) query: { name: string, age: number }) {
        return `Hello ${query.name} you are ${query.age + 1} years old`
    }


    // * EJEMPLO DE COMO USAR MIDDLEWARE
    @Get("/middleware")
    // * EJEMPLO DE PONERLE DESCRIPCION A UN METODO EN SWAGGER
    @ApiOperation({ summary: "Middleware Example" })
    
    //* EJEMPLO DE COMO PONERLE UNA RESPUESTA A UN METODO EN SWAGGER
    @ApiResponse({ status: 200, description: "Middleware Example" })
    middlewareExample() {
        return "Middleware Example"
    }

}
