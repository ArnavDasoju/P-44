const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var spacebj,spacebjimg
var rocket,rocketimg 
var meteorsGroup,meteorimg

var edge1,edge2,edge3,edge4

var score;

var engine, world;

function preload() {
 
spacebjimg = loadImage("images/spacebg.jpg")
rocketimg = loadImage("images/ROCKETIMAGE.png")
meteorimg = loadImage("images/meteorimg.png") 
  
}

function setup() {
  createCanvas(1000,500);
engine = Engine.create();
world = engine.world;

rocket = createSprite(500,250)
rocket.addImage(rocketimg)
rocket.scale = 0.35

rocket.setCollider("rectangle",0,0,100,400);
rocket.debug = true


meteorsGroup = createGroup();

score = 0;


}

function draw() {
background(spacebjimg)

text("Score: "+ score, 500,50);
score = score + Math.round(getFrameRate()/60);

 

if(keyWentDown(UP_ARROW)){
  rocket.velocityY = -7;
  }
  
  if(keyWentDown(DOWN_ARROW)){
  rocket.velocityY = 7;
  }
  
  if(keyWentDown(RIGHT_ARROW)){
  rocket.velocityX = 7;
  }
  
  if(keyWentDown(LEFT_ARROW)){
  rocket.velocityX = -7;
  }
  
  if(meteorsGroup.isTouching(rocket)){
    text("GAME OVER"+ score, 1000,500);
    rocket.velocityX = null
    rocket.velocityY = null

    score = null

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
  
  }

  if(rocket.x > 1000 || rocket.x < 0 || rocket.y > 500 || rocket.y < 0){
    
    rocket.velocityX = null
    rocket.velocityY = null

    score = null

  obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
}

  spawnMeteors();

  drawSprites()
}

function spawnMeteors() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var meteor = createSprite(600,1000,40,10);
    meteor.x = Math.round(random(80,1000));
    meteor.addImage(meteorimg);
    meteor.scale = 0.15;
    meteor.velocityY = -10;
    
     //assign lifetime to the variable
     meteor.lifetime = 200;
    
    //adjust the depth
    meteor.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    
    //add each cloud to the group
    meteorsGroup.add(meteor);
  }


}
