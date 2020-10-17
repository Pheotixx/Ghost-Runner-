var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost.debug = true;
  ghost.setCollider("rectangle",0,0,20,80);
}

function draw(){
  background(0);
  
  if(gameState === "play"){
  if(tower.y>400){
    tower.y = 300;
  }
  
  ghost.velocityX = 0;
  if(keyDown("space")){
    ghost.velocityY = -7;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("left_arrow")){
    ghost.velocityX = -3;
  }
  
  if(keyDown("right_arrow")){
    ghost.velocityX = 3;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  spawnDoors();
  drawSprites();
  }
  if(gameState === "end"){
    background(0);
    stroke("yellow");
    textSize(30);
    text("GAME OVER!", 230, 250);
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if(frameCount%240 === 0){
     door = createSprite(random(100,500), -50);
    door.addImage(doorImg);
    climber = createSprite(door.x, 10);
    climber.addImage(climberImg);
    invisibleBlock = createSprite(climber.x, 15);
    invisibleBlock.visible = false;
    
    door.velocityY = 1;
    climber.velocityY = door.velocityY;
    invisibleBlock.velocityY = climber.velocityY;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
      invisibleBlock.debug = true;
  }
  
}

