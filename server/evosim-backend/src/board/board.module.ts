import { Module, Global } from '@nestjs/common';
import { BoardService } from './board.service';

@Global()
@Module({
  controllers: [],
  providers: [BoardService],
  exports: [],
})
export class BoardModule {}
