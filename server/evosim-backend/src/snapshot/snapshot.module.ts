import { Global, Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';

@Global()
@Module({
  imports: [],
  providers: [SnapshotService],
  exports: [SnapshotService],
})
export class SnapshotModule {}
