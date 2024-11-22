let skidmarksList = []

let gameState = "mainMenu" //Different gameStates: mainMenu, gameOver, started, paused, tutorial, cutscene, gameSettings, menuSettings

var enemies = []

var bullets = []

var enemyBullets = []

var explosions = []

var enemyExplosions = []

var experienceOrbs = []

var floatingDamageNumbers = []

var arrows = []

var skipCutscene = false;

var voiceline = 1

var tutVoiceline = 1

var currentSong;

var tempStartX;

var tempStartY;

var gameScore = 0;

var enemiesAlive = 0;

var spread

function setup() {
  
  console.log("Press E to spawn an enemy, hold C to select an area of enemies to target")
  
  currentSong = menuSong1

  //Create the canvas and chagne the angle mode to degrees instead of radians.
  if(windowHeight>windowWidth){
    createCanvas(windowWidth, windowWidth)
  } else {
    createCanvas(windowHeight, windowHeight)
  }
  angleMode(DEGREES)
  
  levelBar.x = width/2

  //Set the position of the minimap at the bottom right corner
  minimap.x = width-minimap.size/2-20
  minimap.y = height-minimap.size/2-20
  
  //Set the position of the players tank to the middle of the canvas.
  tank.x = width/2
  tank.y = height/2
  
  //Sets the volume of the tank firing sound effect so it doesnt blast your eardrums away (1.0 is max)
  tank_firing_sound.setVolume(1)
  tank_moving_sound.setVolume(0.15)
}

var tank_firing_sound;
var tank_moving_sound;
var tankbg;
var commander;
var voiceline1;
var voiceline2;
var voiceline3;
var voiceline4;
var voiceline5;
var voiceline6;
var font;
var menuSong1;
var menuSong2;
var gameSong1;
var gameSong2;
var gameSong3;
var gameSong4;
var tutorial1; //welcome to training
var tutorial2; //map
var tutorial3; //player
var tutorial4; //dumbass
var tutorial5; //movement "w,a,s,d"
var tutorial6; //shoot the enemy
var tutorial7; //reload bar
var tutorial8; //"G" change camera mode
var tutorial9; //"C" target the enemies
var tutorial10; //done

function preload(){
  soundFormats("mp3", "wav");
  tank_firing_sound = loadSound("sounds/sound effects/tank_firing.mp3");
  tank_moving_sound = loadSound("sounds/sound effects/tank_moving.mp3");
  tankbg = loadImage("scripts/assets/cartoonstyletank.png");
  commander = loadImage("scripts/assets/aicommander.png");
  voiceline1 = loadSound("sounds/voice lines/voiceline1.wav");
  voiceline2 = loadSound("sounds/voice lines/voiceline2.wav");
  voiceline3 = loadSound("sounds/voice lines/voiceline3.wav");
  voiceline4 = loadSound("sounds/voice lines/voiceline4.wav");
  voiceline5 = loadSound("sounds/voice lines/voiceline5.wav");
  voiceline6 = loadSound("sounds/voice lines/voiceline6.wav");
  font = loadFont("scripts/assets/BruceForeverRegular-X3jd2.ttf");
  menuSong1 = loadSound("sounds/music/menuSong1.mp3");
  menuSong2 = loadSound("sounds/music/menuSong2.mp3");
  gameSong1 = loadSound("sounds/music/gameSong1.mp3");
  gameSong2 = loadSound("sounds/music/gameSong2.mp3");
  gameSong3 = loadSound("sounds/music/gameSong3.mp3");
  gameSong4 = loadSound("sounds/music/gameSong4.mp3");
  tutorial1 = loadSound("sounds/voice lines/tutorial1.wav");
  tutorial2 = loadSound("sounds/voice lines/tutorial2.wav");
  tutorial3 = loadSound("sounds/voice lines/tutorial3.wav");
  tutorial4 = loadSound("sounds/voice lines/tutorial4.wav");
  tutorial5 = loadSound("sounds/voice lines/tutorial5.wav");
  tutorial6 = loadSound("sounds/voice lines/tutorial6.wav");
  tutorial7 = loadSound("sounds/voice lines/tutorial7.wav");
  tutorial8 = loadSound("sounds/voice lines/tutorial8.wav");
  tutorial9 = loadSound("sounds/voice lines/tutorial9.wav");
  tutorial10 = loadSound("sounds/voice lines/tutorial10.wav");
}

