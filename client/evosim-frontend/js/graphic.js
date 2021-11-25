let mapData = {
  _width: 1,
  _height: 1,
  _map: [[{_energy: 0}]],
  _tilesize: 20,
};
let mapImage;
let mapChanged = false;

let creatureData = [];

const selectedCoordinates = {
  x: null,
  y: null,
};
let selectedCreatureId = "";

let locked = false;
let sf = 1;
let tx = 0;
let ty = 0;

let updateCurrentSelected;
let p5;

let canvas;
let populationColors = [];

const dirtColorRed = 117;
const dirtColorGreen = 66;
const dirtColorBlue = 0;
const grassColorRed = 0;
const grassColorGreen = 255;
const grassColorBlue = 0;

export function main(_p5) {
  p5 = _p5;
  p5.disableFriendlyErrors = true;
  const backgroundColor = p5.color(255, 255, 255);

  p5.setup = () => {
    const canvasDiv = document.getElementById("p5Canvas");
    canvas = p5.createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    canvas.parent("p5Canvas");
    canvas.style('display', 'block');

    p5.noSmooth();
    mapImage = p5.createImage(10, 10);

    sf = canvasDiv.offsetWidth / 400;
    tx = canvasDiv.offsetWidth / 100;
    ty = canvasDiv.offsetHeight / 200;

    p5.scale(sf);
    p5.translate(tx, ty);
    p5.noSmooth();
    p5.image(mapImage, 0, 0);

  };

  p5.draw = () => {
    if (mapChanged) {
      drawMap();
      mapChanged = false;
    }

    p5.background(backgroundColor);
    p5.scale(sf);
    p5.translate(tx, ty);
    p5.image(mapImage, 0, 0);

    drawCreatures();
    drawFPSIndicator();

  };
  p5.mouseClicked = () => {
    if (!locked) {
      const tempX = Math.floor(p5.mouseX / sf - tx);
      const tempY = Math.floor(p5.mouseY / sf - ty);
      const size = 1;
      const tempXMin = tempX / mapData.tilesize - size / 2;
      const tempXMax = tempX / mapData.tilesize + size / 2;
      const tempYMin = tempY / mapData.tilesize - size / 2;
      const tempYMax = tempY / mapData.tilesize + size / 2;
      const select = creatureData.filter(c => c.x >= tempXMin && c.x <= tempXMax && c.y >= tempYMin && c.y <= tempYMax).pop()
      if (select !== undefined) {
        if (select.id === selectedCreatureId) {
          selectedCoordinates.x = 0;
          selectedCoordinates.y = 0;
          selectedCreatureId = "";
        } else {
          selectedCoordinates.x = tempX;
          selectedCoordinates.y = tempY;
          selectedCreatureId = select.id;
        }
        notifyCurrentSelect();
      }
    }
    p5.redraw();
  };

  p5.mousePressed = () => {
    locked = false;
    p5.xOffset = p5.mouseX / sf - tx;
    p5.yOffset = p5.mouseY / sf - ty;
  };

  p5.mouseDragged = () => {
    if (
      p5.mouseX < p5.width &&
      p5.mouseX > 0 &&
      p5.mouseY < p5.height &&
      p5.mouseY > 0
    ) {
      tx = p5.mouseX / sf - p5.xOffset;
      ty = p5.mouseY / sf - p5.yOffset;
      locked = true;
    }
    p5.redraw();
  };

  p5.applyScale = (s) => {
    sf = sf * s;
    p5.redraw();
  };

  window.addEventListener("wheel", function (e) {
    if (
      p5.mouseX < p5.width &&
      p5.mouseX > 0 &&
      p5.mouseY < p5.height &&
      p5.mouseY > 0
    ) {
      p5.applyScale(e.deltaY > 0 ? 1.05 : 0.95);
    }
  });

  p5.keyPressed = () => {
    if (p5.key === "-") {
      p5.applyScale(0.95);
    } else if (p5.key === "+") {
      p5.applyScale(1.05);
    }
  };

  p5.windowResized = () => {
    const canvasDiv = document.getElementById("p5Canvas");
    p5.resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    sf = canvasDiv.offsetWidth / 400;
    tx = canvasDiv.offsetWidth / 100;
    ty = canvasDiv.offsetHeight / 200;
  };
}

function drawMap() {
  p5.noSmooth();
  const s = mapData._tilesize;
  mapImage = p5.createImage(mapData.width * s, mapData.height * s);
  mapImage.loadPixels();

  const mapColumns = mapData.width;
  const mapRows = mapData.height;

  let indexH = 0;
  for (let mapY = 0; mapY < mapRows; mapY++) {
    let indexW = 0;
    for (let mapX = 0; mapX < mapColumns; mapX++) {
      const tile = mapData.map[mapX][mapY];
      let r = dirtColorRed + (tile.energy / 100) * (grassColorRed - dirtColorRed);
      let g = dirtColorGreen + (tile.energy / 100) * (grassColorGreen - dirtColorGreen);
      let b = dirtColorBlue + (tile.energy / 100) * (grassColorBlue - dirtColorBlue);
      let a = 255;
      if (tile.type === "W") {
        r = 35
        g = 74;
        b = 230;
        a = 255;
      }

      for (let x = 0; x < s; x++) {
        for (let y = 0; y < s; y++) {
          const index = 4 * ((indexH + y) * mapImage.width + indexW + x);
          mapImage.pixels[index] = r;
          mapImage.pixels[index + 1] = g;
          mapImage.pixels[index + 2] = b;
          mapImage.pixels[index + 3] = a;
        }
      }
      indexW += s;
    }
    indexH += s;
  }
  p5.noSmooth();
  mapImage.updatePixels();
}

function drawCreatures() {
  for (const creature of creatureData) {
    drawCreature(creature)
  }
}

function drawCreature(creature) {
  const tilesize = mapData.tilesize;
  const cx = creature.x * tilesize;
  const cy = creature.y * tilesize;
  const c = populationColors[creature.population];
  c.setAlpha(creature.energy * 2.55);
  p5.stroke(c);
  p5.strokeWeight(1);
  p5.line(cx, cy, creature.eyeX * tilesize, creature.eyeY * tilesize);
  if (creature.id === selectedCreatureId) {
    p5.fill("#FFFFFF");
  } else {
    p5.fill(c);
    p5.noStroke();
  }
  p5.circle(cx, cy, creature.size);
}

function drawFPSIndicator() {
  p5.fill('#FFFFFF');
  const fps = p5.frameRate();
  p5.text("FPS: " + fps.toFixed(2), 10, 10);
}

function notifyCurrentSelect() {
  if (updateCurrentSelected !== undefined) {
    updateCurrentSelected(selectedCoordinates.x, selectedCoordinates.y, selectedCreatureId);
  }
}

export function clear() {
  p5.remove(canvas);
  p5.clear();
}

export function updateState(map, blobs) {
  mapData = map;
  creatureData = blobs;
  mapChanged = true;
}

export function setUpdateCurrentSelected(_delegate) {
  updateCurrentSelected = _delegate;
}

export function updatePixelMap(dataNew) {
  mapData = dataNew;
  mapChanged = true;
}

export function setPopulationColors(colors) {
  populationColors = [];
  for (const c of colors) {
    populationColors.push(p5.color(c));
  }
}

export function setSelectedCreature(id) {
  selectedCreatureId = id;
}

export function updateCreatures(creatures) {
  creatureData = creatures;
}
