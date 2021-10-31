
// creating constants for getting the HTML options 

const HTML_COLOR_MODE_RAINBOW = "rainbow";
const HTML_COLOR_MODE_ERASER = "eraser";
const HTML_COLOR_MODE_SHADING = "shading";
const HTML_COLOR_MODE_RGB = "colorRGB";


// creating constants for different modes , the user may select
const ERASE_MODE = "eraseMode";
const SHADING_MODE = "shadingMode";
const RAINBOW_MODE = "rainbowMode";
const RGB_MODE = "RgbMode";
const DEFAULT_MODE = "defaultBlackMode";


// initialzing
const DIV_CELL_ID_NAME = "divCell";
const DIV_CELL_CLASS_NAME = "grid-item";
const GRID_ROWS = '--grid-rows';
const GRID_COLS = '--grid-cols';

const CELL_COLOR_BLACK = "#000000";
const CELL_COLOR_WHITE = "#ffffff";

// gettomg the elements from html and assigning them to constants

const RGBButton = document.getElementById("rainbowButton");
const featureButton = document.querySelectorAll(".featureButton");
const Canvas = document.getElementById("canvas");
const Slider = document.getElementById("slider");
const RgbSelector = document.getElementById("colorWheel");
const ResetButton = document.getElementById("reset");
const cellSizeInNumber = document.getElementById('gridNumber');
const sliderMobile = document.getElementById("sliderMobile");
const rainbowButton = document.getElementById("rainbowButton");
const shadingButton = document.getElementById("shading");
const eraserButton = document.getElementById("eraser");
const sliderValueChangedM = document.getElementById("sliderValueIndicator");


// iniitializing  variables for storing values

let widthOfTheCanvas;
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


// function used to change the color of the option selected by user , indicating that it  is the current mode 

function backgroundColorChangerForOption(event) {

    // event helps us to get value from html
    switch (event.target.dataset.color) {

        // dataset.color attribute are given to each option in html
        case HTML_COLOR_MODE_ERASER:

            eraserButton.style.background = '#333'
            eraserButton.style.color = "white";
            shadingButton.style.background = "white";
            shadingButton.style.color = "#333";
            rainbowButton.style.background = "white";
            rainbowButton.style.color = "#333";
            break;
        case HTML_COLOR_MODE_RAINBOW:
            rainbowButton.style.background = "#333";
            rainbowButton.style.color = "white";
            shadingButton.style.background = "#ffffff";
            shadingButton.style.color = "#333";
            eraserButton.style.background = "#ffffff";
            eraserButton.style.color = "#333";

            break;
        case HTML_COLOR_MODE_SHADING:
            shadingButton.style.backgroundColor = "#333";
            shadingButton.style.color = "white";
            eraserButton.style.backgroundColor = "#ffffff";
            eraserButton.style.color = "#333";
            rainbowButton.style.backgroundColor = "#ffffff";
            rainbowButton.style.color = "#333";

            break;
    }

}



// function used to show the grid size on landscape mode
function sliderValueChange() {
    sliderValue = Slider.value;
    sliderMobile.value = sliderValue;
    cellSizeInNumber.textContent = '';
    cellSizeInNumber.textContent = `${sliderValue} X ${sliderValue}`;
    sliderValueChangedM.textContent = `${sliderValue} X ${sliderValue}`;

    resetCells();
}

// function used to show the grid size on potrait mode

function sliderMobileValueChange() {
    sliderValue = sliderMobile.value;
    cellSizeInNumber.textContent = '';
    cellSizeInNumber.textContent = `${sliderValue} X ${sliderValue}`;
    sliderValueChangedM.textContent = "";
    sliderValueChangedM.textContent = `${sliderValue} X ${sliderValue}`;
    Slider.value = sliderValue;
    resetCells();
}


// reset the grid 
function resetCells() {
    Canvas.textContent = ""
    makeCells(sliderValue, sliderValue);
}

// function used to create the cells in the grid 
function makeCells(rows, cols) {
    let cell;

    // sets the property on CSS , GRID_ROWS and GRID_COLS respectivey , this variable are send to canvas ID ,
    // for creating grids
    Canvas.style.setProperty(GRID_ROWS, rows);
    Canvas.style.setProperty(GRID_COLS, cols);


    //  gets the current width and height of canvas
    widthOfTheCanvas = window.getComputedStyle(Canvas).getPropertyValue('width');
    heightOfTheCanvas = window.getComputedStyle(Canvas).getPropertyValue('height');


    //setting the width and height of the cells , by dividing the width and height of canvas by number of cells

    let widthOftheCell = widthOfTheCanvas / rows + "vw";
    let heightOftheCell = heightOfTheCanvas / cols + "vh";


    //creating cells , by using for loop that will iterate < rows * cols
    for (c = 0; c < rows * cols; c++) {
        // creating a DOM element "div" in javascript , this div element will be our cells
        cell = document.createElement("div");


        // setting the width and height of our div element
        cell.style.setProperty("width", widthOftheCell);
        cell.style.setProperty("height", heightOftheCell);

        // giving a class attribute "grid-cell" to the div
        cell.classList.add("grid-cell");
        cell.setAttribute('draggable', 'false');
        cell.style.border = "1px solid #ddd";
        cell.id = DIV_CELL_ID_NAME;


        // appending the cells to the canvas id element
        Canvas.appendChild(cell).className = DIV_CELL_CLASS_NAME;


    }
    // function explained in the last , its serves it purpose for adding event listener to cells
    // and acts as a toggle , only allowing to draw only when the user is actively clicking and dragging the mouse
    // on canvas
    onLoad();

}