function draw() { //The frameRate of the draw() function is 60fps
  //Reset the canvas each frame by filling the canvas with a color.
  background("rgb(15,92,15)");
  
  
  if(gameState == "menuSettings"){

  } else if(gameState == "gameSettings"){

  } else if(gameState == "paused"){

    //Draw the skidmarks in the skidmarksList array
    for(let i = 0; i < skidmarksList.length; i++){
      skidmarksList[i].show()
    }

    //Draw all the enemies to the screen
    for(let i = 0; i < enemies.length; i++){
      if(!enemies[i].alive){
        enemies[i].show()
      }
    }
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].alive){
        enemies[i].show()
      }
    }
    
    for(let i = 0; i < arrows.length; i++){
      arrows[i].show()
    }  

    //Draw the player tank on to the screen.
    tank.show()

    //Draw every explosion on the screen
    for(let i = 0; i < explosions.length; i++){
      explosions[i].show()
    }

    //Draw every enemy explosion on the screen
    for(let i = 0; i < enemyExplosions.length; i++){
      enemyExplosions[i].show()
    }

    //Draw each bullet on the screen
    for(let i = 0; i < bullets.length; i++){
      bullets[i].show()
    }

    //Draw each enemy bullet on the screen
    for(let i = 0; i < enemyBullets.length; i++){
      enemyBullets[i].show()
    }
    
    for(let i = 0; i < experienceOrbs.length; i++){
      experienceOrbs[i].show()
    }
    
    for(let i = 0; i < floatingDamageNumbers.length; i++){
      floatingDamageNumbers[i].show()
    }
    
    //Draw The Mass Targeting System Area
    if(targetingSystem.active){
      targetingSystem.show()
    }
    
    //Draw the minimap
    minimap.show()
    
    //Draw the interface bar at the bottom of the screen
    interface.show()

    push()
    fill(0,0,0,100)
    square(0,0,width)

    fill("black")
    textFont(font)
    textSize(70)
    text("Paused",width/2-textWidth("Paused")/2,150)
    pop()
    
  } else if(gameState == "mainMenu"){
    
    if(currentSong.isPlaying()){
    } else {
      currentSong.play()
    }

    push()

    textFont(font);
    image(tankbg,0,0,width,height)
    textSize(60)
    textStyle(BOLDITALIC)
    fill("black")
    text("TANK MADNESS", width/2-textWidth("TANK MADNESS")/2,120)
    
    pop()
    
    startButton.show()
    tutorialButton.show()
  
  } else if(gameState == "cutscene"){


    if(currentSong.isPlaying()){
    } else {
      currentSong.play()
    }

    tank.show()

    push()
    fill(0,0,0,150)
    square(0,0,width)

    fill("black")
    rect(0,height-150,width,150)

    image(commander,250,400,width,height)

    textFont(font);
    textSize(15)
    fill("white");
    if(voiceline == 1){
      text("Welcome to the battlefield soldier.",50,height-110)
      if(voiceline1.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(voiceline == 2){
      text("You are the only surviving subject",50,height-110)
      text("of our top-secret tank operative",50,height-80)
      text("training programme.",50,height-50)
      if(voiceline2.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(voiceline == 3){
      text("The enemies have invaded our land and",50,height-110)
      text("have exterminated all our troops,",50,height-80)
      text("you’re our last hope.",50,height-50)
      if(voiceline3.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(voiceline == 4){
      text("Oh by the way, I hear the enemies have",50,height-110)
      text("stuffed their tanks with tank upgrade",50,height-80)
      text("matter, some new soviet technology.",50,height-50)
      if(voiceline4.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(voiceline == 5){
      text("If you find some blue stuff coming out of",50,height-110)
      text("destroyed enemy tanks, try",50,height-80)
      text("and pick some up.",50,height-50)
      if(voiceline5.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(voiceline == 6){
      text("Now get out there and kill those",50,height-110)
      text("damn bastards.",50,height-80)
      if(voiceline6.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    }

    pop()

  } else if(gameState == "tutorial"){


    if(tutVoiceline >= 10){

    }

    if(tutVoiceline >= 9){


      //Arrows Code
    
    arrows = [];
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].targeted){
        if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) > width){

          let tempAngle = angle(tank.x,tank.y,enemies[i].x,enemies[i].y)
          arrows[arrows.length] = new createArrow(tempAngle)

        }
      }
    }

    //Mass Targeting System
    targetingSystem.update()


    }

    if(tutVoiceline >= 8){
      
    }

    if(tutVoiceline >= 7){
      
    }

    if(tutVoiceline >= 6){


      for(let i = 0; i < enemies.length; i++){
        enemies[i].update()
      }
      //Call the bullets.move function for each bullet
      for(let i = 0; i < bullets.length; i++){
        bullets[i].move()
      }
      //Check if any of the bullets in the bullets array have been marked for deletion and if they have; delete them
      for(let i = 0; i < bullets.length; i++){
        if(bullets[i].markedForDeletion == true){
          bullets.splice(i,1)
          i=0
        }
      }

      for(let i = 0; i < floatingDamageNumbers.length; i++){
        floatingDamageNumbers[i].update()
      }
      
      for(let i = 0; i < floatingDamageNumbers.length; i++){
        if(floatingDamageNumbers[i].markedForDeletion == true){
          floatingDamageNumbers.splice(i,1)
          i=0
        }
      }


    }

    if(tutVoiceline >= 5){


      //Call the tank.changeRotation function to update the players tanks rotation values.
      tank.changeRotation()
      //Call the tank.move function which will move the players tank if any movement keys are being pressed.
      tank.move()
      //Checks if the tank is moving and changes the tank.moving variable to true or false (Is neccessary for sound effect)
      tank.checkIfMoving()
      //Update the cameras position to the tanks new position if the cam.mode == "lockOnTank"
      cam.update()

      //Draw the skidmarks in the skidmarksList array
      for(let i = 0; i < skidmarksList.length; i++){
        skidmarksList[i].show()
      }

      //Update the skidmarksList array (if it is too long remove its last element)
      if(skidmarksList.length > 1000){
        skidmarksList.splice(0,1)
      }


    }

    if(tutVoiceline >= 4){
      
    }

    if(tutVoiceline >= 3){
      
    }

    if(tutVoiceline >= 2){
      
    }

    if(tutVoiceline >= 1){
      
    }


    if(currentSong.isPlaying()){
    } else {
      currentSong.play()
    }
    
//--------------------------------------
    
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].alive){
        enemies[i].show()
      }
    }
    
    for(let i = 0; i < arrows.length; i++){
      arrows[i].show()
    }  

    //Draw the player tank on to the screen.
    tank.show()

    //Draw every explosion on the screen
    for(let i = 0; i < explosions.length; i++){
      explosions[i].show()
    }

    //Draw each bullet on the screen
    for(let i = 0; i < bullets.length; i++){
      bullets[i].show()
    }

    
    for(let i = 0; i < floatingDamageNumbers.length; i++){
      floatingDamageNumbers[i].show()
    }
    
    //Draw The Mass Targeting System Area
    if(targetingSystem.active){
      targetingSystem.show()
    }
    
    //Draw the minimap
    minimap.show()
    
    //Draw the interface bar at the bottom of the screen
    interface.show()

    //Displays debug stats at the top left of the screen
    //showDebugText()

    //Lower all cooldown values and similar values
    if(tank.attackCooldown>0){
      tank.attackCooldown--
    }
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].hitCooldown>0){
        enemies[i].hitCooldown--
      }
    }
    if(tank.barrelRecoil>0){
      tank.barrelRecoil-=0.45
    }
    for(let i = 0; i < explosions.length; i++){
      explosions[i].explosionTimer--
    }
    for(let i = 0; i < enemyExplosions.length; i++){
      enemyExplosions[i].explosionTimer--
    }
    if(tank.invincibilityFrames > 0){
      tank.invincibilityFrames--
    }

    //Delete each explosion if their timer == 0
    for(let i = 0; i < explosions.length; i++){
      if(explosions[i].explosionTimer == 0){
        explosions.splice(i,1)
      }
    }

    //Loop the tank moving sound
    if(tank.moving){
      if(!tank_moving_sound.isLooping()){
        tank_moving_sound.loop()
      }
    }

    if(tutVoiceline == 2){
      push()

      fill("red")
      noStroke()
      let tempX = 575
      let tempY = 325
      translate(tempX,tempY)
      rotate(25)
      triangle(-40,-40,40,0,-40,40)
      rect(-120,-20,110,40)

      pop()
    }

    if(tutVoiceline == 3 || tutVoiceline == 4){
      push()

      fill("red")
      noStroke()
      let tempX = width/2-75
      let tempY = height/2-50
      translate(tempX,tempY)
      rotate(25)
      triangle(-40,-40,40,0,-40,40)
      rect(-120,-20,110,40)

      pop()
    }

    if(tutVoiceline == 7){
      push()

      fill("red")
      noStroke()
      let tempX = width/2-75
      let tempY = 600
      translate(tempX,tempY)
      rotate(65)
      triangle(-40,-40,40,0,-40,40)
      rect(-120,-20,110,40)

      pop()
    }

    fill("black")
    rect(0,height-150,width,150)

    image(commander,280,400,width,height)

    textFont(font);
    textSize(15)
    fill("white");
    if(tutVoiceline == 1){
      text("Welcome to the top-secret tank operative",30,height-110)
      text("training programme, I hope you are",30,height-80)
      text("ready for some grueling training.",30,height-50)
      if(tutorial1.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(tutVoiceline == 2){
      text("This is your map; it will display enemy",30,height-110)
      text("operatives detected by our super",30,height-80)
      text("advanced satellites.",30,height-50)
      if(tutorial2.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(tutVoiceline == 3){
      text("This is you.",30,height-110)
      if(tutorial3.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(tutVoiceline == 4){
      text("Obviously… Dumbass.",30,height-110)
      if(tutorial4.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(tutVoiceline == 5){
      text("Try moving around a bit by using",30,height-110)
      text("“W” “A” “S” and “D”.",30,height-80)
      if(tutorial5.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(tutVoiceline == 6){
      text("Great, now shoot this enemy by using",30,height-110)
      text("your cursor to aim and by pressing",30,height-80)
      text("“spacebar” to shoot.",30,height-50)
      if(tutorial6.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Complete the task to continue",75,height-20)
      }
    } else if(tutVoiceline == 7){
      text("Fantastic, this is your reload bar, once it",30,height-110)
      text("has turned fully white you can shoot again.",30,height-80)
      if(tutorial7.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    } else if(tutVoiceline == 8){
      text("Now press “G” to switch camera mode and",30,height-110)
      text("try dragging your camera around by",30,height-80)
      text("dragging the mouse.",30,height-50)
      if(tutorial8.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Complete the task to continue",75,height-20)
      }
    } else if(tutVoiceline == 9){
      text("Now try targetting this enemy by holding down",30,height-110)
      text("the “C” key and covering the enemy with the",30,height-80)
      text("selected area by moving your cursor around.",30,height-50)
      if(tutorial9.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Complete the task to continue",75,height-20)
      }
    } else if(tutVoiceline == 10){
      text("You have succesfully completed the top-secret",30,height-110)
      text("tank operative training programme. ",30,height-80)
      if(tutorial10.isPlaying()){
      } else {
        textSize(14)
        fill("gray")
        text("Press anywhere to continue",75,height-20)
      }
    }

  } else if(gameState == "started"){
    
    if(currentSong.isPlaying()){
    } else {
      if(currentSong == gameSong1){
        currentSong = gameSong2
        currentSong.play()
      } else if(currentSong == gameSong2){
        currentSong = gameSong3
        currentSong.play()
      } else if(currentSong == gameSong3){
        currentSong = gameSong4
        currentSong.play()
      } else {
        currentSong = gameSong1
        currentSong.play()
      }
    }

    tank.attackCooldownTime = tank.baseAttackCooldownTime*(1-(0.2*tank.parts[4].level))
    tank.attackDamage = tank.baseAttackDamage*(1+(0.2*tank.parts[2].level))
    tank.rotationSpeed = tank.baseRotationSpeed*(1+(0.1*tank.parts[1].level))
    tank.speed = tank.baseSpeed*(1+(0.2*tank.parts[0].level))
    tank.bulletSpeed = tank.baseBulletSpeed*(1+(0.2*tank.parts[3].level))
    tank.explosionSize = tank.baseExplosionSize*(1+(0.2*tank.parts[6].level))


    enemiesAlive = 0
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].alive){
        enemiesAlive++
      }
    }

    spawnEnemies()

    push()

    textSize(14)
    textFont(font)
    fill("black")
    text("Score: "+gameScore,10,20)

    pop()

    //Call the enemies.changeRotation and enemies.move and enemies.shoot functions to update the rotation and move all the enemies
    for(let i = 0; i < enemies.length; i++){
      //The update method will update any other variables or values that dont fit into the other methods such as the spottedPlayer variable
      enemies[i].update()
      if(enemies[i].spottedPlayer){
        enemies[i].updateRotation()
        enemies[i].move()
        enemies[i].shoot()
      }
    }

    //Arrows Code
    
    arrows = [];
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].targeted){
        if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) > width){

          let tempAngle = angle(tank.x,tank.y,enemies[i].x,enemies[i].y)
          arrows[arrows.length] = new createArrow(tempAngle)

        }
      }
    }
    
    //Call the tank.changeRotation function to update the players tanks rotation values.
    tank.changeRotation()
    //Call the tank.move function which will move the players tank if any movement keys are being pressed.
    tank.move()
    //Checks if the tank is moving and changes the tank.moving variable to true or false (Is neccessary for sound effect)
    tank.checkIfMoving()
    //Update the cameras position to the tanks new position if the cam.mode == "lockOnTank"
    cam.update()

    
    //Call the bullets.move function for each bullet
    for(let i = 0; i < bullets.length; i++){
      bullets[i].move()
    }

    //Check if any of the bullets in the bullets array have been marked for deletion and if they have; delete them
    for(let i = 0; i < bullets.length; i++){
      if(bullets[i].markedForDeletion == true){
        bullets.splice(i,1)
        i=0
      }
    }

    //Call the ememyBullets.move function for each enemy bullet
    for(let i = 0; i < enemyBullets.length; i++){
      enemyBullets[i].move()
    }

    //Check if any of the enemy bullets in the enemyBullets array have been marked for deletion and if they have; delete them
    for(let i = 0; i < enemyBullets.length; i++){
      if(enemyBullets[i].markedForDeletion == true){
        enemyBullets.splice(i,1)
        i=0
      }
    }

    //Update the skidmarksList array (if it is too long remove its last element)
    if(skidmarksList.length > 1000){
        skidmarksList.splice(0,1)
    }
    
    for(let i = 0; i < experienceOrbs.length; i++){
      experienceOrbs[i].update()
      experienceOrbs[i].move()
    }
    
    for(let i = 0; i < experienceOrbs.length; i++){
      if(experienceOrbs[i].markedForDeletion == true){
        experienceOrbs.splice(i,1)
        i=0
      }
    }
    
    for(let i = 0; i < floatingDamageNumbers.length; i++){
      floatingDamageNumbers[i].update()
    }
    
    for(let i = 0; i < floatingDamageNumbers.length; i++){
      if(floatingDamageNumbers[i].markedForDeletion == true){
        floatingDamageNumbers.splice(i,1)
        i=0
      }
    }

    //Mass Targeting System
    targetingSystem.update()
    
    //Draw the skidmarks in the skidmarksList array
    for(let i = 0; i < skidmarksList.length; i++){
      skidmarksList[i].show()
    }

    //Draw all the enemies to the screen
    for(let i = 0; i < enemies.length; i++){
      if(!enemies[i].alive){
        enemies[i].show()
      }
    }
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].alive){
        enemies[i].show()
      }
    }
    
    for(let i = 0; i < arrows.length; i++){
      arrows[i].show()
    }  

    //Draw the player tank on to the screen.
    tank.show()

    //Draw every explosion on the screen
    for(let i = 0; i < explosions.length; i++){
      explosions[i].show()
    }

    //Draw every enemy explosion on the screen
    for(let i = 0; i < enemyExplosions.length; i++){
      enemyExplosions[i].show()
    }

    //Draw each bullet on the screen
    for(let i = 0; i < bullets.length; i++){
      bullets[i].show()
    }

    //Draw each enemy bullet on the screen
    for(let i = 0; i < enemyBullets.length; i++){
      enemyBullets[i].show()
    }
    
    for(let i = 0; i < experienceOrbs.length; i++){
      experienceOrbs[i].show()
    }
    
    for(let i = 0; i < floatingDamageNumbers.length; i++){
      floatingDamageNumbers[i].show()
    }
    
    //Draw The Mass Targeting System Area
    if(targetingSystem.active){
      targetingSystem.show()
    }
    
    //Draw the minimap
    minimap.show()
    
    //Draw the interface bar at the bottom of the screen
    interface.show()

    levelBar.update();
    levelBar.show();

    //Displays debug stats at the top left of the screen
    showDebugText()

    //Lower all cooldown values and similar values
    if(tank.attackCooldown>0){
      tank.attackCooldown--
    }
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].attackCooldown>0){
        enemies[i].attackCooldown--
      }
    }
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].hitCooldown>0){
        enemies[i].hitCooldown--
      }
    }
    if(tank.barrelRecoil>0){
      tank.barrelRecoil-=0.45
    }
    for(let i = 0; i < explosions.length; i++){
      explosions[i].explosionTimer--
    }
    for(let i = 0; i < enemyExplosions.length; i++){
      enemyExplosions[i].explosionTimer--
    }
    if(tank.invincibilityFrames > 0){
      tank.invincibilityFrames--
    }

    //Delete each explosion if their timer == 0
    for(let i = 0; i < explosions.length; i++){
      if(explosions[i].explosionTimer == 0){
        explosions.splice(i,1)
      }
    }

    //Delete each enemy explosion if their timer == 0
    for(let i = 0; i < enemyExplosions.length; i++){
      if(enemyExplosions[i].explosionTimer == 0){
        enemyExplosions.splice(i,1)
      }
    }

    //Loop the tank moving sound
    if(tank.moving){
      if(!tank_moving_sound.isLooping()){
        tank_moving_sound.loop()
      }
    }
    
  } else if (gameState == "paused"){
    
    ///////////////////////////////////////////////
    
    //Draw the skidmarks in the skidmarksList array
    for(let i = 0; i < skidmarksList.length; i++){
      skidmarksList[i].show()
    }
    
    //Call the enemies.show function to draw all the enemies to the screen
    for(let i = 0; i < enemies.length; i++){
      enemies[i].show()
    }

    //Draw the player tank on to the screen.
    tank.show()

    //Draw every explosion on the screen
    for(let i = 0; i < explosions.length; i++){
      explosions[i].show()
    }

    //Draw every enemy explosion on the screen
    for(let i = 0; i < enemyExplosions.length; i++){
      enemyExplosions[i].show()
    }

    //Draw each bullet on the screen
    for(let i = 0; i < bullets.length; i++){
      bullets[i].show()
    }

    //Draw each enemy bullet on the screen
    for(let i = 0; i < enemyBullets.length; i++){
      enemyBullets[i].show()
    }
    
    ///////////////////////////////////////////////
    
    push()
    
    textStyle(BOLD)
    textSize(40)
    text("Game is paused, press escape to continue", width/2-textWidth("Game is paused, press escape to continue")/2, height/3)
    
    pop()
    
  } else if (gameState == "gameOver"){
    
    push()
    
    image(tankbg,0,0,width,height)

    push()
    fill(0,0,0,150)
    square(0,0,width)

    fill("black")
    textFont(font)
    textStyle(BOLD)
    textSize(50)
    text("Game Over", width/2-textWidth("Game Over")/2,200)
    text("Score: "+gameScore, width/2-textWidth("Score: "+gameScore)/2,250)
    fill("white")
    textSize(25)
    text("Restart by pressing (ctrl + R)", width/2-textWidth("Restart by pressing (ctrl + R)")/2,350)
    
    pop()
    
  } else if(gameState == "tutorial"){
    
    push()
    
    textSize(100)
    textStyle(BOLDITALIC)
    fill("black")
    text("TUTORIAL", width/2-textWidth("TUTORIAL")/2,height/5)
    
    pop()
    
  }
}

