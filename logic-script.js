
const RAINBOW_MODE = "rainbowMode";
const RGB_MODE = "RgbMode";
const DEFAULT_MODE = "defaultBlackMode";
const ERASE_MODE = "eraseMode";
const SHADING_MODE = "shadingMode";

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
const HTML_COLOR_MODE_SHADING = "shading";

const sketchContainer = document.getElementById("sketchContainer");
const RgbSelector = document.getElementById("RGBselector");
let color = DEFAULT_MODE;
const featureButton = document.querySelectorAll(".featureButton");
const resetButton = document.getElementById("reset");

let gridPixel;
let rgbValue;

let randomizedColor;
let currentlyActive = false;
let opacityOfCell = 0.0;
let currentOpacity = 0.0;

sketchContainer.style.cursor = "crosshair"
sketchContainer.onmousedown = () => { return false; };

let checker;
function ValueSelectedOfRGB() {
    rgbValue = RgbSelector.value;
    colorMode();
}
RgbSelector.addEventListener("change", ValueSelectedOfRGB, false);

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

        case HTML_COLOR_MODE_SHADING:
            color = SHADING_MODE;
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
        cell.classList.add("grid-cell");
        cell.setAttribute('draggable', 'false');
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

    if (currentlyActive) {
        switch (color) {
            case DEFAULT_MODE:
                this.style.backgroundColor = CELL_COLOR_BLACK;
                break;

            case RGB_MODE:


                console.log(rgbValue);
                this.style.backgroundColor = RgbSelector.value;
                checker = this.style.backgroundColor.slice(-4, -1)
                break;

            case RAINBOW_MODE:


                let r = rgbRandomizer();
                let g = rgbRandomizer();
                let b = rgbRandomizer();
                console.log("tu idhar hai??")
                randomizedColor = `rgba(${r},${g},${b},1)`;

                this.style.backgroundColor = `rgb(${r},${g},${b})`;
                checker = this.style.backgroundColor.slice(-4, -1)
                break;

            case ERASE_MODE:
                this.style.backgroundColor = CELL_COLOR_WHITE;
                break;

            case SHADING_MODE:
                if (this.style.backgroundColor.match(/rgba/)) {
                    currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                    this.style.backgroundColor = `rgba(0,0,0,${currentOpacity + 0.1})`;
                    this.classList.add('opaque');
                    console.log("here");
                }
                else if (this.classList == 'opaque' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                    return;
                } else {
                    console.log("you are in else")
                    this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }
                break;

        }

    }
}

function toggleClicker(choice) {
    console.log("inside toggle log")
    currentlyActive = choice;


}

featureButton.forEach((featureButton) => featureButton.addEventListener("mousedown", colorMode));

resetButton.addEventListener("click", function () {
    sketchContainer.textContent = "";
    makeCells(16, 16);
});
function changeRainbowOpacity() {
    if (currentlyActive) {
        if (color == RAINBOW_MODE) {
            console.log("bhai idhar kaise");
            currentOpacity = window.getComputedStyle(this).opacity;
            this.style.backgroundColor = `rgba(0,0,0,${currentOpacity + 0.1})`
            this.classList.add = "opacity"


        }
    }
}

function onLoad() {
    gridPixel = document.querySelectorAll("#" + DIV_CELL_ID_NAME);

    let cellActivator = document.querySelectorAll("#" + DIV_CELL_ID_NAME);
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mousedown", function () { toggleClicker(true) }));
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseup", function () { toggleClicker(false) }));

    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter", changeCellColor));
    // gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter",changeRainbowOpacity ));
}


