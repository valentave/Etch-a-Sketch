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
            this.setAttribute("style","background: " + paintColor.value);
          });
      
          cell.addEventListener("mouseup", function() {
            isMouseDown = false;
          });
      
          cell.addEventListener("mousemove", function() {
            if (isMouseDown) {
                this.setAttribute("style","background: " + paintColor.value);
            }
          });
    }
  }

let erasePaint = function(){
    paintColor.value = backgroundColor.value;
}

let randomizePaint = function(){
    let hex = "#";
    for (let i = 0; i < 6; i++){
        let random = Math.floor(Math.random() * 16);
        hex += random.toString(16);
    }
    paintColor.value = hex;
}

// Eventos

gridSizeSlider.addEventListener("input", generateGrid); // input tamaño cuadrícula
btnEraser.addEventListener("click",erasePaint); // cambia el color de la pintura a blanco
btnClean.addEventListener("click",generateGrid); // pinta toda la grilla del color de fondo
btnRandom.addEventListener("click",randomizePaint); // cambia el color del pincel por uno random
btnGrid.addEventListener("click", () => {
    for (let i = 0; i < cells.length; i++){
        if (cells[i].classList.contains("no-border")){
            cells[i].classList.remove("no-border");
        } else {
            cells[i].classList.add("no-border");
        }
    }
})