function showDebugText(){
  push()
  fill("black")
  noStroke()
  textFont(font)
  textSize(12)
  text("Engine (Speed) Level: "+tank.parts[0].level,10,50)
  text("Tracks (RotationSpeed) Level: "+tank.parts[1].level,10,70)
  text("Artillery (Damage) Level: "+tank.parts[2].level,10,110)
  text("Barrel (ShotSpeed) Level: "+tank.parts[3].level,10,130)
  text("Crew (ReloadSpeed) Level: "+tank.parts[4].level,10,150)
  text("Technology (AmountOfShots) Level: "+tank.parts[5].level,10,170)
  text("Explosives (ExplosionSize) Level: "+tank.parts[6].level,10,190)

  text("Tank Health: "+tank.health,10,210)
  /*
  push()
  textFont("Courier New")
  textSize(20)
  textStyle(NORMAL)
  strokeWeight(1)
  stroke("white")
  text("cam.x: "+round(cam.x),10,30)
  text("cam.y: "+round(cam.y),10,50)
  text("tank.x: "+round(tank.x),10,70)
  text("tank.y: "+round(tank.y),10,90)
  text("tank.rotation: "+round(tank.rotation),10,110)
  text("tank.rotationTarget: "+round(tank.rotationTarget),10,130)
  text("tank.attackCooldown: "+round(tank.attackCooldown),10,150)
  text("cam.transitionSpeed: "+round(cam.transitionSpeed),10,190)
  text("tank.speed: "+round(tank.speed),10,230)
  text("tank.rotationSpeed: "+round(tank.rotationSpeed),10,250)
  text("tank.barrelRotation: "+round(tank.barrelRotation),10,270)
  text("tank.health: "+round(tank.health),10,290)
  text("tank.experience: "+round(tank.experience),10,310)
  text("experienceOrbs.length: "+round(experienceOrbs.length),10,330)
  if(experienceOrbs.length>=1){
    text("experienceOrbs[0].x: "+round(experienceOrbs[0].x),10,350)
    text("experienceOrbs[0].y: "+round(experienceOrbs[0].y),10,370)
  }
  text("targetingSystem.startX: "+round(targetingSystem.startX),10,390)
  text("targetingSystem.startY: "+round(targetingSystem.startY),10,410)
  text("targetingSystem.active: "+round(targetingSystem.active),10,430)
  
  text("cam.mode: "+cam.mode,10,470)
  text("cam.x: "+round(cam.x),10,490)
  text("cam.y: "+round(cam.y),10,510)
  text("cam.transition: "+cam.transition,10,530)
  text("targetingSystem.amountOfEnemiesTargeted: "+targetingSystem.amountOfEnemiesTargeted,10,550)
  text("cam.totalEnemiesWithinBounds: "+cam.totalEnemiesWithinBounds,10,570)
  
  */
  pop()
  

}

