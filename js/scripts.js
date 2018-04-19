$(function() {
  let gridWidth = Math.floor(Math.random() * 20) + 1,
    gridHeight = Math.floor(Math.random() * 20) + 1;

    console.log(gridWidth + " " + gridHeight);

  // set a random color at page load
  randColor();

  $("#inputCols").change(function() {
    gridWidth = $(this).val();
  });

  $("#inputRows").change(function() {
    gridHeight = $(this).val();
  });

  $("#randColor").click(randColor);

  $("#buildGrid").on("click", function() {
    let aRow = "",
      grid = "";

    $("#canvas-label").removeClass("hidden");

    $("#canvas")
      .children()
      .remove();

    // build out a row
    for (let x = 0; x < gridWidth; x++) {
      aRow += "<td></td>";
    }

    // build the height
    for (let y = 0; y < gridHeight; y++) {
      grid += "<tr>" + aRow + "</tr>";
    }

    // append the grid to table element
    $("#canvas").append(grid);

    // add listeners for draw clicks
    // TODO: add draggable drawing
    // if mousedown == true, then use mousemove
    $("#canvas").mousedown(function() {
      $("td").mouseover(draw(true));
      $("td").off("mouseup", draw(false));
    });
  });

  let draw = (toDraw) => {
    while(toDraw) {
      let myColor = "rgb(" + $("#r").val() + "," + $("#g").val() + "," + $("#b").val() + ")";
      $(this).css("background", myColor);
    }
  }

  // slider listeners
  $("#colorInput").change(onSlide);
});

// slider function
function onSlide() {
  let myR = $("#r").val(),
    myG = $("#g").val(),
    myB = $("#b").val(),
    asStr = "rgb(" + myR + "," + myG + "," + myB + ")";

  // update color values
  $("#rVal").text(myR);
  $("#gVal").text(myG);
  $("#bVal").text(myB);

  // update swatch
  $("#swatch").css("background", asStr);
}

// random color function
function randColor() {
  let myValues = [];

  for (j = 0; j < 3; j++) {
    myValues.push(Math.floor(Math.random() * 256));
  }

  // set sliders
  $("#r").val(myValues[0]);
  $("#g").val(myValues[1]);
  $("#b").val(myValues[2]);

  // set number values
  $("#rVal").text($("#r").val());
  $("#gVal").text($("#g").val());
  $("#bVal").text($("#b").val());

  // set swatch
  $("#swatch").css("background", "rgb(" + myValues + ")");
}
