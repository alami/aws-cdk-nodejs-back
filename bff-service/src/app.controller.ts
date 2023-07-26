import { All, Controller, Param, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All(['/:service', '/:service/*'])
  async processRequest(
    @Req() request: Request,
    @Res() response: Response,
    @Param('service') service: string,
  ) {
    const result = await this.appService.getResponse(service, request);

    return response.set(result.headers).status(result.status).send(result.data);
  }
}