//Changes the cameras coordinates by dragging the mouse
function mouseDragged(){
  if(gameState == "started" || tutVoiceline >= 8){
    if(cam.mode == "freeCam"){
      if(!keyIsDown(67)){ //keyCode 67 = "c"
        cam.x+=(mouseX-oldMouseX)*-1
        cam.y+=(mouseY-oldMouseY)*-1
        oldMouseX = mouseX
        oldMouseY = mouseY
        if(tutVoiceline == 8){
          if(tempStartX - cam.x < 100 || tempStartX - cam.x > 100 || tempStartY - cam.y < 100 || tempStartY - cam.y > 100){
            tutVoiceline++
            tutorial9.play()
            tutorial8.stop()
          }
        }
      }
    }
  }
}
//Keeps track of old mouse locations
function mouseMoved(){
  oldMouseX = mouseX
  oldMouseY = mouseY
}
//Turns inputed x-value into its x-value on camera
function cameraX(x){
  return x-cam.x
}
//Turns inputed y-value into its y-value on camera
function cameraY(y){
  return y-cam.y
}

function mouseReleased(){
  /*if(gameState == "cutscene"){
    if(!skipCutscene){
      if(voiceline == 0){
        voiceline = 1
        voiceline1.play()
      }
    }
  }*/
}

