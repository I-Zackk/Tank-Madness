var createExperienceOrb = function(x,y){
  this.x = x + random(-20,20)
  this.y = y + random(-20,20)
  this.size=10
  this.speed = 4+tank.speed
  this.rotation = angle(this.x,this.y,tank.x,tank.y)
  this.value = 1
  this.markedForDeletion = false
  
  this.show = function(){
    push()
    translate(cameraX(this.x),cameraY(this.y))
    
    strokeWeight(1)
    stroke("black")
    fill("skyblue")
    rotate(this.rotation)
    square(-this.size/2,-this.size/2,this.size)
    
    pop()
  }
  
  this.move = function(){
    if(distance(this.x,this.y,tank.x,tank.y) <= 100){
      this.x += this.speed*cos(this.rotation)
      this.y += this.speed*sin(this.rotation)
      
      if(distance(this.x,this.y,tank.x,tank.y) <= tank.size/2 + this.size/2){
        this.markedForDeletion = true
        tank.experience += this.value
        gameScore++
      }
    }
  }
  
  this.update = function(){
    if(distance(this.x,this.y,tank.x,tank.y) <= 100){
      this.rotation = angle(this.x,this.y,tank.x,tank.y)
    }
  }
}