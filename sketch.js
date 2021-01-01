var ground;
var monkey , monkey_running,monkey_collide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var bckground,bckgroundimage;
var PLAY =1;
var END=0;
var gamestate=PLAY;
var life =2;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bckgroundimage = loadImage("MOJA.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collide = loadImage("sprite_7.png");
}



function setup() {
   createCanvas(400,400);
  
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("monkey collided",monkey_collide);
  monkey.scale=0.15;
  
  ground = createSprite(450,360,900,10);
  ground.velocityX=-4;
  ground.visible = false;
  console.log(ground.x);
  
  bckground = createSprite(300,230,10,10);
  bckground.scale =4;
  bckground.velocityX=-4;
  
  obstacleGroup = createGroup(); 
  FoodGroup = createGroup();
}


function draw() {
  background("lightblue");
  bckground.addAnimation("bckgrnd",bckgroundimage);
  
  //score = score + Math.round(getFrameRate()/60);
  
  
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime=Math.ceil(frameCount/getFrameRate());
  text("Survival Time:"+survivalTime,50,50);      
  
  
  
  
  if(keyDown("space")&& monkey.y >= 290) {
    if(gamestate === PLAY){
        monkey.velocityY = -16;
    }
    }
  monkey.velocityY =  monkey.velocityY + 0.8;
  monkey.collide(ground);
  //monkey.collide(obstacleGroup);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (bckground.x < 0){
      bckground.x = bckground.width/2;
    }
  spawnObstacles();
  spawnBananas();
  
  bckground.depth=obstacleGroup.depth ;
  obstacleGroup.depth+=1;
  bckground.depth=monkey.depth;
  bckground.depth-=1;
  
  
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
  }
  
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityX = 0;
    ground.velocityX = 0;
    bckground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("monkey collided",monkey_collide);
    monkey.scale = 0.13;
    gamestate = END;
    life = life-1;
  }
  if(gamestate === END){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
  if(gamestate === END && keyDown("space")){
    if(life>0){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach(); 
    bckground.velocityX=-4;
    gamestate = PLAY;
    monkey.changeAnimation("moving",monkey_running);
      }
   
     }
  
  switch(score){
    case 10: monkey.scale =0.16;
      break;
    case 20: monkey.scale =0.17;
      break;
    case 30: monkey.scale =0.18;
      break;
    case 40: monkey.scale =0.19;
      break;
      default: break;
  }
  drawSprites();
  
  stroke("white");
  textSize(30);
  fill("black");
  text("score:  "+score,250,55);
  
}
function spawnObstacles(){
 if(frameCount % 200 === 0){
   var obstacle = createSprite(600,310,10,40);
   //obstacle.debug = true;
   obstacle.setCollider("rectangle",-10,0,330 ,310);
   obstacle.velocityX =-8;
   //obstacle.velocityY =  obstacle.velocityY + 0.8;
   obstacle.addAnimation("obst",obstacleImage);
   obstacle.scale = 0.235;
   obstacle.depth = bckground.depth;
   obstacle.depth +=1;
   obstacle.lifetime = 120;
   obstacle.collide(ground);
   obstacleGroup.add(obstacle);
   obstacle.debug = true;
   obstacle.setCollider("rectangle",0,0,220,370)
 }
}
function spawnBananas(){
 if(frameCount % 60 === 0){
   var banana = createSprite(600,Math.round(random(120,200)),10,40)
   banana.velocityX =-6;
   banana.addAnimation("banna",bananaImage);
   banana.scale = 0.1;
   banana.lifetime = 120;
   FoodGroup.add(banana);
   
 }
}




