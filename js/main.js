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
//From File
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
    createTable(graphValues)
  };
});

//From Input
const xInputEl = document.getElementById("x-input");
const yInputEl = document.getElementById("y-input");
const addBtnEl = document.getElementById("add-value");
const removeBtnEl = document.getElementById("remove-value");

addBtnEl.addEventListener("click", () => {
  graphValues.push(new DataPoint(xInputEl.value, yInputEl.value));
  console.log(graphValues);
  createTable(graphValues);
});

removeBtnEl.addEventListener("click", () => {
  alert("remove");
});

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

//Remove Curent Table Data Loop
function removeAllChildNodes(parent) {
  while (parent.childNodes.length > 0) {
      parent.removeChild(parent.firstChild);
  }
}