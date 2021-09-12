const HTML_COLOR_MODE_RAINBOW = "rainbow";
const HTML_COLOR_MODE_ERASER = "eraser";
const HTML_COLOR_MODE_SHADING = "shading";
const HTML_COLOR_MODE_RGB = "colorRGB";

const ERASE_MODE = "eraseMode";
const SHADING_MODE = "shadingMode";
const RAINBOW_MODE = "rainbowMode";
const RGB_MODE = "RgbMode";

const DIV_CELL_ID_NAME = "divCell";
const DIV_CELL_CLASS_NAME = "grid-item";
const GRID_ROWS = '--grid-rows';
const GRID_COLS = '--grid-cols';

const CELL_COLOR_BLACK = "#000000";
const CELL_COLOR_WHITE = "#ffffff";

const RGBButton = document.getElementById("rainbowButton");
const FeatureClassButton = document.getElementsByClassName(".featureButton");
const Canvas = document.getElementById("canvas");
const Slider = document.getElementById("slider");


let randomizedColor;
let currentlyActive = false;
let opacityOfCell = 0.0;
let currentOpacity = 0.0;
const DEFAULT_MODE = "defaultBlackMode";

let color = DEFAULT_MODE;

Canvas.onmousedown = () => {return false};


function makeCells(rows, cols) {
    let cell;
    Canvas.style.setProperty(GRID_ROWS, rows);
    Canvas.style.setProperty(GRID_COLS, cols);



    let widthOftheCell = 35 / rows + "vw";
    let heightOftheCell = 30 / cols + "vw";

    for (c = 0; c < rows * cols; c++) {
        cell = document.createElement("div");


        cell.style.setProperty("width", widthOftheCell);
        cell.style.setProperty("height", heightOftheCell);
        cell.classList.add("grid-cell");
        cell.setAttribute('draggable', 'false');
        cell.style.border ="1px solid black";
        cell.id = DIV_CELL_ID_NAME;


        Canvas.appendChild(cell).className = DIV_CELL_CLASS_NAME;


    }

  onLoad();

}



function toggleClicker(choice) {
    console.log("inside toggle log")
    currentlyActive = choice;


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

            default:
                this.style.backgroundColor = "black";
                break;

        }

    }
}










makeCells(16,16);


function onLoad() {
    gridPixel = document.querySelectorAll("#" + DIV_CELL_ID_NAME);

    let cellActivator = document.querySelectorAll("#" + DIV_CELL_ID_NAME);
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mousedown", function () { toggleClicker(true) }));
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseup", function () { toggleClicker(false) }));

    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter", changeCellColor));
    // gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter",changeRainbowOpacity ));
}
