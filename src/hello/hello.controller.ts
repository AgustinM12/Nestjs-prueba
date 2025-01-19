import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Query, Req, Res } from '@nestjs/common';
import { query, Request, Response } from 'express';
import { request } from 'http';
import { CustomPipePipe } from './pipes/custom-pipe/custom-pipe.pipe';

// * EJEMPLO DE COMO USAR SINTAXIS DE EXPRESS EN NESTJS

@Controller()
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
    // * EJEMPLO DE COMO USAR PIPES
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
    customPipe(@Query(CustomPipePipe) query: { name: string, age: number }) {
        return `Hello ${query.name} you are ${query.age + 1} years old`
    }

}
