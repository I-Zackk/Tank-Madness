var minimap = {
  x:0, //The minimap is given it's x value in the setup() function in the sketch.js file
  y:0, //The minimap is given it's y value in the setup() function in the sketch.js file
  size:200,
  mapScale: 20, //This means the map scale is 1:x (x = whatever the value is set to) Smalles value: 5, Largest value: 40, Start value: 20
  
  show: function(){
    push()
    if(gameState == "tutorial"){
      translate(this.x,this.y-interface.barHeight-300)
    } else {
      translate(this.x,this.y-interface.barHeight)
    }
    
    //Minimap
    push()
    
    strokeWeight(2.5)
    fill(0,0,0,25)
    stroke(0,0,0,50)
    line(-this.size/2,0,this.size/2,0) //Horizontal line across the middle of the minimap
    line(0,-this.size/2,0,this.size/2) //Vertical line across the middle of the minimap
    
    circle(0,0,this.size)
    pop()
    
    //Enemies on minimap
    push()
    
    for(let i = 0; i < enemies.length; i++){
        //The following if statement makes sure the icons are only visible while inside the minimaps radius
      if(distance(enemies[i].x,enemies[i].y,cam.x+width/2,cam.y+width/2)/this.mapScale <= this.size/2-enemies[i].size/this.mapScale/2){
        if(enemies[i].alive){
          if(enemies[i].alive){
            fill("darkred")
            circle((enemies[i].x-cam.x-width/2)/this.mapScale,(enemies[i].y-cam.y-width/2)/this.mapScale,10)
          } else {
            fill("rgb(105,0,0)")
            strokeWeight(0.5)
            circle((enemies[i].x-cam.x-width/2)/this.mapScale,(enemies[i].y-cam.y-width/2)/this.mapScale,5)
          }
        }
      }
    }
    
    //Tank on minimap
    push()
    
    //The following if statement makes sure the icons are only visible while inside the minimaps radius
    if(distance(tank.x,tank.y,cam.x+width/2,cam.y+width/2)/this.mapScale <= this.size/2-tank.size/this.mapScale/2){ 
      fill("green")
      circle((tank.x-cam.x-width/2)/this.mapScale,(tank.y-cam.y-width/2)/this.mapScale,10)
    }
    
    pop()
    
    //Camera Area Indicators on minimap
    stroke("black")
    line(-width/2/this.mapScale, -width/2/this.mapScale, -width/2/this.mapScale, -width/2/this.mapScale+10) //Top left line that goes Down
    line(-width/2/this.mapScale, -width/2/this.mapScale, -width/2/this.mapScale+10, -width/2/this.mapScale) //Top left line that goes Right
    line(-width/2/this.mapScale, width/2/this.mapScale, -width/2/this.mapScale, width/2/this.mapScale-10) //Bottom left line that goes Up
    line(-width/2/this.mapScale, width/2/this.mapScale, -width/2/this.mapScale+10, width/2/this.mapScale) //Bottom left line that goes Right
    line(width/2/this.mapScale, width/2/this.mapScale, width/2/this.mapScale, width/2/this.mapScale-10) //Bottom Right line that goes Up
    line(width/2/this.mapScale, width/2/this.mapScale, width/2/this.mapScale-10, width/2/this.mapScale) //Bottom Right line that goes Left
    line(width/2/this.mapScale, -width/2/this.mapScale, width/2/this.mapScale, -width/2/this.mapScale+10) //Top Right line that goes Down
    line(width/2/this.mapScale, -width/2/this.mapScale, width/2/this.mapScale-10, -width/2/this.mapScale) //Top Right line that goes Left
    
    pop()
    
    pop()
  }
}