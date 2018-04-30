document.onreadystatechange = function () {
  /* From MDN: Using "interactive" because the document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading. */
  if (document.readyState === "interactive") {
    let canvas = document.querySelector("#canvas");

    // load a random color at DOM ready
    randColor();

    // start event listeners
    // build grid button listener
    // default grid is 1 x 1 if no values entered by user
    document.querySelector("#buildGrid").onclick = () => {
      let w = document.querySelector("#inputCols").value;
      let h = document.querySelector("#inputRows").value;
      let aRow = "";
      let grid = "";

      // don't allow for silliness
      if (w < 1) {
        gridWidth = 1;
      } else if (w > 50) {
        gridWidth = 50;
      } else gridWidth = w;
      if (h < 1) {
        gridHeight = 1;
      } else if (h > 50) {
        gridHeight = 50;
      } else gridHeight = h;
      // watch out for decimals
      gridWidth = Math.round(gridWidth);
      gridHeight = Math.round(gridHeight);

      // clear canvas at start of new build
      canvas.innerHTML = "";

      // construct grid w/ strings
      // build out a row
      for (let x = 0; x < gridWidth; x++) {
        aRow += "<td></td>";
      }
      // build the height
      for (let y = 0; y < gridHeight; y++) {
        grid += "<tr>" + aRow + "</tr>";
      }

      // reveal canvas label
      document.querySelector("#canvas-label").style.display = "block";

      // add grid to canvas
      canvas.innerHTML = grid;

      let draw = (e) => {
        let currentColor =
          `rgb(
            ${document.querySelector("#r").value},
            ${document.querySelector("#g").value},
            ${document.querySelector("#b").value}
          )`;
        e.target.style.backgroundColor = currentColor;
      }

      let toggle = false;
      canvas.addEventListener("mouseleave", () => {toggle = false;});
      document.querySelectorAll("#canvas td").forEach((el) => {
        el.addEventListener("mousedown", (e) => {
          toggle = true;
          draw(e);
        });
        el.addEventListener("mouseover", (e) => {
          if(toggle) {
            draw(e);
          }
        });
        el.addEventListener("mouseup", () => {toggle = false;});
      });
    }

    // color selection listeners
    // color select slider listeners
    document.querySelector("#r").addEventListener("input", onSlide);
    document.querySelector("#g").addEventListener("input", onSlide);
    document.querySelector("#b").addEventListener("input", onSlide);
    // add listener for random color button
    document.querySelector("#randColor").onclick = () => {
      randColor();
    }



  }
}

let randColor = () => {
  var myValues = [];
  for (j = 0; j < 3; j++) {
    myValues.push(Math.floor(Math.random() * 256));
  }

  // update RGB number values
  document.querySelector("#rVal").innerHTML = myValues[0];
  document.querySelector("#gVal").innerHTML = myValues[1];
  document.querySelector("#bVal").innerHTML = myValues[2];

  // update slider positions
  document.querySelector("#r").value = myValues[0];
  document.querySelector("#g").value = myValues[1];
  document.querySelector("#b").value = myValues[2];

  // fill swatch color
  document.querySelector("#swatch").style.backgroundColor =
    "rgb(" + myValues + ")";
}

let onSlide = () => {
  let r = document.querySelector("#r").value;
  let g = document.querySelector("#g").value;
  let b = document.querySelector("#b").value;

  //update color values
  document.querySelector("#rVal").innerHTML = r;
  document.querySelector("#gVal").innerHTML = g;
  document.querySelector("#bVal").innerHTML = b;

  //update color swatch
  document.querySelector("#swatch").style.backgroundColor =
    "rgb("+r+","+g+","+b+")";
}
