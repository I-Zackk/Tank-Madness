var targetingSystem = {
  startX:0,
  startY:0,
  secondX:0,
  secondY:0,
  active: false,
  amountOfEnemiesTargeted:0,
  
  show: function(){
    push()
    
    fill(0,0,0,75)
    noStroke()
    rect(targetingSystem.startX,
         targetingSystem.startY,
         targetingSystem.secondX-targetingSystem.startX,
         targetingSystem.secondY-targetingSystem.startY)
    
    pop()
  },
  
  update: function(){
    if(targetingSystem.active){
      targetingSystem.secondX = mouseX
      targetingSystem.secondY = mouseY

      for(let i = 0; i < enemies.length; i++){
        if(targetingSystem.startX < targetingSystem.secondX && targetingSystem.startY < targetingSystem.secondY){
          if(enemies[i].x + enemies[i].size/2 >= targetingSystem.startX+cam.x && 
             enemies[i].x - enemies[i].size/2 <= targetingSystem.secondX+cam.x && 
             enemies[i].y + enemies[i].size/2 >= targetingSystem.startY+cam.y && 
             enemies[i].y - enemies[i].size/2 <= targetingSystem.secondY+cam.y){
            enemies[i].massTargetHover = true
          } else {
            enemies[i].massTargetHover = false
          }
        } else if(targetingSystem.startX > targetingSystem.secondX && targetingSystem.startY < targetingSystem.secondY){
          if(enemies[i].x + enemies[i].size/2 >= targetingSystem.secondX+cam.x && 
             enemies[i].x - enemies[i].size/2 <= targetingSystem.startX+cam.x && 
             enemies[i].y + enemies[i].size/2 >= targetingSystem.startY+cam.y && 
             enemies[i].y - enemies[i].size/2 <= targetingSystem.secondY+cam.y){
            enemies[i].massTargetHover = true
          } else {
            enemies[i].massTargetHover = false
          }
        } else if(targetingSystem.startX > targetingSystem.secondX && targetingSystem.startY > targetingSystem.secondY){
          if(enemies[i].x + enemies[i].size/2 >= targetingSystem.secondX+cam.x && 
             enemies[i].x - enemies[i].size/2 <= targetingSystem.startX+cam.x && 
             enemies[i].y + enemies[i].size/2 >= targetingSystem.secondY+cam.y && 
             enemies[i].y - enemies[i].size/2 <= targetingSystem.startY+cam.y){
            enemies[i].massTargetHover = true
          } else {
            enemies[i].massTargetHover = false
          }
        } else if(targetingSystem.startX < targetingSystem.secondX && targetingSystem.startY > targetingSystem.secondY){
          if(enemies[i].x + enemies[i].size/2 >= targetingSystem.startX+cam.x && 
             enemies[i].x - enemies[i].size/2 <= targetingSystem.secondX+cam.x && 
             enemies[i].y + enemies[i].size/2 >= targetingSystem.secondY+cam.y && 
             enemies[i].y - enemies[i].size/2 <= targetingSystem.startY+cam.y){
            enemies[i].massTargetHover = true
          } else {
            enemies[i].massTargetHover = false
          }
        }
      }
    }
  }
}