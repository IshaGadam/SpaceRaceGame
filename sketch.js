var jet,enemy;
var jet1,jet2;
var score = 0;
var score1 = 0;
var gameOver;
var GOI;
var PLAY = 1;
var END = 0
var gameState = PLAY;
var spaceI;
var space;


function preload(){
  jet = loadImage("assets/jetfighter.png");
  enemy = loadImage("assets/meteorI-removebg-preview.png");
  GOI = loadImage("assets/gameoverimage.jpg");
  spaceI = loadImage("assets/spaceImage.jpg");
}

function setup() {
  createCanvas(580,670);
  
  space = createSprite(250,350);
  space.addImage(spaceI);
  space.scale = 2.4;
  space.velocityY = 1.5;
  
  jet1 = createSprite(100,620,15,15);
  jet1.addImage(jet);
  jet1.scale = 0.16;

  jet2 = createSprite(395,620,15,15);
  jet2.addImage(jet);
  jet2.scale = 0.16;

  enemy1Group = new Group();

}

function draw() {
  background(0); 

  space.velocityY = 1.5;

  if (space.y  > 400){
   space.y = height/2;
  }
  
  spawnEnemy();

  if(gameState==PLAY){

  if(keyDown("UP_ARROW")){
    jet1.y = jet1.y-8;
  }

  if(keyDown("LEFT_ARROW")){
    jet1.x = jet1.x-4.8;
  }

  if(keyDown("RIGHT_ARROW")){
    jet1.x = jet1.x+4.8;
  }
  
  if(keyDown("U")){
    jet2.y = jet2.y-8;
  }
  
  if(keyDown("L")){
    jet2.x = jet2.x-4.8;
  }

  if(keyDown("R")){
    jet2.x = jet2.x+4.8;
  }

  if(jet1.y<10){
    jet1.x = 100;
    jet1.y = 620;
    score += 1;
  }

  if(jet2.y<10){
    jet2.x = 395;
    jet2.y = 620;
    score1 += 1;
  }
  
  if(jet1.isTouching(enemy1Group)){
    for(var i = 0 ; i<enemy1Group.length ; i++){
    if(enemy1Group[i].isTouching(jet1)){
    jet1.x = 100;
    jet1.y = 620;
    }
  }
}

 if(jet2.isTouching(enemy1Group)){
   for(var i = 0 ; i<enemy1Group.length ; i++){
   if(enemy1Group[i].isTouching(jet2)){
   jet2.x = 395;
   jet2.y = 620;
   }
 }
}
}
else if(gameState==END){
  enemy1Group.destroyEach();
  jet1.destroy();
  jet2.destroy();
  space.velocityY = 0;
}

drawSprites();
textSize(40);
fill("white");
text(""+score,100,40);
text(""+score1,400,40);

if(gameState==END){
  textSize(40);
  fill("white");
  text("GAMEOVER!!",129,300);
}

if(score===5){
  gameState = END;
  text("JET-1 WINS.",130,350);
}

if(score1===5){
  gameState = END;
  text("JET-2 WINS.",130,350);
}

}

function spawnEnemy(){
 if(frameCount%30===0){
   enemy1 = createSprite(random(10,560),5,5,5);
   enemy1.addImage(enemy);
   enemy1.velocityY = 6;
   enemy1.scale = 0.15
   enemy1Group.add(enemy1);
 }
}

