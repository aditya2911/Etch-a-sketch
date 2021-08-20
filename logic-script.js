const RAINBOW_MODE = "rainbowMode";
const COLOR_MODE = "colorMode";
const DEFAULT_MODE = "defaultBlack";
const DIV_CELL_ID_NAME = "divCell";
const DIV_CELL_CLASS_NAME = "grid-item";
const GRID_ROWS = '--grid-rows';
const GRID_COLS = '--grid-cols';

const sketchContainer = document.getElementById("sketchContainer");
const sketchContainerChild = sketchContainer.children;
const rainbowButton = document.getElementById("rainbowButton");
const color = DEFAULT_MODE;

let divCellId;
let cellOfTheDiv ; 


makeCells(25,25);

rainbowButton.addEventListener("click",changeCellColor());

function makeCells(rows,cols)
{   let cell = [];
    sketchContainer.style.setProperty(GRID_ROWS,rows);
    sketchContainer.style.setProperty(GRID_COLS,cols);

    

    let width = 40/rows+"rem";
    let height = 40/cols+"rem";
   
    for(c=0;c<rows*cols;c++)
    {
         cell =  document.createElement("div");
        counter = c +1;
        
        cell.style.setProperty("width",width);
        cell.style.setProperty("height",height);
        // cell.addEventListener("click",function(){cell.style.backgroundColor = "black";});
        //  cell.innerText = (counter);
    //    cell.classList.add("box");
       cell.id = DIV_CELL_ID_NAME;
      
       sketchContainer.appendChild(cell).className = DIV_CELL_CLASS_NAME;
      
        
    }
    
    onLoad();
    
}

// sketchContainerChild.addEventListener("hover",
// function(){sketchContainerChild.style.setProperty("background-color",black)});
function changeCellColor(){
    // cellOfTheDiv  = document.querySelectorAll("#divCell");
    console.log(this);
    switch(color)
    {
            case DEFAULT_MODE :
                this.style.backgroundColor = "#000000";

            case COLOR_MODE:
                return;
    }
     
}

function onLoad(){
    let gridPixel = document.querySelectorAll(".grid-item");

    gridPixel.forEach(gridPixel => gridPixel.addEventListener("mouseover",changeCellColor));
}


