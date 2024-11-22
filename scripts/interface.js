var interface = {
  barHeight:50,
  reloadBarWidth:250,
  reloadBarHeight:25,
  
  show: function(){
    
    if(gameState == "tutorial"){

      //The interface bar
      push()
      
      noStroke()
      fill(0,0,0,75)
      rect(0, height-interface.barHeight-150, width,  interface.barHeight)
      
      pop()
      
      //The reload bar
      push()
      
      //Drawing the underlying rectangle
      fill(100,100,100)
      rect(width/2-interface.reloadBarWidth/2, //x
          height-interface.barHeight/2-interface.reloadBarHeight/2-150, //y
          interface.reloadBarWidth, //Width
          interface.reloadBarHeight, //Height
          5,5,5,5) //Corners
      
      //Drawing the overlaying rectangle
      fill(200,200,200)
      rect(width/2-interface.reloadBarWidth/2, //x
          height-interface.barHeight/2-interface.reloadBarHeight/2-150, //y
          interface.reloadBarWidth-(interface.reloadBarWidth*(tank.attackCooldown/(secondsToFrames(tank.attackCooldownTime)))), //Width
          interface.reloadBarHeight, //Height
          5,5,5,5) //Corners
      
      pop()
    } else {
      
      //The interface bar
      push()
      
      noStroke()
      fill(0,0,0,75)
      rect(0, height-interface.barHeight, width,  interface.barHeight)
      
      pop()
      
      //The reload bar
      push()
      
      //Drawing the underlying rectangle
      fill(100,100,100)
      rect(width/2-interface.reloadBarWidth/2, //x
          height-interface.barHeight/2-interface.reloadBarHeight/2, //y
          interface.reloadBarWidth, //Width
          interface.reloadBarHeight, //Height
          5,5,5,5) //Corners
      
      //Drawing the overlaying rectangle
      fill(255,255,255)
      rect(width/2-interface.reloadBarWidth/2, //x
          height-interface.barHeight/2-interface.reloadBarHeight/2, //y
          interface.reloadBarWidth-(interface.reloadBarWidth*(tank.attackCooldown/(secondsToFrames(tank.attackCooldownTime)))), //Width
          interface.reloadBarHeight, //Height
          5,5,5,5) //Corners
      
      pop()
    }
  },
  
  update: function(){ //
    
  }
}