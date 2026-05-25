function preload(){
  bgm = loadSound('assets/block_breaker_music.mp3');
  powerupSound = loadSound('assets/powerup_sound.mp3');
  gameoverSound = loadSound('assets/gameover_music.mp3');
  breakSound = loadSound('assets/break_sound.mp3');
}

function bgmplay(){
  bgm.play();
}

function powerupPlay(){
  powerupSound.play();
}

function gameoverPlay(){
  if(gameOver == 1 && gameOverSwitch == 1){
    bgm.stop();
    gameoverSound.play();
    gameOverSwitch = 0;
  }
}

function breakPlay(){
  breakSound.play();
}