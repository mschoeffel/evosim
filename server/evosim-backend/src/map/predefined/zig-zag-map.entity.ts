import { MapEntity } from '../map.entity';
import { MapConfig } from '../map.config';
import { Tile } from '../tile/Tile';
import { TileMapper } from '../mapper/TileMapper';

const w = 10;
const g = 100;

// prettier-ignore
const mapSchema = [
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, g, g, g, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,],
];

export class ZigZagMapEntity extends MapEntity {
  constructor() {
    super(75, 75, MapConfig.MAP_TILESIZE, MapConfig.MAP_REGROW_STRATEGY);
  }

  protected generateMap(): Array<Array<Tile>> {
    return TileMapper.map(mapSchema);
  }
}
