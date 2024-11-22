function skidmark(x, y, rotation){
  this.x = x
  this.y = y
  this.markWidth = tank.size/4 //The width of each skid mark
  this.markLength = 10+tank.speed*2 //The length of each skid mark
  this.rotation = rotation
  
  this.show = function(){
    push()
    translate(cameraX(this.x), cameraY(this.y))
    
    noStroke()
    rotate(this.rotation)
    fill(61,31,0, 50)
    //Right Skidmark
    rect(0-tank.size/2-tank.size/8, 0+tank.size/2-this.markWidth, this.markLength, this.markWidth,0,0,0,0)
    //Left Skidmark
    rect(0-tank.size/2-tank.size/8, 0-tank.size/2, this.markLength, this.markWidth,0,0,0,0)
    
    pop()
  }
}