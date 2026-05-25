let padX, padY, padWidth;
let xPos, xDir, yPos, yDir, diam, speed;
let gameOver = 0, gameOverSwitch = 1
let blackMode = 0, blackMark = 1;
let randomColor1, randomColor2, bounced = 1;
let t = 0;
let bricks = [[1],[2],[3],[4]];
let start = 100;
let score = 0;
let ballNum1 = 1, ballNum2 = 1;
let gameStart = 0;
let effects = [];
let count = 0;

function setup() {
  var cnv = createCanvas(1000, 1200);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  
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
}

function draw() {
  //background
  background(128);
  
  //drawing lower part
  fill(200);
  noStroke();
  rect(0,height-200,width,200);
  fill(randomColor2);
  circle(100, height - 200 + 100, 70);
  noFill();
  stroke(255);
  square(40,height - 200 + 40 , 120);
  
  //drawing ball
  fill(200);
  stroke(randomColor1);
  strokeWeight(10);
  circle(xPos,yPos,diam);
  if(gameStart >= 160 && gameOver == 0){
    xPos = xPos + xDir;
    yPos = yPos + yDir;
  }
  
  //drawing the bounce pad
  padX = mouseX - padWidth/2;
  padY = height - 230;
  fill(0);
  noStroke();
  rect(padX, padY, padWidth, 30);
  fill(100);
  rect(padX+60, padY, 180, 30);
  fill(255);
  rect(padX+120, padY, 60, 30);
  
  //drawing scoreboard
  push();
  noFill();
  stroke(0);
  strokeWeight(5);
  rect(300, 1050, 550,100);
  fill(255);
  textSize(70);
  text('SCORE:',350,1120);
  text(score, 600,1120);
  pop();
  
  //drawing end line
  stroke(255,0,0);
  strokeWeight(7);
  line(0,800,1000,800);
  
  //countdown
  countdown();
  
  //hitbox
  groundHitbox();
  wallHitbox();
  if(yDir > 0) padHitbox();
  
  //changing ball color
  if(yDir < 0 && bounced == 1 && gameOver != 1){
    bounced = 0;
    randomColor1 = randomColor2;
    ballNum1 = ballNum2;
    randomColor2 = colorGenerate();
    if(blackMode == 1) blackMode = 0;
  }
  blackModeOn();
  
  //drawing bricks
  drawBricks();
  drawEffects();
  brickHitbox();
  if(t == 300 && gameOver == 0 && gameStart >= 160){
    summonBricks();
    t = 0;
    count++;
  }
  t += 1;
  
  brickClear();
  for(let i = 0 ; i < 4 ; i++){
    if(bricks[i].length == 10){
      gameOver = 1;
    }
  }
  
  speedUp();
  
  gameoverTrans();
  gameoverPlay();
}

function padHitbox() {
  if(xPos > padX && xPos < padX + padWidth/5 && yPos > height-200-30-diam/2-25){
    yDir = -speed;
    xDir = -speed;
    bounced = 1;
  }
  else if(xPos >= padX + padWidth/5 && xPos < padX + padWidth/5*2 && yPos > height-200-30-diam/2-25){
    yDir = -speed-3;
    xDir = -speed+3;
    bounced = 1;
  }
  else if(xPos >= padX + padWidth/5*2 && xPos < padX + padWidth/5*3 && yPos > height-200-30-diam/2-25){
    yDir = -speed-6;
    xDir = 0;
    bounced = 1;
  }
  else if(xPos >= padX + padWidth/5*3 && xPos < padX + padWidth/5*4 && yPos > height-200-30-diam/2-25){
    yDir = -speed-3;
    xDir = speed-3;
    bounced = 1;
  }
  else if(xPos >= padX + padWidth/5*4 && xPos < padX + padWidth && yPos > height-200-30-diam/2-25){
    yDir = -speed;
    xDir = speed;
    bounced = 1;
  }
  else if(dist(xPos, yPos, padX, padY)-speed < diam/2){
    yDir = -speed;
    xDir = -speed;
    bounced = 1;
  }
  else if(dist(xPos, yPos, padX+padWidth, padY)-speed < diam/2){
    yDir = -speed;
    xDir = speed;
    bounced = 1;
  }
  

}

function brickClear(){
  for(let i = 0 ; i < 4 ; i++){
    for(let j = bricks[i].length-1 ; j >= 0 ; j--){
      if(bricks[i][j] == 0){
        bricks[i].splice(j,1);
      }
      else break;
    }
  }
}

function wallHitbox() {
  if(xPos - diam/2 - 10 < 0) xDir = abs(xDir);
  if(xPos + diam/2 + speed > width) xDir = -abs(xDir);
  if(yPos - diam/2 - 10 < 0) yDir = abs(yDir);
}

