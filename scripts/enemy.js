function createEnemy(x,y){
  //General variables:
  if(gameState == "tutorial"){
    this.x = tank.x
    this.y = tank.y - 200
  } else {
    this.x = x
    this.y = y
  }
  this.speed = 1.5 //Normal: 1.5
  
  //Rotation related variables:
  if(gameState == "tutorial"){
    this.rotation = 90
  } else {
    this.rotation = random(0,360)
  }
  this.rotationSpeed = 3 //Normal: 3
  this.rotationTarget = 0
  if(gameState == "tutorial"){
    this.barrelRotation = 90
  } else {
    this.barrelRotation = random(0,360)
  }
  
  //Gameplay mechanic related variables:
  this.hitCooldownTime = 0.2
  this.hitCooldown = 0
  this.attackCooldownTime = 2 //Normal: 2
  this.attackCooldown = 0
  if(gameState == "tutorial"){
    this.health = 9999
  } else {
    this.health = 70
  }
  this.spottedPlayer = false
  this.experienceOrbsDropped = 5
  this.prefferedDistanceFromPlayer = 400
  this.alive = true
  this.spotted = false
  
  //Mass targeting variables
  this.targeted = false
  this.massTargetHover = false
  
  //Drawing variables:
  this.size = 50 //Normal: 50
  this.fill_color = "darkred" //Normal: "darkred"
  this.fill_color_dead = "rgb(108,0,0)"
  this.fill_color_hit = "rgb(225,120,120)"
  this.barrelLength = 45 //Normal: 40
  this.barrelWidth = 10 //Normal: 10
  this.barrelRecoil = 0
  this.stroke_weight = 1.5 //Normal: 1.5
  this.stroke_color = "black" //Normal: "black"
  
  this.show = function(){
    if(this.alive){
      push()
      translate(cameraX(this.x),cameraY(this.y))

      //Tank Wheels Left
      push()
      rotate(this.rotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      if(this.hitCooldown > 0){
        fill(this.fill_color_hit)
      } else {
        fill(this.fill_color)
      }
      rect(0-this.size/2,0-this.size/2,0+this.size,0+this.size/2,   5,5,0,0)
      pop()

      //Tank Wheels Right
      push()
      rotate(this.rotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      if(this.hitCooldown > 0){
        fill(this.fill_color_hit)
      } else {
        fill(this.fill_color)
      }
      rect(0-this.size/2,0,0+this.size,0+this.size/2,   0,0,5,5)
      pop()

      //Tank Track Cover Left
      push()
      rotate(this.rotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      if(this.hitCooldown > 0){
        fill(this.fill_color_hit)
      } else {
        fill(this.fill_color)
      }
      rect(-this.size/2-this.size/16,-this.size/2,this.size+this.size/8+this.size/16,this.size/4, 2.5, 2.5, 2.5, 2.5)
      rect(-this.size/2-this.size/16,-this.size/2+this.size/8,this.size/8,this.size/8,2,2,2,2)
      rect(-this.size/2-this.size/16+this.size+this.size/8+this.size/16-this.size/8,-this.size/2+this.size/8,this.size/8,this.size/8,2,2,2,2)
      pop()

      //Tank Track Cover Right
      push()
      rotate(this.rotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      if(this.hitCooldown > 0){
        fill(this.fill_color_hit)
      } else {
        fill(this.fill_color)
      }
      rect(-this.size/2-this.size/16,+this.size/2-this.size/4,this.size+this.size/8+this.size/16,this.size/4, 2.5, 2.5, 2.5, 2.5)
      rect(-this.size/2-this.size/16,+this.size/2-this.size/4,this.size/8,this.size/8,2,2,2,2)
      rect(-this.size/2-this.size/16+this.size+this.size/8+this.size/16-this.size/8,+this.size/2-this.size/4,this.size/8,this.size/8,2,2,2,2)
      pop()

      //Tank Barrel
      push()
      rotate(this.barrelRotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      if(this.hitCooldown > 0){
        fill(this.fill_color_hit)
      } else {
        fill(this.fill_color)
      }
      rect(0,0-this.barrelWidth/2,0+this.barrelLength-this.barrelRecoil,0+this.barrelWidth,3,3,3,3)
      rect(this.barrelLength-this.barrelRecoil,0-this.barrelWidth*5/8,this.barrelWidth*5/8,this.barrelWidth*10/8, 2,2,2,2)
      strokeWeight(3)
      stroke(this.fill_color)
      line(0+this.barrelLength-this.barrelRecoil,0-this.barrelWidth/2+2,0+this.barrelLength-this.barrelRecoil,this.barrelWidth-7)
      pop()

      //Tank Head
      push()
      rotate(this.barrelRotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      if(this.hitCooldown > 0){
        fill(this.fill_color_hit)
      } else {
        fill(this.fill_color)
      }
      circle(0,0,this.size*0.7)
      rect(this.size/32,0,this.size/7,this.size/6, 1.5,1.5,1.5,1.5)
      pop()

      pop()
      
    } else if(!this.alive){
      
      push()
      translate(cameraX(this.x),cameraY(this.y))

      //Tank Wheels Left
      push()
      rotate(this.rotation+5)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      fill(this.fill_color_dead)
      rect(0-this.size/2,0-this.size/2,0+this.size,0+this.size/2,   5,5,0,0)
      pop()

      //Tank Wheels Right
      push()
      rotate(this.rotation-5)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      fill(this.fill_color_dead)
      rect(0-this.size/2,0,0+this.size,0+this.size/2,   0,0,5,5)
      pop()

      //Tank Track Cover Left
      push()
      rotate(this.rotation+10)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      fill(this.fill_color_dead)
      rect(-this.size/2-this.size/16,-this.size/2,this.size+this.size/8+this.size/16,this.size/4, 2.5, 2.5, 2.5, 2.5)
      rect(-this.size/2-this.size/16,-this.size/2+this.size/8,this.size/8,this.size/8,2,2,2,2)
      rect(-this.size/2-this.size/16+this.size+this.size/8+this.size/16-this.size/8,-this.size/2+this.size/8,this.size/8,this.size/8,2,2,2,2)
      pop()

      //Tank Track Cover Right
      push()
      rotate(this.rotation-7)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      fill(this.fill_color_dead)
      rect(-this.size/2-this.size/16,+this.size/2-this.size/4,this.size+this.size/8+this.size/16,this.size/4, 2.5, 2.5, 2.5, 2.5)
      rect(-this.size/2-this.size/16,+this.size/2-this.size/4,this.size/8,this.size/8,2,2,2,2)
      rect(-this.size/2-this.size/16+this.size+this.size/8+this.size/16-this.size/8,+this.size/2-this.size/4,this.size/8,this.size/8,2,2,2,2)
      pop()

      //Tank Barrel
      push()
      rotate(this.barrelRotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      fill(this.fill_color_dead)
      rect(0,0-this.barrelWidth/2,0+this.barrelLength-this.barrelRecoil,0+this.barrelWidth,3,3,3,3)
      rect(this.barrelLength-this.barrelRecoil,0-this.barrelWidth*5/8,this.barrelWidth*5/8,this.barrelWidth*10/8, 2,2,2,2)
      strokeWeight(3)
      stroke(this.fill_color_dead)
      line(0+this.barrelLength-this.barrelRecoil,0-this.barrelWidth/2+2,0+this.barrelLength-this.barrelRecoil,this.barrelWidth-7)
      pop()

      //Tank Head
      push()
      rotate(this.barrelRotation)
      stroke(this.stroke_color)
      strokeWeight(this.stroke_weight)
      fill(this.fill_color_dead)
      circle(0,0,this.size*0.7)
      rect(this.size/32,0,this.size/7,this.size/6, 1.5,1.5,1.5,1.5)
      pop()

      pop()
    }
  }
  
  this.shoot = function(){
    if(this.alive){
      if(round(random(1,50))==1){
        if(this.attackCooldown == 0){
          this.attackCooldown = 60*this.attackCooldownTime
          enemyBullets[enemyBullets.length] = new createEnemyBullet(this.barrelRotation, this.barrelLength, this.barrelWidth, this.x, this.y)
        }
      }
    }
  }
  
  this.updateRotation = function(){
    if(this.alive){
      //First lets update the enemies barrelRotation to face the player
      this.barrelRotation=angle(this.x,this.y,tank.x,tank.y)

      //Then lets update the enemies rotationTarget
      if(distance(tank.x,tank.y,this.x,this.y) > this.prefferedDistanceFromPlayer+30){
        this.rotationTarget = angle(this.x,this.y,tank.x,tank.y)
      } else  if(distance(tank.x,tank.y,this.x,this.y) < this.prefferedDistanceFromPlayer-30){
        this.rotationTarget = angle(this.x,this.y,tank.x,tank.y)-180
        if(this.rotationTarget < 0){
          this.rotationTarget=360+this.rotationTarget //Makes sure the angle is always positive between 0 and 360
        }
      }

      //Then lets update the enemies rotation
      if(this.rotation !== this.rotationTarget){
        if(this.rotation > 180){
          if(this.rotation < this.rotationTarget){
            //rotate right
            this.rotation += this.rotationSpeed
            if(this.rotation > 360){
              this.rotation = this.rotation - 360
            }
            //check if this.rotation went over this.rotationTarget
            if(this.rotation > this.rotationTarget){
              this.rotation = this.rotationTarget
            }
          } else if(this.rotation - this.rotationTarget < 180){
            //rotate left
            this.rotation -= this.rotationSpeed
            if(this.rotation < 0){
              this.rotation = this.rotation + 360
            }
            //check if this.rotation went over this.rotationTarget
            if(this.rotation < this.rotationTarget){
              this.rotation = this.rotationTarget
            }
          } else {
            //rotate right
            this.rotation += this.rotationSpeed
            if(this.rotation > 360){
              this.rotation = this.rotation - 360
            }
            //check if this.rotation went over this.rotationTarget
            if(this.rotation - this.rotationTarget < 10){
              if(this.rotation > this.rotationTarget){
                this.rotation = this.rotationTarget
              }
            }
          }
        } else if(this.rotation < 180){
          if(this.rotation > this.rotationTarget){
            //rotate left
            this.rotation -= this.rotationSpeed
            if(this.rotation < 0){
              this.rotation = this.rotation + 360
            }
            //check if this.rotation went over this.rotationTarget
            if(this.rotation < this.rotationTarget){
              this.rotation = this.rotationTarget
            }
          } else if(this.rotation - this.rotationTarget >= -180){
            //rotate right
            this.rotation += this.rotationSpeed
            if(this.rotation > 360){
              this.rotation = this.rotation - 360
            }
            //check if this.rotation went over this.rotationTarget
            if(this.rotation > this.rotationTarget){
              this.rotation = this.rotationTarget
            }
          } else {
            //rotate left
            this.rotation -= this.rotationSpeed
            if(this.rotation < 0){
              this.rotation = this.rotation + 360
            }
            //check if this.rotation went over this.rotationTarget
            if(this.rotation - this.rotationTarget > -10){
              if(this.rotation < this.rotationTarget){
                this.rotation = this.rotationTarget
              }
            }
          }
        } else if(this.rotation - this.rotationTarget < 0){ //If the code gets to this point this.rotation == 180 since all the values when this.rotation > 180 and when this.rotation < 180 have already been tested
          //rotate right
          this.rotation += this.rotationSpeed
          if(this.rotation > 360){
              this.rotation = this.rotation - 360
            }
          //check if this.rotation went over this.rotationTarget
          if(this.rotation > this.rotationTarget){
              this.rotation = this.rotationTarget
          }
        } else if(this.rotation - this.rotationTarget > 0){
          //rotate left
          this.rotation -= this.rotationSpeed
          if(this.rotation < 0){
              this.rotation = this.rotation + 360
            }
          //check if this.rotation went over this.rotationTarget
          if(this.rotation < this.rotationTarget){
              this.rotation = this.rotationTarget
          }
        } else {
          //rotate left
          this.rotation -= this.rotationSpeed
          if(this.rotation < 0){
              this.rotation = this.rotation + 360
            }
          //check if this.rotation went over this.rotationTarget
          if(this.rotation < this.rotationTarget){
              this.rotation = this.rotationTarget
          }
        }
      }
    }
  }
  
  this.move = function(){
    if(this.alive){
      if(distance(this.x,this.y,tank.x,tank.y) > this.prefferedDistanceFromPlayer - 30 && distance(this.x,this.y,tank.x,tank.y) < this.prefferedDistanceFromPlayer + 30){
        
      } else {
        this.y += this.speed*sin(this.rotation)
        this.x += this.speed*cos(this.rotation)
      }

      //Check if enemy is colliding with the player tank and if it is, move enemy back
      if(distance(tank.x,tank.y,this.x,this.y) < tank.size/2+this.size/2){
        this.y -= this.speed*sin(this.rotation)
        this.x -= this.speed*cos(this.rotation)
      }
      //Check if enemy is colliding with another enemy and if it is, move enemy back
      for(let i = 0; i < enemies.length; i++){
        if(enemies[i].alive){
          if(enemies[i].x !== this.x && enemies[i].y !== this.y){
            if(distance(this.x,this.y,enemies[i].x,enemies[i].y) < this.size/2+enemies[i].size/2){
              this.y -= this.speed*sin(this.rotation)
              this.x -= this.speed*cos(this.rotation)
            }
          }
        }
      }
    }
  }
  
  this.update = function(){
    if(this.alive){
      if(this.massTargetHover){
        this.fill_color = "rgb(186,125,125)"
      } else {
        this.fill_color = "darkred"
      }
      if(this.targeted){
        this.stroke_weight = 4 
        this.stroke_color = "black" 
      } else {
        this.stroke_weight = 1.5
        this.stroke_color = "black"
      }
    }
    
    if(this.alive){
      if(distance(this.x,this.y,tank.x,tank.y) <= 1400/2){
        this.spottedPlayer = true
      }
    }
    
    if(this.x <= cam.x+width && this.x >= cam.x && this.y <= cam.y + height && this.y >= cam.y){
      this.spotted = true
    }
  }
}