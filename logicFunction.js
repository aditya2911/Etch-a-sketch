const HTML_COLOR_MODE_RAINBOW = "rainbow";
const HTML_COLOR_MODE_ERASER = "eraser";
const HTML_COLOR_MODE_SHADING = "shading";
const HTML_COLOR_MODE_RGB = "colorRGB";

const ERASE_MODE = "eraseMode";
const SHADING_MODE = "shadingMode";
const RAINBOW_MODE = "rainbowMode";
const RGB_MODE = "RgbMode";
const DEFAULT_MODE = "defaultBlackMode";


const DIV_CELL_ID_NAME = "divCell";
const DIV_CELL_CLASS_NAME = "grid-item";
const GRID_ROWS = '--grid-rows';
const GRID_COLS = '--grid-cols';

const CELL_COLOR_BLACK = "#000000";
const CELL_COLOR_WHITE = "#ffffff";

const RGBButton = document.getElementById("rainbowButton");
const featureButton = document.querySelectorAll(".featureButton");
const Canvas = document.getElementById("canvas");
const Slider = document.getElementById("slider");
const RgbSelector = document.getElementById("colorWheel");
const ResetButton = document.getElementById("reset"); 
const cellSizeInNumber = document.getElementById('gridNumber');
const sliderMobile = document.getElementById("sliderMobile");

let widthOfTheCanvas ;
let heightOfTheCanvas;
let randomizedColor;
let currentlyActive = false;
let opacityOfCell = 0.0;
let currentOpacity = 0.0;
let sliderValue = 16;
Slider.value = 16;
RgbSelector.value = "#000000";
rgbValue = RgbSelector;
let color = RGB_MODE;


function sliderValueChange(){
    sliderValue = Slider.value;
    sliderMobile.value = sliderValue;
    cellSizeInNumber.textContent = '';
    cellSizeInNumber.textContent = `${sliderValue} X ${sliderValue}`;
    resetCells();
}
function sliderMobileValueChange(){
    sliderValue = sliderMobile.value;
    cellSizeInNumber.textContent = '';
    cellSizeInNumber.textContent = `${sliderValue} X ${sliderValue}`;
    Slider.value = sliderValue;
    resetCells();
}

function resetCells(){
    Canvas.textContent =""
    makeCells(sliderValue,sliderValue);
}
function makeCells(rows, cols) {
    let cell;
    Canvas.style.setProperty(GRID_ROWS, rows);
    Canvas.style.setProperty(GRID_COLS, cols);

     widthOfTheCanvas = window.getComputedStyle(Canvas).getPropertyValue('width');
     heightOfTheCanvas = window.getComputedStyle(Canvas).getPropertyValue('height');


    let widthOftheCell = widthOfTheCanvas / rows + "vw";
    let heightOftheCell = heightOfTheCanvas / cols + "vh";

    for (c = 0; c < rows * cols; c++) {
        cell = document.createElement("div");


        cell.style.setProperty("width", widthOftheCell);
        cell.style.setProperty("height", heightOftheCell);
        cell.classList.add("grid-cell");
        cell.setAttribute('draggable', 'false');
        cell.style.border ="1px solid #ddd";
        cell.id = DIV_CELL_ID_NAME;


        Canvas.appendChild(cell).className = DIV_CELL_CLASS_NAME;


    }

  onLoad();

}



function toggleClicker(choice) {
    console.log("inside toggle log")
    currentlyActive = choice;


}

function ValueSelectedOfRGB() {
    rgbValue = RgbSelector.value;
    colorMode(event);
}

RgbSelector.addEventListener("change", ValueSelectedOfRGB, false);


function colorMode(event){
    switch(event.target.dataset.color)
    {
        case HTML_COLOR_MODE_RGB:
            color = RGB_MODE;
            break;

        case HTML_COLOR_MODE_RAINBOW:
            color = RAINBOW_MODE;
            break;

        case HTML_COLOR_MODE_SHADING:
            color = SHADING_MODE;
            break;    

        case HTML_COLOR_MODE_ERASER:
            color = ERASE_MODE;
            break;
    }

}

function rgbRandomizer() {
    let randomColor = Math.floor(Math.random() * 255)
    return randomColor;
}

function changeCellColor() {

    if (currentlyActive) {
        switch (color) {
       
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
                this.style.backgroundColor = "#000000";
                break;

        }

    }

}




function getCellCoordinates(event){
    let mobileCell = document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY);

    if(mobileCell.id == DIV_CELL_ID_NAME ) {
        let cooridnate = this.getBoundingClientRect();
     console.log(event.touches);
        // console.log(document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY));
    let mobileCell = document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY);
        if (currentlyActive) {
            switch (color) {
           
                case RGB_MODE:
    
    
                    console.log(rgbValue);
                    document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY).style.backgroundColor = RgbSelector.value;
                    checker = this.style.backgroundColor.slice(-4, -1)
                    break;
    
                case RAINBOW_MODE:
    
    
                    let r = rgbRandomizer();
                    let g = rgbRandomizer();
                    let b = rgbRandomizer();
                    console.log("tu idhar hai??")
                    randomizedColor = `rgba(${r},${g},${b},1)`;
    
                    mobileCell.style.backgroundColor = `rgb(${r},${g},${b})`;
                    checker = this.style.backgroundColor.slice(-4, -1)
                    break;
    
                case ERASE_MODE:
                    mobileCell.style.backgroundColor = CELL_COLOR_WHITE;
                    break;
    
                case SHADING_MODE:
                    if (mobileCell.style.backgroundColor.match(/rgba/)) {
                        currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                        mobileCell.style.backgroundColor = `rgba(0,0,0,${currentOpacity + 0.1})`;
                        mobileCell.classList.add('opaque');
                        console.log("here");
                    }
                    else if (mobileCell.classList == 'opaque' && mobileCell.style.backgroundColor == 'rgb(0, 0, 0)') {
                        return;
                    } else {
                        console.log("you are in else")
                        mobileCell.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                    }
                    break;
    
                default:
                    mobileCell.style.backgroundColor = "#000000";
                    console.log("Default");
                    break;
    
            }
    
        }
        event.preventDefault();
    }
}



Canvas.onmousedown = () => {return false};
ResetButton.addEventListener("click",resetCells);
Slider.addEventListener("change",sliderValueChange);
sliderMobile.addEventListener("change",sliderMobileValueChange);


featureButton.forEach((featureButton) => featureButton.addEventListener("mousedown", colorMode));
makeCells(16,16);




function onLoad() {
    gridPixel = document.querySelectorAll("#" + DIV_CELL_ID_NAME);

    let cellActivator = document.querySelectorAll("#" + DIV_CELL_ID_NAME);
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mousedown", function () { toggleClicker(true) }));
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseup", function () { toggleClicker(false) }));

    // gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchmove", function () { toggleClicker(true) }));
    // gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchend", function () { toggleClicker(true) }));

    // $("#"+DIV_CELL_ID_NAME).live('touchstart touchend',function(e){
    //     e.preventDefault();   
    // changeCellColor(); })

     gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter", changeCellColor));
    // gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchstart", getCellCoordinates));
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchmove", function () { toggleClicker(true) }));

    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchmove", getCellCoordinates));



    // gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchmove", changeCellColor));
    console.log(this.Canvas);
    // gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter",changeRainbowOpacity ));
}