function groundHitbox() {
  if(yPos + diam/2 + speed > height - 200) gameOver = 1;
}

function colorGenerate() {
  if(score >= blackMark*500){
    blackMark++;
    if(blackMode == 0){
      blackMode += 200;
      console.log(blackMode);
    }
  }
  if(blackMode > 0) blackMode--;
  ballNum2 = Math.floor(random(4)) + 1;
  if(ballNum2  == 1){
    return color('#FF0000');
  }
  if(ballNum2 == 2){
    return color('#FFFF00');
  }
  if(ballNum2 == 3){
    return color('#0000FF');
  }
  if(ballNum2 == 4){
    return color('#00FF00');
  }
}

function blackModeOn(){
  if(score >= blackMark*500){
    blackMark++;
    if(blackMode == 0){
      blackMode += 200;
      powerupPlay();
    }
  }
  if(blackMode > 1){
    randomColor1 = color('#000000');
    randomColor2 = color('#000000');
    blackMode--;
    if(blackMode == 1){
      randomColor2 = colorGenerate();
    }
  }
}

function summonBricks() {
  let arr = [];
  let randomN;
  for(i = 0 ; i < 4 ; i++){
    randomN = Math.floor(random(4))+1;
    bricks[i].unshift(randomN);
  }
}

function drawBricks() {
  let brickColor;
  for(let i = 0 ; i < 4 ; i++){
    for(let j = 0 ; j < bricks[i].length ; j++){
      brickColor = brickColorSet(bricks[i][j]);
      if(brickColor != 0){
        push();
        fill(brickColor);
        stroke(255);
        strokeWeight(3);
        rect(i*250, j*80, 250, 80);
        fill(255);
        quad(i*250+90, j*80, i*250+140, j*80,
             i*250+100, (j+1)*80, i*250+50, (j+1)*80);
        pop();
      }
    }
  }
}

function brickColorSet(n){
  if(n == 1) return color('#FF0000');
  if(n == 2) return color('#FFFF00');
  if(n == 3) return color('#0000FF');
  if(n == 4) return color('#00FF00');
  return 0;
}

function brickHitbox(){
  let brickNum = -1, t = 0;
  for(let i = 0 ; i < 4 ; i++){
    for(let j = 0 ; j < bricks[i].length ; j++){
      t = ballBrickContact(i,j);
      if(t != 0 && bricks[i][j] != 0){
        brickNum = bricks[i][j];
        if(brickNum == ballNum1 || blackMode > 0){
          explodeBrick(i, j, brickColorSet(bricks[i][j]));
          bricks[i][j] = 0;
          score += 100;
          breakPlay();
        }
        else if(t == 1){
          yDir = abs(yDir);
        }
        else if(t == 2){
          yDir = -abs(yDir);
        }
        else if(t == 3){
          xDir = -abs(xDir);
        }
        else if(t == 4){
          xDir = abs(xDir);
        }
        else if(t == 5){
          yDir = -abs(yDir);
          xDir = -abs(xDir);
        }
        else if(t == 6){
          yDir = -abs(yDir);
          xDir = abs(xDir);
        }
        else if(t == 7){
          yDir = abs(yDir);
          xDir = -abs(xDir);
        }
        else if(t == 8){
          yDir = abs(yDir);
          xDir = abs(xDir);
        }
      }
    }
  }
}


function ballBrickContact(i, j){
  let brickX = i*250;
  let brickY = j*80;
  //밑변
  if(xPos >= brickX && xPos <= brickX+250 && yPos - diam/2 - speed <= brickY+80) return 1;
  //윗변
  else if(xPos >= brickX && xPos <= brickX+250 && yPos + diam/2 + speed >= brickY && yPos - diam/2 < brickY && yDir > 0) return 2;
  //왼쪽 변
  else if(yPos >= brickY && yPos <= brickY + 80 && xPos + diam/2 + speed >= brickX && xPos <= brickX) return 3;
  //오른쪽 변
  else if(yPos >= brickY && yPos <= brickY + 80 && xPos - diam/2 <= brickX + 250 && xPos >= brickX + 250) return 4;
  //왼쪽 위 꼭직점
  else if(dist(xPos, yPos, brickX, brickY)-speed <= diam/2) return 5;
  //오른쪽 위 꼭짓점
  else if(dist(xPos, yPos, brickX + 250, brickY + 80)-speed <= diam/2) return 6;
  //왼쪽 아래 꼭짓점
  else if(dist(xPos, yPos, brickX, brickY + 80)-speed <= diam/2) return 7;
  //오른쪽 아래 꼭짓점
  else if(dist(xPos, yPos, brickX + 250, brickY + 80)-speed <= diam/2) return 8;
  return 0;
}

function speedUp(){
  if(count % 4 == 0 && count != 0){
    speed = 15 + Math.floor(count/4)*4;
  }
}