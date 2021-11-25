import { BlobEntity } from '../../../src/blob/blob.entity';
import { BoardEntity } from '../../../src/board/board.entity';
import { Utils } from '../../../src/utils/utils';

describe('Blob Movement', () => {
  it.each([
    [0, 1, 1, 1, 1, 0],
    [90, 1, 1, 1, 2, 1],
    [180, 1, 1, 1, 1, 2],
    [270, 1, 1, 1, 0, 1],
  ])(
    'blob with direction of (%s) degree and position (%s) x, (%s) y that moves (%s) amount(s) ends on expected position (%s) x, (%s) y',
    (direction, amount, posX, posY, expPosX, expPosY) => {
      const board = new BoardEntity();
      const blob = new BlobEntity(board);
      blob.positionX = posX;
      blob.positionY = posY;
      blob.direction = direction;
      blob.move(amount);
      expect(Utils.roundToTwoDigits(blob.positionX)).toBe(expPosX);
      expect(Utils.roundToTwoDigits(blob.positionY)).toBe(expPosY);
    },
  );
});
