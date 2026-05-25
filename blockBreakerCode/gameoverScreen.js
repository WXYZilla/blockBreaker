let trans = 0;

function gameoverTrans() {
  if(gameOver == 1){
    trans++;
    push();
    fill(0);
    noStroke();
    if(trans >= 0){
      rect(0, 0, 1000, 300);
    }
    if(trans >= 20){
      rect(0, 300, 1000, 300);
    }
    if(trans >= 40){
      rect(0, 600, 1000, 300);
    }
    if(trans >= 60){
      rect(0, 900, 1000, 300);
    }
    if(trans >= 80){   
      push();
      textSize(70);
      fill(255);
      text('GAME OVER',300,500);
      textSize(50);
      text('Press SPACE to Try Again', 220, 700);
      pop();
    }
  }
}

function keyPressed(){
  if(key == ' ' && trans >= 86) restart();
}

function restart(){
  speed = 15;
  xPos = width / 2;
  xDir = speed;
  yPos = (height - 200) / 2;
  yDir = speed;
  diam = 50;
  padWidth = 300;
  randomColor1 = color('#FF0000');
  randomColor2 = color('#FF0000');
  ballNum = 1;
  gameStart = 1;
  gameOver = 0;
  gameOverSwitch = 1;
  blackMode = 0;
  blackMark = 1;
  bounced = 1;
  t = 0;
  bricks = [[1],[2],[3],[4]];
  start = 100;
  score = 0;
  ballNum1 = 1;
  ballNum2 = 1;
  trans = 0;
  gameStart = 0;
  effects = [];
  count = 0;
}

function countdown(){
  if(gameStart < 160) gameStart++;
  push();
  fill(255);
  textSize(70);
  if(gameStart >= 120 && gameStart < 160) text('GO!',450,550);
  else if(gameStart >= 80 && gameStart < 160) text('1',470,550);
  else if(gameStart >= 40 && gameStart < 160) text('2',470,550);
  else if(gameStart >= 0 && gameStart < 160) text('3',470,550);
  pop();
  if(gameStart == 160 && !(bgm.isPlaying()) && gameOver == 0) bgm.play();
}