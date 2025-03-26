import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { Example2Middleware } from './middlewares/example2/example2.middleware';



@Module({
  controllers: [HelloController]
})

// * EJEMPLO DE COMO USAR MIDDLEWARE PARA TODO UN MODULO
export class HelloModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    // ! Esto para todas las rutas
    // consumer.apply(ExampleMiddleware).forRoutes(HelloController);

    // ! Esto para una ruta especifica
    // consumer.apply(Example2Middleware).forRoutes({
    //   path: "/middleware", method: RequestMethod.GET
    // });


    // * UTILIZAR MAS DE UN MIDDLWARE
    // consumer.apply(ExampleMiddleware).forRoutes({
    //   path: "/middleware", method: RequestMethod.GET
    // });

    //* APLICAR 2 MIDDLEWARES A UNA RUTA DE FORMA MAS SIMPLE
    consumer
      .apply(ExampleMiddleware, Example2Middleware)
      .forRoutes({ path: '/middleware', method: RequestMethod.GET });

  }
}