// functions listens for the user input on cells and then only allows to draw on canvas

function toggleClicker(choice) {
    console.log("inside toggle log")
    currentlyActive = choice;


}

// functions get the value selected on color swatch
function ValueSelectedOfRGB() {
    rgbValue = RgbSelector.value;

    colorMode(event);
}

// listens if user changed a color on color swatch
RgbSelector.addEventListener("change", ValueSelectedOfRGB, false);


// function to gets invoked and select the option selected by user
function colorMode(event) {
    switch (event.target.dataset.color) {
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

// function for rainbow mode , to generate random color
function rgbRandomizer() {
    let randomColor = Math.floor(Math.random() * 255)
    return randomColor;
}

// the option selected on colorMode will be used to match the option and it defines what to do next
// with the option selected
function changeCellColor() {

    // currentlyActive checks if the user is currently drawing or not
    if (currentlyActive) {
        switch (color) {

            case RGB_MODE:



                this.style.backgroundColor = RgbSelector.value;
                checker = this.style.backgroundColor.slice(-4, -1)
                break;

            case RAINBOW_MODE:


                let r = rgbRandomizer();
                let g = rgbRandomizer();
                let b = rgbRandomizer();

                randomizedColor = `rgba(${r},${g},${b},1)`;

                this.style.backgroundColor = `rgb(${r},${g},${b})`;
                checker = this.style.backgroundColor.slice(-4, -1)
                break;

            case ERASE_MODE:
                this.style.backgroundColor = CELL_COLOR_WHITE;
                break;

            case SHADING_MODE:
                // get the current color and adds changes its shade  to a  darker color
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


// function is used for touch screen devices , to allow the user to draw

function getCellCoordinates(event) {
    // stores the co-ordinate of a element touched by user into mobileCell
    let mobileCell = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);

    // checks if the id of "mobileCell" is equal to the cells ID created in canvas
    if (mobileCell.id == DIV_CELL_ID_NAME) {


        console.log(event.touches);

        // if the id name of mobileCell and div element created in  canvas is same the
        // we get the X and Y co-ordinate , store them in mobile cells and then perform 
        // operation on it , like changing color , shading , eraser mode etc
        let mobileCell = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        if (currentlyActive) {
            switch (color) {

                case RGB_MODE:


                    console.log(rgbValue);
                    document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY).style.backgroundColor = RgbSelector.value;
                    checker = this.style.backgroundColor.slice(-4, -1)
                    break;

                case RAINBOW_MODE:


                    let r = rgbRandomizer();
                    let g = rgbRandomizer();
                    let b = rgbRandomizer();
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
        // this is used to prevent the default behaviour and it does not allow cells to get dragged on mobile mode
        event.preventDefault();
    }
}


// doesnt allow canvas to get dragged on a computer
Canvas.onmousedown = () => { return false };

// event listner to listen for changes
ResetButton.addEventListener("click", resetCells);
Slider.addEventListener("change", sliderValueChange);
sliderMobile.addEventListener("change", sliderMobileValueChange);
featureButton.forEach((featureButton) => featureButton.addEventListener("mousedown", colorMode));
featureButton.forEach((featureButton) => featureButton.addEventListener("click", backgroundColorChangerForOption));

// function declared earlier to make changes
makeCells(16, 16);


// onLoad functionality add a event listener to all the cells of the canvas element
// it also serves its purpose by acting as a toggle , only allowing user to draw when
// he is actually pressing the mouse and dragging , similar for touchscreen devices

function onLoad() {
    // get element from html and storing the in gridPixel variable
    gridPixel = document.querySelectorAll("#" + DIV_CELL_ID_NAME);

    // add eventlistener that listen for when the user has clicked on a cell and invoking appropriate function
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mousedown", function () { toggleClicker(true) }));
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseup", function () { toggleClicker(false) }));



    // add eventlistener that listen for when the user has clicked on a cell and invoking appropriate function on 
    // mobile device
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("mouseenter", changeCellColor));
    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchmove", function () { toggleClicker(true) }));

    gridPixel.forEach((gridPixel) => gridPixel.addEventListener("touchmove", getCellCoordinates));




}


