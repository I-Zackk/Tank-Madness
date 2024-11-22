function createBullet(angle){
  this.speed = tank.bulletSpeed //15
  this.explosionSize = 70 //70
  this.damage = tank.damage

  this.markedForDeletion = false
  
  this.rotation = tank.barrelRotation+angle
  this.size = 7.5 //7.5
  this.x = tank.x + (tank.barrelLength+this.size/2+tank.barrelWidth*5/8-this.speed)*cos(this.rotation)
  this.y = tank.y + (tank.barrelLength+this.size/2+tank.barrelWidth*5/8-this.speed)*sin(this.rotation)
  
  this.startX = this.x
  this.startY = this.y
  
  this.show = function(){
    push()
    translate(cameraX(this.x),cameraY(this.y))
    
    push()
    strokeWeight(1)
    stroke("black")
    fill("yellow")
    rotate(this.rotation)
    circle(this.size/2,0,this.size)
    rect(-this.size/2,-this.size/2,this.size,this.size)
    pop()
    
    pop()
  }
  
  this.move = function(){
    this.x += this.speed*cos(this.rotation)
    this.y += this.speed*sin(this.rotation)
    
    //Detection code that detects when a bullet hits an enemy or has travelled too far and marks the bullet for deletion, also creates an explsoion at the bullets place.
    if(distance(this.x,this.y,this.startX,this.startY) > 635){
      explosions[explosions.length] = new createExplosion(this.x,this.y,this.explosionSize)
      this.markedForDeletion = true
    }
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].alive){
        if(distance(this.x,this.y,enemies[i].x,enemies[i].y) < enemies[i].size/2 + this.size/2){
          explosions[explosions.length] = new createExplosion(this.x,this.y,this.explosionSize)
          this.markedForDeletion = true
        }
      }
    }
    //Detection code that detects when a bullet collides with an enemy bullet
    for(let i = 0; i < enemyBullets.length; i++){
      if(distance(this.x,this.y,enemyBullets[i].x,enemyBullets[i].y) < enemyBullets[i].size/2 + this.size/2){
        explosions[explosions.length] = new createExplosion(this.x,this.y,this.explosionSize)
        enemyBullets.splice(i,1)
        this.markedForDeletion = true
      }
    }
  }
}