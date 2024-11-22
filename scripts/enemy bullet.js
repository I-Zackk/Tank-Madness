function createEnemyBullet(barrelRotation, barrelLength, barrelWidth, x, y){
  this.speed = 17 //Normal: 10
  this.explosionSize = 50 //Normal: 50
  this.damage = 10 //Normal: 10

  this.markedForDeletion = false
  
  this.rotation = barrelRotation
  this.size = 7.5 //7.5
  this.x = x + (barrelLength+this.size/2+barrelWidth*5/8-this.speed)*cos(this.rotation)
  this.y = y + (barrelLength+this.size/2+barrelWidth*5/8-this.speed)*sin(this.rotation)
  
  this.startX = this.x
  this.startY = this.y
  
  this.show = function(){
    push()
    translate(cameraX(this.x),cameraY(this.y))
    
    push()
    strokeWeight(1)
    stroke("black")
    fill("darkred")
    rotate(this.rotation)
    circle(this.size/2,0,this.size)
    rect(-this.size/2,-this.size/2,this.size,this.size)
    pop()
    
    pop()
  }
  
  this.move = function(){
    this.x += this.speed*cos(this.rotation)
    this.y += this.speed*sin(this.rotation)
    
    //Check if enemy bullet has travelled 635 pixels since being fired
    if(distance(this.x,this.y,this.startX,this.startY) > 635){
      enemyExplosions[enemyExplosions.length] = new createEnemyExplosion(this.x,this.y,this.explosionSize,this.damage)
      this.markedForDeletion = true
    }
    //Check if enemy bullet is colliding with player
    if(distance(this.x,this.y,tank.x,tank.y) < tank.size/2 + this.size/2){
      enemyExplosions[enemyExplosions.length] = new createEnemyExplosion(this.x,this.y,this.explosionSize,this.damage)
      this.markedForDeletion = true
    }
  }
}