function mousePressed(){
  /*
  if(cam.mode == "lockOnTank"){
    enemies[enemies.length] = new createEnemy(mouseX,mouseY)
  }
 */ 

  if(gameState == "cutscene"){
    if(voiceline != 6){
      voiceline++
      if(voiceline == 2){
        voiceline2.play()
        voiceline1.stop()
      } else if(voiceline == 3){
        voiceline3.play()
        voiceline2.stop()
      } else if(voiceline == 4){
        voiceline4.play()
        voiceline3.stop()
      } else if(voiceline == 5){
        voiceline5.play()
        voiceline4.stop()
      } else if(voiceline == 6){
        voiceline6.play()
        voiceline5.stop()
      }
    } else {
      gameState = "started"
      voiceline6.stop()
      currentSong.stop()
      currentSong = floor(random(0,3))
        if(currentSong == 0){
          currentSong = gameSong1
          currentSong.play()
        } else if (currentSong == 1){
          currentSong = gameSong2
          currentSong.play()
        } else if (currentSong == 2){
          currentSong = gameSong3
          currentSong.play()
        } else if (currentSong == 3){
          currentSong = gameSong4
          currentSong.play()
        }
    }
  }
  if(gameState == "tutorial"){
    if(tutVoiceline != 10){
      if(tutVoiceline != 6 && tutVoiceline != 8 && tutVoiceline !=9 ){
        tutVoiceline++
        if(tutVoiceline == 2){
          tutorial2.play()
          tutorial1.stop()
        } else if(tutVoiceline == 3){
          tutorial3.play()
          tutorial2.stop()
        } else if(tutVoiceline == 4){
          tutorial4.play()
          tutorial3.stop()
        } else if(tutVoiceline == 5){
          tutorial5.play()
          tutorial4.stop()
        } else if(tutVoiceline == 6){
          enemies[enemies.length] = new createEnemy()
          tutorial6.play()
          tutorial5.stop()
        } else if(tutVoiceline == 7){
          tutorial7.play()
          tutorial6.stop()
        } else if(tutVoiceline == 8){
          tutorial8.play()
          tutorial7.stop()
        } else if(tutVoiceline == 9){
          tutorial9.play()
          tutorial8.stop()
        } else if(tutVoiceline == 10){
          tutorial10.play()
          tutorial9.stop()
        }
      }
    } else {
      gameState = "mainMenu"
      tank_moving_sound.stop()
      tank.x = width/2
      tank.y = height/2
      amountOfEnemiesTargeted = 0
      cam.x = 0
      cam.y = 0
      tank.barrelRotation = 0
      tank.rotation = 0
      cam.mode = "lockOnTank"
      floatingDamageNumbers.splice(0,floatingDamageNumbers.length)
      bullets.splice(0,bullets.length)
      skidmarksList.splice(0,skidmarksList.length)
      enemies.splice(0,enemies.length)
      tutorial10.stop()
      tutVoiceline=1
    }
  }

  if(mouseX > startButton.x && mouseX < startButton.x + startButton.Width && mouseY > startButton.y && mouseY < startButton.y + startButton.Height){
    if(gameState == "mainMenu"){
      if(!skipCutscene){
        gameState = "cutscene"
        currentSong.stop()
        currentSong = menuSong2
        currentSong.play()
        voiceline1.play()
      } else {
        gameState = "started"
        currentSong = floor(random(0,3))
        if(currentSong == 0){
          currentSong = gameSong1
          currentSong.play()
        } else if (currentSong == 1){
          currentSong = gameSong2
          currentSong.play()
        } else if (currentSong == 2){
          currentSong = gameSong3
          currentSong.play()
        } else if (currentSong == 3){
          currentSong = gameSong4
          currentSong.play()
        }
      }
    }
  }
  if(mouseX > tutorialButton.x && mouseX < tutorialButton.x + tutorialButton.Width && mouseY > tutorialButton.y && mouseY < tutorialButton.y + tutorialButton.Height){
    if(gameState == "mainMenu"){
      gameState = "tutorial"
      tutorial1.play()
    }
  }
}

