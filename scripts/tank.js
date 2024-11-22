var tank = {
  //General variables:
  x:0,
  y:0,
  baseSpeed:3,
  speed:3, //Normal: 3
  baseHealth:200, //normal: 100
  health:200,
  experience:0,
  level:0,
  
  //Rotation related variables:
  rotation:0,
  baseRotationSpeed:4,
  rotationSpeed:4, //Normal: 3
  rotationTarget:0,
  barrelRotation:0,
  
  //Gameplay mechanic related variables:
  hitCooldownTime:1, //Normal: 1
  baseAttackCooldownTime:1,
  attackCooldownTime:2, //Normal: 2
  attackCooldown:0,
  baseAttackDamage:15,
  attackDamage:10,
  moving:false,
  invincibilityFrames:0,
  bulletSpeed:15,
  baseBulletSpeed:15,
  explosionSize:70,
  baseExplosionSize:70,
  
  //Drawing variables:
  size:50, //Normal: 50
  fill_color:"green", //Normal: "green"
  barrelLength:45, //Normal: 45
  barrelWidth:10, //Normal: 10
  barrelRecoil:0,
  stroke_weight:2, //Normal: 2.5
  stroke_color:"black", //Normal: "black"

  //Upgradeable parts
  //engine:Each level increases speed by 20%. [0]
  //tracks:Each level increases rotation speed by 20%. [1]
  //armour:Each level increases maximum health by 20%. [2]
  //artillery:Each level increases damage by 20%. [3]
  //barrel:Each level increases speed of your shots by 20%. [4]
  //crew:Each level increases speed of your reload by 20%. [5]
  //technology:Each level increases amount of shots fired by 1. [6]
  //explosives:Each level increases explosion size of shots by 20%. [7]

  parts:[
    engine = {level:1},
    tracks = {level:1},
    artillery = {level:1},
    barrel = {level:1},
    crew = {level:1},
    technology = {level:0},
    explosives = {level:2},
  ],

  
  show: function(){
    push()
    translate(cameraX(tank.x),cameraY(tank.y))

    //Tank Wheels Left
    push()
    rotate(tank.rotation)
    stroke(tank.stroke_color)
    strokeWeight(tank.stroke_weight)
    fill(tank.fill_color)
    rect(0-tank.size/2,0-tank.size/2,0+tank.size,0+tank.size/2,   5,5,0,0)
    pop()
    
    //Tank Wheels Right
    push()
    rotate(tank.rotation)
    stroke(tank.stroke_color)
    strokeWeight(tank.stroke_weight)
    fill(tank.fill_color)
    rect(0-tank.size/2,0,0+tank.size,0+tank.size/2,   0,0,5,5)
    pop()
    
    //Tank Track Cover Left
    push()
    rotate(tank.rotation)
    stroke(tank.stroke_color)
    strokeWeight(tank.stroke_weight)
    fill(tank.fill_color)
    rect(-tank.size/2-tank.size/16,-tank.size/2,tank.size+tank.size/8+tank.size/16,tank.size/4, 2.5, 2.5, 2.5, 2.5)
    rect(-tank.size/2-tank.size/16,-tank.size/2+tank.size/8,tank.size/8,tank.size/8,2,2,2,2)
    rect(-tank.size/2-tank.size/16+tank.size+tank.size/8+tank.size/16-tank.size/8,-tank.size/2+tank.size/8,tank.size/8,tank.size/8,2,2,2,2)
    pop()
    
    //Tank Track Cover Right
    push()
    rotate(tank.rotation)
    stroke(tank.stroke_color)
    strokeWeight(tank.stroke_weight)
    fill(tank.fill_color)
    rect(-tank.size/2-tank.size/16,+tank.size/2-tank.size/4,tank.size+tank.size/8+tank.size/16,tank.size/4, 2.5, 2.5, 2.5, 2.5)
    rect(-tank.size/2-tank.size/16,+tank.size/2-tank.size/4,tank.size/8,tank.size/8,2,2,2,2)
    rect(-tank.size/2-tank.size/16+tank.size+tank.size/8+tank.size/16-tank.size/8,+tank.size/2-tank.size/4,tank.size/8,tank.size/8,2,2,2,2)
    pop()
    
    //Tank Barrel
    push()
    rotate(tank.barrelRotation)
    stroke(tank.stroke_color)
    strokeWeight(tank.stroke_weight)
    fill(tank.fill_color)
    rect(0,0-tank.barrelWidth/2,0+tank.barrelLength-tank.barrelRecoil,0+tank.barrelWidth,3,3,3,3)
    rect(tank.barrelLength-tank.barrelRecoil,0-tank.barrelWidth*5/8,tank.barrelWidth*5/8,tank.barrelWidth*10/8, 2,2,2,2)
    pop()
    
    //Tank Head
    push()
    rotate(tank.barrelRotation)
    stroke(tank.stroke_color)
    strokeWeight(tank.stroke_weight)
    fill(tank.fill_color)
    circle(0,0,tank.size*0.7)
    rect(tank.size/32,0,tank.size/7,tank.size/6, 1.5,1.5,1.5,1.5)
    pop()

    //Health Bar
    push()
    fill(0,200,0)
    rect(-25,35,50*(this.health/this.baseHealth),10,10,10,10,10)
    pop()
    
    pop()
  },
  
  shoot: function(){
    
  },
  
  checkIfMoving: function(){
    if(!keyIsDown(87) && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68) && tank.rotation == tank.rotationTarget){
      tank.moving = false
      tank_moving_sound.stop()
    } else {
      tank.moving = true
    }
  },
  
  changeRotation: function(){
    //Update the players tank barrel rotation to face the mouse
    tank.barrelRotation=angle(tank.x,tank.y,mouseX + cam.x,mouseY + cam.y) // + cam.x and + cam.y is neccesary because the mouse's coordinates aren't relative to the camera but the tank is.
    
    //Update the players tank rotation
    if(tank.rotation !== tank.rotationTarget){
      if(tank.rotation > 180){
        if(tank.rotation < tank.rotationTarget){
          //rotate right
          tank.rotation += tank.rotationSpeed
          if(tank.rotation > 360){
            tank.rotation = tank.rotation - 360
          }
          //check if tank.rotation went over tank.rotationTarget
          if(tank.rotation > tank.rotationTarget){
            tank.rotation = tank.rotationTarget
          }
        } else if(tank.rotation - tank.rotationTarget < 180){
          //rotate left
          tank.rotation -= tank.rotationSpeed
          if(tank.rotation < 0){
            tank.rotation = tank.rotation + 360
          }
          //check if tank.rotation went over tank.rotationTarget
          if(tank.rotation < tank.rotationTarget){
            tank.rotation = tank.rotationTarget
          }
        } else {
          //rotate right
          tank.rotation += tank.rotationSpeed
          if(tank.rotation > 360){
            tank.rotation = tank.rotation - 360
          }
          //check if tank.rotation went over tank.rotationTarget
          if(tank.rotation - tank.rotationTarget < 10){
            if(tank.rotation > tank.rotationTarget){
              tank.rotation = tank.rotationTarget
            }
          }
        }
      } else if(tank.rotation < 180){
        if(tank.rotation > tank.rotationTarget){
          //rotate left
          tank.rotation -= tank.rotationSpeed
          if(tank.rotation < 0){
            tank.rotation = tank.rotation + 360
          }
          //check if tank.rotation went over tank.rotationTarget
          if(tank.rotation < tank.rotationTarget){
            tank.rotation = tank.rotationTarget
          }
        } else if(tank.rotation - tank.rotationTarget >= -180){
          //rotate right
          tank.rotation += tank.rotationSpeed
          if(tank.rotation > 360){
            tank.rotation = tank.rotation - 360
          }
          //check if tank.rotation went over tank.rotationTarget
          if(tank.rotation > tank.rotationTarget){
            tank.rotation = tank.rotationTarget
          }
        } else {
          //rotate left
          tank.rotation -= tank.rotationSpeed
          if(tank.rotation < 0){
            tank.rotation = tank.rotation + 360
          }
          //check if tank.rotation went over tank.rotationTarget
          if(tank.rotation - tank.rotationTarget > -10){
            if(tank.rotation < tank.rotationTarget){
              tank.rotation = tank.rotationTarget
            }
          }
        }
      } else if(tank.rotation - tank.rotationTarget < 0){ //If the code gets to this point tank.rotation == 180 since all the values when tank.rotation > 180 and when tank.rotation < 180 have already been tested
        //rotate right
        tank.rotation += tank.rotationSpeed
        if(tank.rotation > 360){
            tank.rotation = tank.rotation - 360
          }
        //check if tank.rotation went over tank.rotationTarget
        if(tank.rotation > tank.rotationTarget){
            tank.rotation = tank.rotationTarget
        }
      } else if(tank.rotation - tank.rotationTarget > 0){
        //rotate left
        tank.rotation -= tank.rotationSpeed
        if(tank.rotation < 0){
            tank.rotation = tank.rotation + 360
          }
        //check if tank.rotation went over tank.rotationTarget
        if(tank.rotation < tank.rotationTarget){
            tank.rotation = tank.rotationTarget
        }
      } else {
        //rotate left
        tank.rotation -= tank.rotationSpeed
        if(tank.rotation < 0){
            tank.rotation = tank.rotation + 360
          }
        //check if tank.rotation went over tank.rotationTarget
        if(tank.rotation < tank.rotationTarget){
            tank.rotation = tank.rotationTarget
        }
      }
    }
  },
  
  move: function(){
    if(keyIsDown(87)){ //W
      if(keyIsDown(65)){ //A
        tank.rotationTarget = 225
        
        tank.y += tank.speed*sin(tank.rotation)
        
        for(let i = 0; i < enemies.length; i++){
          if(!enemies[i].alive){
            if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
              enemies[i].y += tank.speed*sin(tank.rotation)
            }
          }
        }
        
        tank.x += tank.speed*cos(tank.rotation)
        
        for(let i = 0; i < enemies.length; i++){
          if(!enemies[i].alive){
            if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
              enemies[i].x += tank.speed*cos(tank.rotation)
            }
          }
        }
        
        skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
      }else{
        if(keyIsDown(68)){ //D
          tank.rotationTarget = 315
          
          tank.y += tank.speed*sin(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].y += tank.speed*sin(tank.rotation)
              }
            }
          }
          
          tank.x += tank.speed*cos(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].x += tank.speed*cos(tank.rotation)
              }
            }
          }
          
          skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
        } else {
          tank.rotationTarget = 270
          
          tank.y += tank.speed*sin(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].y += tank.speed*sin(tank.rotation)
              }
            }
          }
          
          tank.x += tank.speed*cos(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].x += tank.speed*cos(tank.rotation)
              }
            }
          }
          
          skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
        }
      }
    } else {
      if(keyIsDown(83)){ //S
        if(keyIsDown(65)){ //A
          tank.rotationTarget = 135
          
          tank.y += tank.speed*sin(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].y += tank.speed*sin(tank.rotation)
              }
            }
          }
          
          tank.x += tank.speed*cos(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].x += tank.speed*cos(tank.rotation)
              }
            }
          }
          
          skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
        }else{
          if(keyIsDown(68)){ //D
            tank.rotationTarget = 45
            
            tank.y += tank.speed*sin(tank.rotation)
            
            for(let i = 0; i < enemies.length; i++){
              if(!enemies[i].alive){
                if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                  enemies[i].y += tank.speed*sin(tank.rotation)
                }
              }
            }
            
            tank.x += tank.speed*cos(tank.rotation)
            
            for(let i = 0; i < enemies.length; i++){
              if(!enemies[i].alive){
                if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                  enemies[i].x += tank.speed*cos(tank.rotation)
                }
              }
            }
            
            skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
          } else {
            tank.rotationTarget = 90
            
            tank.y += tank.speed*sin(tank.rotation)
            
            for(let i = 0; i < enemies.length; i++){
              if(!enemies[i].alive){
                if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                  enemies[i].y += tank.speed*sin(tank.rotation)
                }
              }
            }
            
            tank.x += tank.speed*cos(tank.rotation)
            
            for(let i = 0; i < enemies.length; i++){
              if(!enemies[i].alive){
                if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                  enemies[i].x += tank.speed*cos(tank.rotation)
                }
              }
            }
            
            skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
          }
        }
      } else {
        if(keyIsDown(65)){ //A
          tank.rotationTarget = 180
          
          tank.y += tank.speed*sin(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].y += tank.speed*sin(tank.rotation)
              }
            }
          }
          
          tank.x += tank.speed*cos(tank.rotation)
          
          for(let i = 0; i < enemies.length; i++){
            if(!enemies[i].alive){
              if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                enemies[i].x += tank.speed*cos(tank.rotation)
              }
            }
          }
          
          skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
        } else {
          if(keyIsDown(68)){ //D
            tank.rotationTarget = 0
            
            tank.y += tank.speed*sin(tank.rotation)
            
            for(let i = 0; i < enemies.length; i++){
              if(!enemies[i].alive){
                if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                  enemies[i].y += tank.speed*sin(tank.rotation)
                }
              }
            }
            
            tank.x += tank.speed*cos(tank.rotation)
            
            for(let i = 0; i < enemies.length; i++){
              if(!enemies[i].alive){
                if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
                  enemies[i].x += tank.speed*cos(tank.rotation)
                }
              }
            }
            
            skidmarksList[skidmarksList.length] = new skidmark(tank.x,tank.y,tank.rotation)
          }
        }
      }
    }
    
    //Check if players tank is colliding with an enemy tank and if it is, move players tank back
    for(let i = 0; i < enemies.length; i++){
      if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) < tank.size/2+enemies[i].size/2){
        tank.y -= tank.speed*sin(tank.rotation)
        tank.x -= tank.speed*cos(tank.rotation)
      }
    }
  }
}