// arrows are palced in the [arrows] array
function createArrow(tempAngle){
  this.x = tank.x
  this.y = tank.y
  this.rotation = tempAngle
  
  let amountOfTimesToMove = width
  for(let i = 0; i < amountOfTimesToMove; i++){
    this.x += ((width)*cos(tempAngle))/width
    if(this.x >= cam.x+width-70 || this.x <= cam.x+70){
      this.x -= ((width)*cos(tempAngle))/width
    }
    this.y += ((height)*sin(tempAngle))/width
    if(this.y >= cam.y+height-70 || this.y <= cam.y+70){
      this.y -= ((height)*sin(tempAngle))/width
    }
  }
  
  this.show = function(){
    push()
    translate(cameraX(this.x),cameraY(this.y))
    fill("red")
    rotate(this.rotation)
    noStroke()
    
    rect(-5,-5,20,10,5,0,0,5)
    triangle(15,-15,15+10,0,15,15)
    pop()
    
  }
}