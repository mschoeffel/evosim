import { Injectable, Logger } from '@nestjs/common';
import { BoardEntity } from '../board/board.entity';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { BlobDto } from '../blob/blob.dto';

@Injectable()
export class SnapshotService {
  private readonly logger = new Logger(SnapshotService.name);
  private readonly SNAPSHOT_DIR = join(process.cwd(), 'snapshots');

  constructor() {
    if (!existsSync(this.SNAPSHOT_DIR)) {
      mkdirSync(this.SNAPSHOT_DIR, { recursive: true });
      this.logger.log(
        'Snapshot directory didnt exists -> Directory was created',
      );
    }
  }

  writeSnapshot(board: BoardEntity, run: number): void {
    const file = join(
      this.SNAPSHOT_DIR,
      `${run}-${board.gamestate.currentTick}.json`,
    );
    writeFile(
      file,
      JSON.stringify({
        map: board.map.toDto(),
        blobs: board.blobs().map<BlobDto>((b) => b.toDto()),
        gamestate: board.gamestate.toDto(),
      }),
    )
      .then(() =>
        this.logger.log(
          `Snapshot '${file}' created at Tick: ${board.gamestate.currentTick}`,
        ),
      )
      .catch((e) => this.logger.error(`Error creating snapshot ${e}`));
  }
}
