import {Controller, Get} from '@nestjs/common'
import {AppService} from './app.service'
import {words} from 'assets/words'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
}
