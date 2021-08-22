
const RAINBOW_MODE = "rainbowMode";
const RGB_MODE = "RgbMode";
const DEFAULT_MODE = "defaultBlackMode";
const ERASE_MODE = "eraseMode";

const DIV_CELL_ID_NAME = "divCell";
const DIV_CELL_CLASS_NAME = "grid-item";
const GRID_ROWS = '--grid-rows';
const GRID_COLS = '--grid-cols';

const CELL_COLOR_BLACK = "#000000";
const CELL_COLOR_WHITE = "#ffffff";

const HTML_COLOR_MODE_BLACK = "black";
const HTML_COLOR_MODE_RGB = "colorRGB";
const HTML_COLOR_MODE_RAINBOW = "rainbow";
const HTML_COLOR_MODE_ERASER = "eraser";

const sketchContainer = document.getElementById("sketchContainer");
let color = DEFAULT_MODE;
const featureButton = document.querySelectorAll(".featureButton");
const resetButton = document.getElementById("reset");

let gridPixel;


let randomizedColor;
let currentlyActive = false;

makeCells(16, 16);

function colorMode(event) {
    switch (event.target.dataset.color) {
        case HTML_COLOR_MODE_BLACK:
            color = DEFAULT_MODE;
            break;

        case HTML_COLOR_MODE_RAINBOW:
            color = RAINBOW_MODE;
            break;

        case HTML_COLOR_MODE_ERASER:
            color = ERASE_MODE;
            break;

        case HTML_COLOR_MODE_RGB:
            color = RGB_MODE;
            break;


    }
}





function makeCells(rows, cols) {
    let cell;
    sketchContainer.style.setProperty(GRID_ROWS, rows);
    sketchContainer.style.setProperty(GRID_COLS, cols);



    let widthOftheCell = 40 / rows + "rem";
    let heightOftheCell = 40 / cols + "rem";

    for (c = 0; c < rows * cols; c++) {
        cell = document.createElement("div");


        cell.style.setProperty("width", widthOftheCell);
        cell.style.setProperty("height", heightOftheCell);

        cell.id = DIV_CELL_ID_NAME;

        sketchContainer.appendChild(cell).className = DIV_CELL_CLASS_NAME;


    }

    onLoad();

}

function rgbRandomizer() {
    let randomColor = Math.floor(Math.random() * 255)
    return randomColor;
}


function changeCellColor() {
 if(currentlyActive){
    switch (color) {
        case DEFAULT_MODE:
            this.style.backgroundColor = CELL_COLOR_BLACK;
            break;

        case RGB_MODE:
            return;
            break

        case RAINBOW_MODE:


            let r = rgbRandomizer();
            let g = rgbRandomizer();
            let b = rgbRandomizer();
            randomizedColor = `rgb(${r},${g},${b})`;
            this.style.backgroundColor = `rgb(${r},${g},${b})`;
            if (this.style.backgroundColor == randomizedColor) {
                this.style.backgroundColor = `rgba(0,0,0,0.9)`;
            }
            break;

        case ERASE_MODE:
            this.style.backgroundColor = CELL_COLOR_WHITE;
            break;

    }

}
}

function toggleClicker(choice){
    console.log("inside toggle log")
    currentlyActive = choice;
   
   
}

featureButton.forEach((featureButton) => featureButton.addEventListener("mouseup", colorMode));

resetButton.addEventListener("click", function () {
    sketchContainer.textContent = "";
    makeCells(16, 16)
});

let cellActivator = document.querySelectorAll("."+DIV_CELL_CLASS_NAME);
     cellActivator.forEach((cellActivator) => cellActivator.addEventListener("mousedown",function(){toggleClicker(true)}) );
     cellActivator.forEach((cellActivator) => cellActivator.addEventListener("mouseup",function(){toggleClicker(false)}) );
function onLoad() {
    gridPixel = document.querySelectorAll("#" + DIV_CELL_ID_NAME);

     
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter",changeCellColor ));
   
}


