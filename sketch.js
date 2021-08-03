var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexIMG, trex;
var ground;
var invisibleGround;
var groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score, back1, back2;
var wow, ohno;
var ani;
var gameOver
var reStart
function preload(){
  
  ani = loadAnimation("ani1.jpg","ani2.jpg","ani3.jpg","ani4.jpg","ani5.jpg","ani6.jpg","ani7.jpg","ani8.jpg","ani9.jpg","ani10.jpg","ani11.jpg","ani12.jpg")

  back1 = loadImage("First.jpg");
  back2 = loadImage("Second.jpg");
  
  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("stone.png");
  obstacle3 = loadImage("stone.png");
  obstacle4 = loadImage("stone.png");
  obstacle5 = loadImage("stone.png");
  obstacle6 = loadImage("stone.png");

  wow = loadSound("wow.mp3");
  ohno = loadSound("oh no.mp3");

  gameOverImg = loadImage("gameOver.png");
  reStartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1700, 500);
  
  trex = createSprite(200,400,20,20);
  trex.addAnimation("go", ani);
  trex.scale = 1.3;
  //trex.debug = true;

  invisibleGround = createSprite(200,480,1700,10);
  invisibleGround.visible = false; 
  //invisibleGround.debug = true;

  gameOver = createSprite(850, 250);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  reStart = createSprite(850, 350);
  reStart.addImage(reStartImg);
  reStart.scale = 0.5;
  reStart.visible = false;

  obstaclesGroup = new Group();
  
  score = 0;
  
  //camera.x = trex.x - 20;
  //camera.y = trex.y - 20;
}

function draw() {
  background(back1);
  
  //set velcity of each game object to 0
  invisibleGround.velocityX = 0;
  trex.velocityY = 0;

  if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }

  text("Score: "+ score, 850,70);
  if (gameState === PLAY) {
    invisibleGround.velocityX = -(6+3*score/100);
      
  
  score = score + Math.round(getFrameRate()/60);
  
  if (score % 90 === 0) {
    
   wow.play();

  }
  
  if(keyDown("space") && invisibleGround.isTouching(trex)) {
    trex.velocityY = -150;
  }
  
  console.log(trex.x);

  trex.velocityY = trex.velocityY + 2.5;
  
  if (back1.x < 0 && background === back1){
    back1.x = back1.width/2;
  } 
  
  if (back2.x < 0 && background === back2) {
    back2.x = back2.width/2;
  }

  trex.collide(invisibleGround);

  spawnObstacles();

    if (obstaclesGroup.isTouching(trex)) {
     gameState = END;   
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    reStart.visible = true;
    
    obstaclesGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

  }
  
  if(mousePressedOver(reStart)) {
    reset();
  }
  
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  reStart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
  
}
//i want to addanimation()to this project is it ok?
//cause i want to upgrade
//mine is good and craft is better and minecraft is the best

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(1800,450,20,20);
    obstacle.velocityX = -(8+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.debug = false;
  }
}
