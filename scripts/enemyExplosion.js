function createEnemyExplosion(x,y,size,damage){
  this.x = x
  this.y = y
  this.size = size
  this.damage = damage
  this.explosionTimer = 25 //25
  
  //Since the player should only take damage the frame the explosion is created and not continually, i will write the damage code here instead of in a method/function since this code is only run once when the explosion is created.
  if(distance(this.x,this.y,tank.x,tank.y) < this.size/2 + tank.size/2){
    //Add damage code here
    if(tank.invincibilityFrames == 0){
      tank.health -= this.damage
      console.log("hello")
      tank.invincibilityFrames = secondsToFrames(0.5)
      
      if(tank.health <= 0){
        gameState = "gameOver"
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