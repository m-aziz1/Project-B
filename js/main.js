//GRAPHING PROGRAM

//DOCUMENT ELEMENTS
const fileUploadEl = document.getElementById("uploadData");

//CANVAS SETUP
const cnv = document.getElementById("graph-canvas");
const ctx = cnv.getContext("2d");
cnv.width = 700;
cnv.height = 550;

//CLASSES
class DataPoint {
  constructor(initX, initY) {
    this.x = initX;
    this.y = initY;
  }
}

//DATA ARRAYS
let graphValues = [];

//GET DATA
//FROM FILE
fileUploadEl.addEventListener("change", () => {
  //Clear Existing Data
  graphValues = [];

  //Initialize File Variable
  let file = fileUploadEl.files[0];

  //Create File Reader Object
  let reader = new FileReader();

  //Read Data
  reader.readAsText(file);

  //Process Data
  reader.onloadend = () => {
    let fetchedData = reader.result;

    //Create One Array with All (x, y) String Pairs
    let allPairs;
    allPairs = fetchedData.split("\r\n");

    //Use to Split Into Multiple [x, y] Integer Arrays
    let splitPairs;

    for (let i = 0; i < allPairs.length; i++) {
      splitPairs = allPairs[i].split(",").map(Number);
      graphValues.push(new DataPoint(splitPairs[0], splitPairs[1]));
    }

    //Build Table
    createTable(graphValues);
  };
});

//FROM INPUT
let xInputEl = document.getElementById("x-input");
let yInputEl = document.getElementById("y-input");
const addBtnEl = document.getElementById("add-value");
const removeBtnEl = document.getElementById("remove-value");

//Add Values
addBtnEl.addEventListener("click", () => {
  //CHANGE SO ONLY ALLOWED IF NOT AN ALREADY EXISTING VALUE
  //If input.value.length = 0, field is empty
  if (+xInputEl.value.length !== 0 && +yInputEl.value.length !== 0) {
    let foundInd = searchDatapoint();
    if (foundInd.every((index) => index > -1)) {
      console.log(foundInd);
      alert("Datapoint already Exists");
    } else {
      graphValues.push(new DataPoint(+xInputEl.value, +yInputEl.value));
      createTable(graphValues);
    }
  } else {
    alert("Please enter both x and y values");
  }
});

//Delete Values
removeBtnEl.addEventListener("click", () => {
  if (+xInputEl.value.length !== 0 && +yInputEl.value.length !== 0) {
    let foundInd = searchDatapoint();

    //Remove the DataPoint if its x and y Values are in Stored Values
    if (foundInd[0] === foundInd[1] && foundInd.every((index) => index > -1)) {
      graphValues.splice(foundInd[0], 1);
      createTable(graphValues);
    } else {
      alert("Datapoint not found");
    }
  } else {
    alert("Please enter both x and y values");
  }
});

//Search for Existing DatapPoint
function searchDatapoint() {
  let xInd = graphValues.findIndex((data) => data.x === +xInputEl.value);
  let yInd = graphValues.findIndex((graph) => graph.y === +yInputEl.value);

  return [xInd, yInd];
}

//CREATE TABLE OF VALUES
//Row Nodes
const xTableEl = document.getElementById("output-x-table");
const yTableEl = document.getElementById("output-y-table");

//Returns NodeList of Elements with Selected Class
const placeholders = document.querySelectorAll(".placeholder");

function createTable(anArray) {
  //Sort Array from lowest to highest x Values
  graphValues.sort((a, b) => a.x - b.x);

  //Remove Empty Initial Values for x and y
  placeholders.forEach((placeholder) => {
    placeholder.remove();
  });

  //Remove Previous Filled Table
  removeAllChildNodes(xTableEl);
  removeAllChildNodes(yTableEl);

  //Call Functions to Fill Table
  domManipulation(anArray, xTableEl);
  domManipulation(anArray, yTableEl);
}

//(dom = Document Object Model)
function domManipulation(anArray, row) {
  for (let i = 0; i < anArray.length; i++) {
    let textNode;
    let cellNode = document.createElement("td");

    //Write as Strings to fill Data Cells
    if (row === xTableEl) {
      textNode = document.createTextNode(`${anArray[i].x}`);
    } else if (row === yTableEl) {
      textNode = document.createTextNode(`${anArray[i].y}`);
    }

    //Push x and y Values Inside Data Cell Tags
    cellNode.appendChild(textNode);

    //Push Data Cells Inside Row Tags
    row.appendChild(cellNode);
  }
}

//Remove Current Table Data Loop
function removeAllChildNodes(parent) {
  while (parent.childNodes.length > 0) {
    parent.removeChild(parent.firstChild);
  }
}

function coordinateGrid(xIntervals, yIntervals, xColor, yColor) {
  let xScale = cnv.width / xIntervals;
  let xCoord = 0;
  for (let i = 0; i < xIntervals - 1; i++) {
    xCoord += xScale;
    line(xCoord, 0, xCoord, cnv.height, xColor);
  }

  let yScale = cnv.height / yIntervals;
  let yCoord = 0;
  for (let i = 0; i < yIntervals - 1; i++) {
    yCoord += yScale;
    line(0, yCoord, cnv.width, yCoord, yColor);
  }
}

function line(x1, y1, x2, y2, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

line(50, 50, 50, 500, "black");
line(50, 500, 650, 500, "black");
let xLine = 0;
for (let i = 0; i < 10; i++) {
  xLine  += 65;
  line(xLine, 50, xLine, 500, "grey");
}

let yLine = 0;
for (let i = 0; i < 10; i++) {
  yLine  += 50;
  line(50, yLine, 650, yLine, "grey");
}
