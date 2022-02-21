import { MapEntity } from '../map.entity';
import { MapConfig } from '../map.config';
import { TileEntity } from '../tile/tile.entity';
import { TileMapper } from '../mapper/tile.mapper';

const w = 10;
const g = 100;

// prettier-ignore
const mapSchema = [
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
];

export class GridMapEntity extends MapEntity {
  constructor() {
    super(75, 75, MapConfig.MAP_TILESIZE, MapConfig.MAP_REGROW_STRATEGY);
  }

  protected generateMap(): Array<Array<TileEntity>> {
    return TileMapper.map(mapSchema);
  }
}
