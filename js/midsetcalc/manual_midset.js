(function(){
  var submit = document.getElementById("submit");
  var reset = document.getElementById("reset");

  addEvent(submit, "click", function(e){
    //get value dropdown boxes
    //console.log("check one");
    var x1direct = document.getElementById("x1direction").value;
    var y1direct = document.getElementById("y1direction").value;
    var y1line = document.getElementById("y1line").value;
    var side1 = document.getElementById("side1").value;
    var x2direct = document.getElementById("x2direction").value;
    var y2direct = document.getElementById("y2direction").value;
    var y2line = document.getElementById("y2line").value;
    var side2 = document.getElementById("side2").value;

    //get value text boxes
    var x1steps = document.getElementById("x1steps").value;
    var x1line = document.getElementById("x1line").value;
    var y1steps = document.getElementById("y1steps").value;
    var x2steps = document.getElementById("x2steps").value;
    var x2line = document.getElementById("x2line").value;
    var y2steps = document.getElementById("y2steps").value;

    if(!(x1direct && y1direct && y1line && side1 && x2direct && y2direct && y2line && side2 && x1line && y2line)){
      document.getElementById("midset").textContent = "you must put in all the inputs";
      return;
    }
    if(!x1steps){x1steps = 0}
    if(!y1steps){y1steps = 0}
    if(!x2steps){x2steps = 0}
    if(!y2steps){y2steps = 0}
    var convertedX1 = convertToCoorX(parseFloat(x1steps), parseFloat(x1line), x1direct, side1);
    var convertedX2 = convertToCoorX(parseFloat(x2steps), parseFloat(x2line), x2direct, side2);
    var convertedY1= convertToCoorY(parseFloat(y1steps), y1line, y1direct);
    var convertedY2 = convertToCoorY(parseFloat(y2steps), y2line, y2direct);
    var midsetX = findMidsetX(convertedX1, convertedX2);
    var midsetY = findMidsetY(convertedY1, convertedY2);
    var convertedStuff = "<p>Your converted coordinates: <br />x1: " + convertedX1.toString() + "<br />y1: " + convertedY1.toString() + "<br />x2: " + convertedX2.toString() + "<br />y2: " + convertedY2.toString() +"</p>" +
    "<p>Your unconverted midsets: <br />sideToside: " + midsetX.toString() + "<br />frntToBack: " + midsetY.toString() + "</p>";
    var midsets = "<br  />Side to side: " + convertToSetX(midsetX) + "<br />Front to back: " + convertToSetY(midsetY);
    /*
    var results = "<p> x1direct:" + x1direct + "<br  /> y1direct: " + y1direct + "<br  />y1line: " + y1line + "<br  />side1: " + side1 + "<br  />x2direct: "
    + x2direct + "<br  />y2direct: " + y2direct + "<br  />y2line: " + y2line + "<br  />side2: " + side2 + "<br  />x1steps: " + x1steps + "<br  />x1line :" + x1line +
    "<br  /> y1steps" + y1steps + "<br  />x2steps: " + x2steps + "<br  />x2line: " + x2line + "<br  />y2steps: " +y2steps + "</p>";
    */
    document.getElementById("midset").innerHTML = "<p>" + document.getElementById("midset").innerHTML + midsets + "</p>";
  });


  addEvent(reset, "click", function(e){
      document.getElementById("x1direction").value = document.getElementById("x2direction").value;
      document.getElementById("x1steps").value = document.getElementById("x2steps").value;
      document.getElementById("x1line").value = document.getElementById("x2line").value;
      document.getElementById("side1").value = document.getElementById("side2").value;
      document.getElementById("y1direction").value = document.getElementById("y2direction").value;
      document.getElementById("y1line").value = document.getElementById("y2line").value;
      document.getElementById("y1steps").value = document.getElementById("y2steps").value;

      document.getElementById("x2direction").value = "";
      document.getElementById("x2steps").value = "";
      document.getElementById("x2line").value = "";
      document.getElementById("side2").value = "";
      document.getElementById("y2direction").value = "";
      document.getElementById("y2line").value = "";
      document.getElementById("y2steps").value = "";
  });


  /*
  Dimensions of a hs ftball field
  sideline to hash 28 steps
  hash to center 13.5 steps
  width 83 steps

  */

  function convertToCoorX(steps, line, orient, side){
    var coordinate;
    if(side == 1){
      coordinate = (line / 5) * 8;
      if(orient == "on"){
        return coordinate;
      } else if(orient == "inside"){
        return coordinate + steps;
      } else if(orient == "outside"){
        return coordinate - steps;
      } else {
        returnError();
      }
    } else if (side == 2){
      coordinate = (20 - (line / 5)) * 8;
      if(orient == "on"){
        return coordinate;
      } else if(orient == "inside"){
        return coordinate - steps;
      } else if (orient == "outside"){
        return coordinate + steps;
      } else {
        returnError();
      }
    } else {
      returnError();
      return;
    }
  }

  function convertToCoorY(steps, line, orient){
    var coordinate;
    if(line == "fline"){
      coordinate = 0;
    } else if(line == "fhash"){
      coordinate = 28;
    } else if(line == "bhash"){
      coordinate = 55;
    } else if(line == "bline"){
      coordinate = 83;
    } else {
      returnError();
      return;
    }
    if(orient == "on"){
      return coordinate;
    } else if(orient == "behind"){
      return coordinate + steps;
  } else if(orient == "in frnt"){
      return coordinate - steps;
    } else {
      returnError();
    }
  }

  function findMidsetX(iniX, finX){
    return (iniX + finX) / 2;
  }

  function findMidsetY(iniY, finY){
    return (iniY + finY) / 2;
  }

  function convertToSetX(coordinate){
    var ydline;
    var coorLine;
    if(coordinate == 80){
      return "On the 50 yd line";
    } else if (coordinate < 80){
      ydline = Math.round(coordinate / 8) * 5;
      coorLine = ydline * 8 / 5;
      if(coordinate < coorLine){
        return (coorLine - coordinate).toString() + " steps outside the " + ydline.toString() + "yd. line Side 1";
      } else if (coordinage > coorLine){
        return (coordinate - coorLine).toString() + " steps inside the " + ydline.toString() + " yd. line Side 1";
      } else {
        return "On the " + ydline.toString() + " yd. line Side 1";
      }
    } else {
      ydline = Math.round((160 - coordinate) / 8) * 5;
      coorLine = (20 - (ydline / 5)) * 8;
      if(coordinate > coorLine){
        return (coordinate - coorLine).toString() + " steps outside the " + ydline.toString() + " yd. line Side 2";
      } else if (coordinate < coorLine){
        return (coorLine - coordinate).toString() + " steps inside the " + ydline.toString() + " yd. line Side 2";
      } else {
        return "On the " + ydline.toString() + " yd. line Side 2";
      }
    }
  }

  function convertToSetY(coordinate){
    if(coordinate < 14){
      if (coordinate > 0){
        return coordinate.toString() + " steps behind the front sideline";
      } else if (coordinate < 0){
        return coordinate.toString() + " steps in front of the front sideline";
      } else {
        return "On the front sideline";
      }
    } else if((coordinate >= 14) && (coordinate < 41.5)){
      if (coordinate == 28){
        return "On front hash";
      } else if(coordinate < 28) {
        return (28 - coordinate).toString() + "steps in front of the front hash";
      } else {
        return (coordinate - 28).toString() + " steps behind the front hash";
      }
    } else if(coordinate >= 41.5 && coordinate < 69){
      if(coordinate == 55){
        return "On the back hash";
      } else if (coordinate < 55){
        return (55 - coordinate).toString() + " steps in front of the back hash";
      } else {
        return (coordinate - 55).toString() + " steps behind the back hash";
      }
    } else {
      if(coordinate == 83){
        return "On the back sideline";
      } else if(coordinate < 83){
        return (83 - coordinate).toString() + " steps in front of the back sideline";
      } else {
        return (coordinate - 83).toString() + " steps behind the back sideline";
      }
    }
  }

  function returnError(){
    document.findElementById("midset").textContent = "There was an error.";
  }

}());