function keyReleased(){
  if(keyCode === 67){ //C
    if(targetingSystem.active){
      targetingSystem.amountOfEnemiesTargeted = 0
      for(let i = 0; i < enemies.length; i++){
        if(enemies[i].targeted){
          enemies[i].targeted = false
        }
        if(enemies[i].massTargetHover == true){
          if(enemies[i].alive){
            enemies[i].targeted = true
            enemies[i].massTargetHover = false
            targetingSystem.amountOfEnemiesTargeted += 1
          }
        }
      }
    }
    if(targetingSystem.amountOfEnemiesTargeted >= 1){
      cam.mode = "massTargeting"
    } else {
      if(cam.mode == "massTargeting"){
        cam.mode = "lockOnTank"
        cam.transition=true
      }
    }
    targetingSystem.active = false
  }
  if(tutVoiceline == 9){
    if(targetingSystem.amountOfEnemiesTargeted >= 1){
      tutVoiceline++
      tutorial9.stop()
      tutorial10.play()
    }
  }
}

function keyPressed(){
  if(gameState == "started" || "tutorial"){
    
    if(keyCode === 67){ //C
      targetingSystem.startX = mouseX
      targetingSystem.startY = mouseY
      targetingSystem.secondX = mouseX
      targetingSystem.secondY = mouseY
      targetingSystem.active = true
    }
    
    //Change the camera mode
    if(gameState == "started" || tutVoiceline >= 8){
      if(keyCode === 71){ //G
        if(tutVoiceline == 8){
          tempStartX = cam.x
          tempStartY = cam.y
        }
        if(cam.mode=="lockOnTank"){
          cam.mode = "freeCam"
        } else {
          cam.mode = "lockOnTank"
          cam.transition = true
          for(let i = 0; i < enemies.length; i++){
            enemies[i].targeted = false
          }
        }
      }
    }

    if(keyCode === 38){ //UP_ARROW
      tank.speed++
    }
    if(keyCode === 40){ //DOWN_ARROW
      tank.speed--
    }
    if(keyCode === 39){ //RIGHT_ARROW
      tank.rotationSpeed++
    }
    if(keyCode === 37){ //LEFT_ARROW
      tank.rotationSpeed--
    }

    //Shooting code
    if(keyCode === 32){ //Spacebar
      if(gameState == "started" || tutVoiceline >= 6){
        if(tank.attackCooldown <= 0){
          tank.attackCooldown = secondsToFrames(tank.attackCooldownTime)
          spread = tank.parts[5].level*10
          for(let i = 0; i <= tank.parts[5].level; i++){
            bullets[bullets.length] = new createBullet(-spread/2+i*(spread/(tank.parts[5].level+1)))
          }
          tank.barrelRecoil = 5
          tank_firing_sound.play()
        }
        if(gameState == "tutorial" && tutVoiceline == 6){
          tutVoiceline++
          tutorial7.play()
          tutorial6.stop()
        }
      }
    }
  }

  if(keyCode === 27){ //esc
    if(gameState == "started"){
      gameState = "paused"
    } else if(gameState == "paused"){
      gameState = "started"
    }
  }
}

