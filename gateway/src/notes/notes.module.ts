import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [NatsModule]
})
export class NotesModule {}
