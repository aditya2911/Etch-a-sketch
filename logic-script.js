
const sketchContainer = document.getElementById("sketchContainer");






function makeCells(rows,cols)
{   let cell;
    sketchContainer.style.setProperty('--grid-rows',rows);
    sketchContainer.style.setProperty('--grid-cols',cols);

    let width = 40/rows+"rem";
    let height = 40/cols+"rem";
    
    for(c=0;c<rows*cols;c++)
    {
         cell =  document.createElement("div");
        counter = c +1;
        
        cell.style.setProperty("width",width);
        cell.style.setProperty("height",height);
       
        //  cell.innerText = (counter);
        sketchContainer.appendChild(cell).className = "grid-item";
    }
}

makeCells(2,2);