function windowResized(){
  //Update the size of canvas
  if(windowHeight>windowWidth){
    resizeCanvas(windowWidth, windowWidth)
  } else {
    resizeCanvas(windowHeight, windowHeight)
  }
  
  //Update the position of the minimap at the bottom right corner
  minimap.x = width-minimap.size/2-20
  minimap.y = height-minimap.size/2-20
}

function secondsToFrames(seconds){ //This function turns the inputed seconds to that amount of time but in frames
  return seconds*60 //Since the frames per second is 60
}

function angle(x1,y1,x2,y2){
  if(Math.atan2(y2-y1,x2-x1)*180/Math.PI < 0){
    return Math.atan2(y2-y1,x2-x1)*180/Math.PI+360;
  } else {
    return Math.atan2(y2-y1,x2-x1)*180/Math.PI;
  }
}

function distance(x1,y1,x2,y2){
  return sqrt((x2-x1)**2+(y2-y1)**2);
}



/* NOTES:

KANSKE GÖR SÅ ATT SPELAREN INTE MANUELLT TARGETAR FIENDER UTAN FIENDER BLIR AUTOMATISKT TARGETADE NÄR DEM SER SPELAREN.

Add a settings menu and add a colorpicker for the players tank in the settings, add music (Viggo) and a volume slider in the settings.

Supply crates

Add a turbo juice meter that you can use to give yourself a boost so that you rotate faster, drive faster and shoot cooldown is reduced

Create a camera lock on system where the camera locks on to the enemy closest to your mouse when pressing the lock on button. When the camera is locked on to an enemy the camera will center itself in the middle between the enemy and the player until the enemy gets off screen, when the enemy gets off screen the camera will transition to the player and an arrow/indicator will be displayed pointing you towards the enemy until it is inside the specified distance again and the camera can return to centering itself inbetween the player and the locked on enemy.
(Make it so that the player can hold a button example "c" and then drag to select an area of enemies that will be locked on to)

Add different types of enemy tanks, maybe a smaller tank that moves faster than other tanks and constantly goes around the player

Add a area targeting system where the player can select an area and target all the tanks inside that area

Create a tutorial from the main menu where the tutorial walks the player throguh all the mechanics and camera controls.

create a dash ability that creates afterimages

List:
8. Add objects such as rocks and crates
9. Add a shop/upgrade station
10. Create some sort of objective/lore to the game. (maybe make cutscene of some sort)
*/

/* NEXT THINGS TO DO: 
* Targeting system/mass targeting system (camera lock on system), 
* Add missing sound effects, 
* Make it so that you can zoom in and out on the minimap
*/