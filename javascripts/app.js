// Rover Object Goes Here
// ======================

//we create an array where each element is a rover, so we can play with many of them... (better with classes???)
var rovers=[
  //rover 0
  {
  commands: "bbblbbb",
  direction: "N",
  positionX: 0,
  positionY: 0,
  travelLog: [], 
  id:"0"
},

  //rover 1
  {
    commands: "bbblbbb",
    direction: "N",
    positionX: 0,
    positionY: 4,
    travelLog: [], 
    id:"1"
  },

//rover 2
{
  commands: "flfflbbb",
  direction: "N",
  positionX: 5,
  positionY: 5,
  travelLog: [],
  id: "2"
}];

// it's where we play, we put some 'x' as obstacles.
var grid=[
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", "x", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", "x", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", "x", " ", " ", " ", "x", " ", " ", " "],
  [" ", " ", " ", " ", " ", "x", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "x", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
];

for (var i=0; i<rovers.length; i++){
  grid[rovers[i].positionX][rovers[i].positionY]=rovers[i].id;
}

//keeps the current position of every rover.
var currentPositions=[];
for (var i=0; i<rovers.length; i++){
  currentPositions.push([rovers[i].positionX, rovers[i].positionY]);
}



// ======================

//checks if there's a rover at the position we want to move.
function checkPosition(x, y){
  for (var i=0; i<currentPositions.length; i++){
    if(currentPositions[i][0]===x && currentPositions[i][1]===y){
      return true;
    }
  }
  return false;
}

//updates the direction when we turn left
function turnLeft(rover){
  switch(rover.direction){
    case "N":
      rover.direction="W";
      break;
    case "E":
      rover.direction="N";
      break;
    case "S":
      rover.direction="E";
      break;
    case "W":
      rover.direction="S";
      break;
    default:
      console.log("Wrong direction!!!!");
  }
}

//updates the direction when we turn right
function turnRight(rover){
  switch(rover.direction){
    case "N":
      rover.direction="E";
      break;
    case "E":
      rover.direction="S";
      break;
    case "S":
      rover.direction="W";
      break;
    case "W":
      rover.direction="N";
      break;
    default:
      console.log("Wrong direction!!!!");
  }
}

//updates the position where we want to move one step forward if we are not at the edge of the array
function moveForward(rover){
  var nextX=rover.positionX;
  var nextY=rover.positionY;
  switch (rover.direction){
    case "N":
      if (rover.positionY>0){
        nextY--;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
    case "S":
      if (rover.positionY<10){
        nextY++;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
    case "W":
      if (rover.positionX>0){
        nextX--;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
    case "E":
      if (rover.positionX<10){
        nextX++;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
  }

  move(nextX, nextY, rover);
}

//updates the position where we want to move one step backward if we are not at the edge of the array
function moveBackward(rover){
  var nextX=rover.positionX;
  var nextY=rover.positionY;
  switch (rover.direction){
    case "N":
      if (rover.positionY<10){
          nextY++;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
    case "S":
      if (rover.positionY>0){
          nextY--;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
    case "W":
      if (rover.positionX<10){
          nextX++;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
    case "E":
      if (rover.positionX>0){
          nextX--;
      }else{
        console.log("Out of bounds!!!!");
      }
      break;
  }
  move(nextX, nextY, rover);
}


//cheks, before the movement, if there's an obstacle or another rover at the place we want to move
function move(nextX, nextY, rover){
  console.log("Rover "+rover.id+" wants to move to x="+nextX+" y="+nextY);
  if (grid[nextX][nextY]==="x"){
    console.log("Obstacle found at "+nextX+", "+nextY+"... command skipped!!!");
    return;
  } else if (checkPosition(nextX, nextY)){
    console.log("Another rover found at "+nextX+", "+nextY+"... command skipped!!!");
    return;
  }
  rover.positionX=nextX;
  rover.positionY=nextY;
  console.log("Current position of rover "+rover.id+" is x="+rover.positionX+" y="+rover.positionY);
  rover.travelLog.push([rover.positionX, rover.positionY]);
  grid [rover.positionX][rover.positionY]=rover.id;
  currentPositions[rover.id][0]=rover.positionX;
  currentPositions[rover.id][1]=rover.positionY;
}
//finds the number of movements that the rover with most movements make
function findMaxRecord(rovers){
  var max=0;
  for (var i=0; i<rovers.length; i++){
    if (rovers[i].commands.length>max){
      max=rovers[i].commands.length;
    }
  }
  return max;
}
//interpretates the string with every command
function letsRock(rovers){
  var maxRecord=findMaxRecord(rovers);
  for (var i=0; i<maxRecord; i++){
    for (var j=0; j<rovers.length; j++){
      if (i<rovers[j].commands.length){
        switch (rovers[j].commands[i]){
          case 'r':
            turnRight(rovers[j]);
            break;
          case 'l':
            turnLeft(rovers[j]);
            break;
          case 'f':
            moveForward(rovers[j]);
            break;
          case 'b':
            moveBackward(rovers[j]);
            break;
          default:
            console.log("Invalid command!!!!!");
        }
      }
    }
  }
  for (var i=0; i<rovers.length; i++){
    console.log("The route of the rover "+rovers[i].id+" is "+rovers[i].travelLog); 
  }
}

letsRock(rovers);
console.log(grid);
