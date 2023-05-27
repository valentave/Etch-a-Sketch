// Referencias al DOM
const gridSizeSlider = document.querySelector("#grid-size-slider");
const gridContainer = document.querySelector("#grid-container");
const paintColor = document.querySelector("#paint-color");
const cells = document.getElementsByClassName("grid-cell");
const btnEraser = document.querySelector("#btn-eraser");
const btnClean = document.querySelector("#btn-clean");
const backgroundColor = document.querySelector("#background-color");
const btnRandom = document.querySelector("#btn-random");
const btnGrid = document.querySelector("#btn-grid");
const btnRainbow = document.querySelector("#btn-rainbow");
const btnBlackGrade = document.querySelector("#btn-black-grade");

// Creación de la cuadrícula
let generateGrid = function() {
  const gridSize = gridSizeSlider.value;
  let isMouseDown = false;
  const background = backgroundColor.value;

  // Eliminar las celdas existentes
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Generar las nuevas celdas de la cuadrícula
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("grid-cell");
    cell.classList.add("grid-cell");
    cell.setAttribute("style", "background: " + background);
    gridContainer.appendChild(cell);

    // Agregar evento de click a la celda
    cell.addEventListener("mousedown", function() {
      isMouseDown = true;
      if (btnRainbow.classList.contains("active")) {
        paintColor.value = getRandomColor();
      } else if (btnBlackGrade.classList.contains("active")) {
        paintColor.value = getBlackGrade(cell);
      }
      this.setAttribute("style","background: " + paintColor.value);
    });

    cell.addEventListener("mouseup", function() {
      isMouseDown = false;
    });

    cell.addEventListener("mouseenter", function() {
      if (isMouseDown) {
        if (btnRainbow.classList.contains("active")) {
          paintColor.value = getRandomColor();
        } else if (btnBlackGrade.classList.contains("active")) {
          paintColor.value = getBlackGrade(cell);
        }
        this.setAttribute("style","background: " + paintColor.value);
      }
    });
  }
}

let erasePaint = function() {
  paintColor.value = backgroundColor.value;
}

let randomizePaint = function() {
  paintColor.value = getRandomColor();
}

let getRandomColor = function() { // genera un color hexadecimal aleatorio
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 16);
    hex += random.toString(16);
  }
  return hex;
}

let getBlackGrade = function(cell) {
  let backgroundColor = cell.style.background;
  let rgbValues = backgroundColor.match(/\d+/g); // Extraer los valores RGB

  // Convertir los valores RGB a valores numéricos
  let red = parseInt(rgbValues[0]);
  let green = parseInt(rgbValues[1]);
  let blue = parseInt(rgbValues[2]);

  // Aplicar la reducción del 10% a cada componente RGB
  let darkenedRed = Math.floor(Math.max(red - (red * 0.1), 0)).toString(16);
  let darkenedGreen = Math.floor(Math.max(green - (green * 0.1), 0)).toString(16);
  let darkenedBlue = Math.floor(Math.max(blue - (blue * 0.1), 0)).toString(16);

  // Convierte a hexadecimal
  let newColor = "#";
  if(darkenedRed.length == 1) newColor += "0" + darkenedRed; else newColor += darkenedRed;
  if(darkenedGreen.length == 1) newColor += "0" + darkenedGreen; else newColor += darkenedGreen;
  if(darkenedBlue.length == 1) newColor += "0" + darkenedBlue; else newColor += darkenedBlue;

  // Construir el nuevo color en formato RGB

  return newColor;
}

// Eventos

paintColor.addEventListener("input", () => {
  btnRainbow.classList.remove("active");
  btnBlackGrade.classList.remove("active");
})

gridSizeSlider.addEventListener("input", generateGrid); // input tamaño cuadrícula

btnEraser.addEventListener("click", () => { // cambia el color al del background
  erasePaint();
  btnRainbow.classList.remove("active");
  btnBlackGrade.classList.remove("active");
});

btnClean.addEventListener("click", () => { // rellena la cuadrícula con el color del
  generateGrid();                               // background
  btnRainbow.classList.remove("active");
  btnBlackGrade.classList.remove("active");
});

btnRandom.addEventListener("click", () => { // cambia el color a uno random
  randomizePaint();
  btnRainbow.classList.remove("active");
  btnBlackGrade.classList.remove("active");
});

btnGrid.addEventListener("click", () => { // activa o desactiva los bordes de la cuadrícula
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains("no-border")) {
      cells[i].classList.remove("no-border");
    } else {
      cells[i].classList.add("no-border");
    }
  }
});

btnRainbow.addEventListener("click", () => { // activa el efecto arcoíris
  btnRainbow.classList.toggle("active");
  btnBlackGrade.classList.remove("active");
});

btnBlackGrade.addEventListener("click", () => { // activa el efecto negro gradual
  btnBlackGrade.classList.toggle("active");
  btnRainbow.classList.remove("active");
});

generateGrid(); // Generar la cuadrícula inicial
