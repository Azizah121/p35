var balloon;
var database;
var position;
function preload(){
  bimage=loadAnimation("Hot Air Ballon-02.png");
}
function setup() {
  createCanvas(1000,500);
  balloon=createSprite(100,200);
  balloon.addAnimation("b",bimage);
  bg=loadImage("Hot Air Ballon-01.png");
 database=firebase.database();
  var balloonPosition=database.ref('balloon/position');
balloonPosition.on("value", readPosition);
}

function draw() {
  background(bg); 
  textSize(20);
fill("black");
  text("Arrows Controls Movement",500,100);

  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-1);
    balloon.scale=balloon.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);
    balloon.scale=balloon.scale+0.01;
} 
  drawSprites();
}
function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
  }
  function writePosition(x,y){
    database.ref("balloon/position").update({
        'x':position.x+x,
        'y':position.y+y,
    })
}