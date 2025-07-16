let mapData = {
  _width: 1,
  _height: 1,
  _map: [[{ _energy: 0 }]],
  _tilesize: 20,
};
let mapImage;
let mapChanged = false;

let figureData = [];

const selectedCoordinates = {
  x: null,
  y: null,
};
let selectedFigureId = '';

let locked = false;
let sf = 1;
let tx = 0;
let ty = 0;

let updateCurrentSelected;
let p5;

let canvas;
let populationColors = [];
let populationColorStrings = ['#F250A9', '#05AFF2', '#F2E205', '#F26E22', '#990FBF', '#1ABC9C', '#E61919', ];

const dirtColorRed = 70;
const dirtColorGreen = 25;
const dirtColorBlue = 1;
const grassColorRed = 0;
const grassColorGreen = 201;
const grassColorBlue = 81;

export function main(_p5) {
  p5 = _p5 || (typeof window !== 'undefined' ? window.p5 : undefined);
  if (!p5) {
    throw new Error('p5 is not defined. Make sure p5 is loaded globally.');
  }


  p5.setup = () =>
  {
    p5.disableFriendlyErrors = true;

    const canvasDiv = document.getElementById('canvasParent');
    console.log(canvasDiv.offsetWidth);
    canvas = p5.createCanvas(canvasDiv.offsetWidth - 6, canvasDiv.offsetHeight - 6);
    canvas.parent('p5-canvas');
    canvas.style('display', 'block');
    canvas.style('width', (canvasDiv.offsetWidth - 6) + 'px');
    canvas.style('height', (canvasDiv.offsetHeight - 6) + 'px');
    canvas.style('overflow', 'hidden');

    p5.noSmooth();
    mapImage = p5.createImage(10, 10);

    sf = canvasDiv.offsetWidth / 400;
    tx = canvasDiv.offsetWidth / 100;
    ty = canvasDiv.offsetHeight / 200;

    p5.scale(sf);
    p5.translate(tx, ty);
    p5.noSmooth();
    p5.image(mapImage, 0, 0);

    for(let i = 0; i < populationColorStrings.length; i++) {
      populationColors.push(p5.color(populationColorStrings[i]));
    }
  }

  p5.draw = () => {
    p5.noSmooth();
    if (mapChanged) {
      drawMap();
      mapChanged = false;
    }

    p5.noSmooth();
    p5.background(p5.color(255, 255, 255));
    p5.scale(sf);
    p5.translate(tx, ty);
    p5.image(mapImage, 0, 0);

    drawFigures();
    // DEBUG: drawFPSIndicator();
  };
  p5.mouseClicked = () => {
    if (!locked) {
      const tempX = Math.floor(p5.mouseX / sf - tx);
      const tempY = Math.floor(p5.mouseY / sf - ty);
      const size = 1;
      const tempXMin = tempX / mapData._tilesize - size / 2;
      const tempXMax = tempX / mapData._tilesize + size / 2;
      const tempYMin = tempY / mapData._tilesize - size / 2;
      const tempYMax = tempY / mapData._tilesize + size / 2;
      const select = figureData
        .filter(
          (c) =>
            c.x >= tempXMin &&
            c.x <= tempXMax &&
            c.y >= tempYMin &&
            c.y <= tempYMax,
        )
        .pop();
      if (select !== undefined) {
        if (select.id === selectedFigureId) {
          selectedCoordinates.x = 0;
          selectedCoordinates.y = 0;
          selectedFigureId = '';
        } else {
          selectedCoordinates.x = tempX;
          selectedCoordinates.y = tempY;
          selectedFigureId = select.id;
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

  window.addEventListener('wheel', function(e) {
    // Check if the mouse is inside the canvas boundaries
    if (
      p5.mouseX < p5.width &&
      p5.mouseX > 0 &&
      p5.mouseY < p5.height &&
      p5.mouseY > 0
    ) {
      // Prevent the default browser action (e.g., scrolling the page)
      e.preventDefault();

      const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;

      // Store the scale factor before zooming
      const old_sf = sf;
      // Apply the new scale factor
      sf *= zoomFactor;

      // Adjust the translation to keep the point under the mouse stationary
      tx += mouseX * (1 / sf - 1 / old_sf);
      ty += mouseY * (1 / sf - 1 / old_sf);

      p5.redraw();
    }
  }, { passive: false }); // Use { passive: false } to enable preventDefault()

  p5.keyPressed = () => {
    let zoomFactor;
    if (p5.key === '-') {
      zoomFactor = 0.95;
    } else if (p5.key === '+') {
      zoomFactor = 1.05;
    } else {
      return; // Exit if another key is pressed
    }

    // When using keys, zoom towards the center of the canvas
    const zoomX = p5.width / 2;
    const zoomY = p5.height / 2;

    const old_sf = sf;
    sf *= zoomFactor;

    // Adjust translation to zoom at the canvas center
    tx += zoomX * (1 / sf - 1 / old_sf);
    ty += zoomY * (1 / sf - 1 / old_sf);

    p5.redraw();
  };

  p5.windowResized = () => {
    const canvasDiv = document.getElementById('canvasParent');
    p5.resizeCanvas(canvasDiv.offsetWidth - 4, canvasDiv.offsetHeight -4);
    sf = canvasDiv.offsetWidth / 400;
    tx = canvasDiv.offsetWidth / 100;
    ty = canvasDiv.offsetHeight / 200;
  };


}


function drawMap() {
  p5.noSmooth();
  const s = mapData._tilesize;
  mapImage = p5.createImage(mapData._width * s, mapData._height * s);
  mapImage.loadPixels();

  const mapColumns = mapData._width;
  const mapRows = mapData._height;

  let indexH = 0;
  for (let mapY = 0; mapY < mapRows; mapY++) {
    let indexW = 0;
    for (let mapX = 0; mapX < mapColumns; mapX++) {
      const tileEnergy = mapData._map[mapY][mapX];
      let r =
        dirtColorRed + (tileEnergy / 100) * (grassColorRed - dirtColorRed);
      let g =
        dirtColorGreen +
        (tileEnergy / 100) * (grassColorGreen - dirtColorGreen);
      let b =
        dirtColorBlue + (tileEnergy / 100) * (grassColorBlue - dirtColorBlue);
      let a = 255;
      if (tileEnergy < 0) {
        r = 0;
        g = 105;
        b = 168;
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

function drawFigures() {

  for (const figure of figureData) {
    drawFigure(figure);
  }
}

function drawFigure(figure) {
  const tilesize = mapData._tilesize;
  const cx = figure.x * tilesize;
  const cy = figure.y * tilesize;
  const c = populationColors[figure.population];
  c.setAlpha(figure.energy * 2.55);
  p5.stroke(c);
  p5.strokeWeight(1);
  p5.line(cx, cy, figure.eyeX * tilesize, figure.eyeY * tilesize);
  if (figure.id === selectedFigureId) {
    p5.fill('#FFFFFF');
  } else {
    p5.fill(c);
    p5.noStroke();
  }
  p5.circle(cx, cy, figure.size);
}

/* DEBUG:
function drawFPSIndicator() {
  p5.fill('#FFFFFF');
  const fps = p5.frameRate();
  p5.text("FPS: " + fps.toFixed(2), 10, 10);
}
*/

function notifyCurrentSelect() {
  if (updateCurrentSelected !== undefined) {
    updateCurrentSelected(
      selectedCoordinates.x,
      selectedCoordinates.y,
      selectedFigureId,
    );
  }
}

export function clear() {
  p5.remove(canvas);
  p5.clear();
}

export function updateState(map, figures) {
  mapData = map;
  figureData = figures;
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

export function setSelectedFigure(id) {
  selectedFigureId = id;
}

export function updateFigures(figures) {
  figureData = figures;
}
