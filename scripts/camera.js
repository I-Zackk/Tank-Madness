var cam = {
  x:0,
  y:0,
  targetX:0,
  targetY:0,
  mode:"lockOnTank", //Different modes: "lockOnTank" & "freeCam" & "massTargeting"
  
  //Transition related variables
  transition: false,
  xBeforeTransition:0,
  yBeforeTransition:0,
  transitionAngle:0,
  transitionSpeed:0,
  transitionDistance:0,
  transitionFrameCounter:0,
  transitionFrameDuration:15,
  
  totalEnemiesWithinBounds:0,
  
  update: function(){
    
    if(cam.mode == "lockOnTank"){
      if(!cam.transition){
        cam.x = tank.x-width/2
        cam.y = tank.y-height/2
      } else {
        cam.transitionAngle = angle(cam.x+width/2, cam.y+height/2, tank.x, tank.y)
        cam.transitionSpeed = 5+distance(cam.x+width/2,cam.y+height/2,tank.x,tank.y)/10
        cam.x += cam.transitionSpeed * cos(cam.transitionAngle)
        cam.y += cam.transitionSpeed * sin(cam.transitionAngle)
        if(round(angle(cam.x+width/2, cam.y+height/2, tank.x, tank.y)) !== round(cam.transitionAngle)){ //Checks if the camera went past the tanks location
            cam.transition = false
            cam.x = tank.x-width/2
            cam.y = tank.y-height/2
        }
      } 
    } else if(cam.mode == "massTargeting"){
      cam.totalEnemiesWithinBounds = 0
      cam.targetX = 0
      cam.targetY = 0
      for(let i = 0; i < enemies.length; i++){
        if(enemies[i].targeted){
          if(distance(tank.x,tank.y,enemies[i].x,enemies[i].y) <= width){
            cam.totalEnemiesWithinBounds++
            cam.targetX += enemies[i].x
            cam.targetY += enemies[i].y
          }
        }
      }
      if(cam.totalEnemiesWithinBounds == 0){
        cam.targetX = tank.x
        cam.targetY = tank.y
      } else {
        cam.targetX = cam.targetX/cam.totalEnemiesWithinBounds
        cam.targetY = cam.targetY/cam.totalEnemiesWithinBounds
        cam.targetX += tank.x
        cam.targetY += tank.y
        cam.targetX = cam.targetX/2
        cam.targetY = cam.targetY/2
      }
        

        
      cam.transitionAngle = angle(cam.x, cam.y, cam.targetX-width/2, cam.targetY-height/2)
      if(cam.totalEnemiesWithinBounds == 0){
        cam.transitionSpeed = 5+distance(cam.x+width/2,cam.y+height/2,tank.x,tank.y)/10
      } else {
        cam.transitionSpeed = (15+distance(cam.x, cam.y, cam.targetX-width/2, cam.targetY-height/2)/10)/3
      }
      cam.x += cam.transitionSpeed * cos(cam.transitionAngle)
      cam.y += cam.transitionSpeed * sin(cam.transitionAngle)
      if(round(angle(cam.x, cam.y, cam.targetX-width/2, cam.targetY-height/2)) !== round(cam.transitionAngle)){ //Checks if the camera went past the tanks location
        cam.x = cam.targetX-width/2
        cam.y = cam.targetY-height/2
      }
    }    
  }
}