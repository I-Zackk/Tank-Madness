function createFloatingDamageNumber(x,y,damage,enemyIndex){
  this.x = x + random(-20,20)
  this.y = y - 30
  this.size = 30
  this.angle = angle(this.x,this.y,enemies[enemyIndex].x,enemies[enemyIndex].y)+270
  this.timeUntilDisappear = 1 //Seconds
  this.frameLife = 30
  this.markedForDeletion = false
  this.cooldown = 30
  
  this.show = function(){
    push()
    
    translate(cameraX(this.x),cameraY(this.y))
    //rotate(this.angle)
    textSize(this.size/2)
    stroke(0,0,0,255*(this.frameLife/30))
    strokeWeight(2)
    fill(255,225,0,255*(this.frameLife/30))
    textFont(font);
    text(damage,0,0)
    
    pop()
  }
  
  this.update = function(){
    if(this.cooldown>0){
      this.cooldown--
    } else {
      this.frameLife--
      if(this.frameLife==0){
        this.markedForDeletion = true
      }
    }
  }
}