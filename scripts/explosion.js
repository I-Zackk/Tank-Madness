function createExplosion(x,y,size){
  this.x = x
  this.y = y
  this.size = tank.explosionSize
  this.damage = tank.attackDamage
  this.explosionTimer = 25 //25
  
  //Since the enemies in the explosion should only take damage the frame the explosion is created and not continually, i will write the damage code here instead of in a method/function since this code is only run once when the explosion is created.
  for(let i = 0; i < enemies.length; i++){
    if(distance(this.x,this.y,enemies[i].x,enemies[i].y) < this.size/2 + enemies[i].size/2){
      if(enemies[i].alive){
        enemies[i].spottedPlayer = true
        enemies[i].health -= this.damage
        enemies[i].hitCooldown = secondsToFrames(enemies[i].hitCooldownTime)
        floatingDamageNumbers[floatingDamageNumbers.length] = new createFloatingDamageNumber(enemies[i].x,enemies[i].y,this.damage,i)
        if(enemies[i].health <= 0){
          for(let g = 0; g < enemies[i].experienceOrbsDropped; g++){
            experienceOrbs[experienceOrbs.length] = new createExperienceOrb(enemies[i].x,enemies[i].y) //Creates three experience orbs at the dead enemies place. 
          }
          enemies[i].alive = false
          gameScore+=25
          if(enemies[i].targeted){
            enemies[i].targeted=false
            targetingSystem.amountOfEnemiesTargeted -= 1
            if(targetingSystem.amountOfEnemiesTargeted == 0){
              cam.mode = "lockOnTank"
              cam.transition = true
            }
          }
          enemies[i].stroke_weight = 1.5
        }
      }
    }
  }
  
  this.show = function(){
    push()
    translate(cameraX(this.x),cameraY(this.y))
    
    stroke(227,100,0,(1000/75 * this.explosionTimer))
    strokeWeight(7)
    fill(255,140,0,(1000/75 * this.explosionTimer))
    circle(0, 0, this.size)
    
    pop()
  }
}