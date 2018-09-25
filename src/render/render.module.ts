import { Module } from '@nestjs/common';
import RenderService from './render.service';

@Module({
  providers: [RenderService],
})
class RenderModule { }

export default RenderModule;
