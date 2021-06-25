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

var gameOver
var reStart
function preload(){
  
  trexIMG = loadImage("images.png");

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
  
  trex = createSprite(50,300,20,50);
  trex.addImage("images.png");
  trex.scale = 2;

  invisibleGround = createSprite(200,350,1700,10);
  invisibleGround.visible = true;
  
  gameOver = createSprite(0, 250);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  reStart = createSprite(300, 150);
  reStart.addImage(reStartImg);
  reStart.scale = 0;
  reStart.visible = false;

  obstaclesGroup = new Group();
  
  score = 0;
  
  
  camera.x = trex.x - 20;
  camera.y = trex.y - 20;
}

function draw() {
  background(back1);
  
  //set velcity of each game object to 0
  invisibleGround.velocityX = 0;
  trex.velocityY = 0;

  text("Score: "+ score, 0,70);
  if (gameState === PLAY) {
    invisibleGround.velocityX = -(6+3*score/100);
      
  
  score = score + Math.round(getFrameRate()/60);
  
  if (score === 100) {
    
   wow.play();

  }
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  if (back1.x < 0 && background === back1){
    back1.x = back1.width/2;
  } 
  
  if (back2.x < 0 && background === back2) {
    back2.x = back2.width/2;
  }

  trex.collide(invisibleGround);
// the end state will come when the play state is over //
  spawnObstacles();

    if (obstaclesGroup.isTouching(trex)) {
     gameState = END;   
    }
  }else if(gameState === END) {
    gameOver.visible = true;
    reStart.visible = true;
    ohno.play();
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
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1000,350,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
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
    obstacle.scale = 0.2;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}