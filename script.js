// Referencias al DOM

const gridSizeSlider = document.querySelector("#grid-size-slider");
const gridContainer = document.querySelector("#grid-container");
const paintColor = document.querySelector("#paint-color");
const cells = document.querySelectorAll(".grid-cell");

// Creación de la cuadrícula
let generateGrid = function() {
    const gridSize = gridSizeSlider.value;
    let isMouseDown = false;
  
    // Eliminar las celdas existentes
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  
    // Generar las nuevas celdas de la cuadrícula
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      gridContainer.appendChild(cell);
      
        // Agregar evento de click a la celda
        cell.addEventListener('mousedown', function() {
            isMouseDown = true;
            this.setAttribute("style","background: " + paintColor.value);
          });
      
          cell.addEventListener('mouseup', function() {
            isMouseDown = false;
          });
      
          cell.addEventListener('mousemove', function() {
            if (isMouseDown) {
                this.setAttribute("style","background: " + paintColor.value);
            }
          });
    }
  }
  
let paintCell = function(cell) {
    cell.style.background = "black";
}

// Eventos

gridSizeSlider.addEventListener("input", generateGrid); // input tamaño cuadrícula
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        //paintCell(cell);
    })
})


