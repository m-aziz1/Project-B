//Specify Line Width
function lineWidth(width) {
  ctx.lineWidth = width;
}

//Draw a Line segment from (x1, y1) to (x2, y2)
function line(x1, y1, x2, y2, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

//Draw a Rectangle with a top left corner of (x, y)
function rect(x, y, w, h, mode, color) {
  if (mode === "fill") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else if (mode === "stroke") {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

//Draw a Circle with center (x, y)
function circle(x, y, r, mode, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (mode === "fill") {
    ctx.fillStyle = color;
    ctx.fill();
  } else if (mode === "stroke") {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

//Draw a Triangle with first vertex at (x1, y1)
function triangle(x1, y1, x2, y2, x3, y3, mode, color) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  if (mode === "fill") {
    ctx.fillStyle = color;
    ctx.fill();
  } else if (mode === "stroke") {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

//Draw Text
function text(fontSize, fontFamily, text, x, y, mode, color) {
  ctx.font = `${fontSize} ${fontFamily}`;
  if (mode === "fill") {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  } else if (mode === "stroke") {
    ctx.strokeStyle = color;
    ctx.strokeText(text, x, y);
  }
}

//Draw Ellipse with center (x, y)
function ellipse(x, y, rX, rY, rot, mode, color) {
  ctx.beginPath();
  ctx.ellipse(x, y, rX, rY, rot, 0, 2 * Math.PI);
  if (mode === "fill") {
    ctx.fillStyle = color;
    ctx.fill();
  } else if (mode === "stroke") {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

//Draw Image
function image(img, x, y, w, h) {
  ctx.drawImage(img, x, y, w, h);
}

//Draw Clipped Image
function imageClip(img, xC, yC, wC, hC, x, y, w, h) {
  ctx.drawImage(img, xC, yC, wC, hC, x, y, w, h);
}

//Divide Canvas Into Grid -- place at end of script to ensure all lines visible
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

//prettier-ignore
//Draw Mountain Range
function drawMtnRange(x, y, wScale, color1, color2, color3) {
    // Draw Mountain Range (left vertex, top vertex, right vertex)
    //Middle mountain
    triangle(x + 75 + wScale * 2, y + 200, x + 200 + wScale * 3, y, x + 325 + wScale * 4, y + 200, "fill", color2);
    //Left Mountain
    triangle(x, y + 200, x + 100 + wScale, y, x + 200 + wScale * 2, y + 200, "fill", color1);
    //Right Mountain
    triangle(x + 200 + wScale * 4, y + 200, x + 300 + wScale * 5, y, x + 400 + wScale * 6, y + 200, "fill", color3);
  }

//prettier-ignore
//Draw Planet/Moon with 25r or larger, (x,y) are center of outer circle
function drawPlanet(x, y, r, outerColor, innerColor, ellipseColors) {
    let ellipseSpc = 0;
    if (r > 80) {
      ellipseSpc += 25;
    }
    if (r > 200) {
      ellipseSpc += 25;
    }
    circle(x + 10, y + 10, r, "fill", outerColor);
    circle(x + 5, y + 10, r * 0.8, "fill", innerColor);
    ellipse(x, y, r * 0.18, r * 0.08, 0, "fill", ellipseColors);
    ellipse(x + 10 + ellipseSpc, y + 15 + ellipseSpc, r*0.18, r*0.08, 0, "fill", ellipseColors);
  }

//Draw Star
function drawStar(x, y, rX, rY, mode, color) {
  ellipse(x, y, rX, rY, 0, mode, color);
  ellipse(x, y, rX, rY, (90 * Math.PI) / 180, mode, color);
}

//Draw Background
function background(color) {
  rect(0, 0, cnv.width, cnv.height, "fill", color);
}
