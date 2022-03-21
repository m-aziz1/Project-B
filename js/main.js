//GRAPHING PROGRAM

//DOCUMENT ELEMENTS
const fileUpload = document.getElementById("uploadData");

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
fileUpload.addEventListener("change", fileDataHandler);

function fileDataHandler() {
  //Initialize File Variable
  let file = fileUpload.files[0];

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
    //Sort Array from lowest to highest x Values
    graphValues.sort((a, b) => a.x - b.x);
    createTable(graphValues);
  };
}

//CREATE TABLE OF VALUES
//Row Nodes
const xTable = document.getElementById("output-x-table");
const yTable = document.getElementById("output-y-table");

//Returns NodeList of Elements with Selected Class
const placeholders = document.querySelectorAll(".placeholder");

function createTable(anArray) {
  //Remove Empty Initial Values for x and y
  placeholders.forEach((placeholder) => {
    placeholder.remove();
  });

  //Call Functions to Fill Table
  domManipulation(anArray, xTable);
  domManipulation(anArray, yTable);
}

//(dom = Document Object Model)
function domManipulation(anArray, row) {
  for (let i = 0; i < anArray.length; i++) {
    let textNode;
    let cellNode = document.createElement("td");

    //Write as Strings to fill Data Cells
    if (row === xTable) {
      textNode = document.createTextNode(`${anArray[i].x}`);
    } else if (row === yTable) {
      textNode = document.createTextNode(`${anArray[i].y}`);
    }

    //Push x and y Values Inside Data Cell Tags
    cellNode.appendChild(textNode);

    //Push Data Cells Inside Row Tags
    row.appendChild(cellNode);
  }
}
