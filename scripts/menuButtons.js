//Ignorera hur stökig koden är här, slängde bara ihop några menyknappar snabbt för jag orkade inte bry mig så mycket

var startButton = {
  label:"Start",
  Width:0,
  Height:0,
  x:0,
  y:0,
  
  show: function(){
    push()
    
    textFont(font);
    textAlign(LEFT,TOP)
    textSize(50)
    
    startButton.x = 10
    startButton.y = height*0.44-70*2
    startButton.Height = 50
    
    strokeWeight(5)
    stroke("black")
    noFill()
    textSize(30);
    startButton.Width = textWidth(startButton.label)+20
    rect(startButton.x,startButton.y,startButton.Width,startButton.Height,3,3,3,3)
    strokeWeight(2)
    fill("black")
    stroke("black")
    textSize(30);
    text(startButton.label,startButton.x+10,startButton.y+7)
    
    pop()
  },
  
  update: function(){
    
  }
}

var tutorialButton = {
  label:"Tutorial",
  Width:0,
  Height:0,
  x:0,
  y:0,
  
  show: function(){
    push()
    
    textFont(font);
    textAlign(LEFT,TOP)
    textSize(50)
    
    tutorialButton.x = 10
    tutorialButton.y = height*0.44-70
    tutorialButton.Height = 50
  4
    strokeWeight(5)
    stroke("black")
    noFill()
    textSize(30);
    tutorialButton.Width = textWidth(tutorialButton.label)+20
    rect(tutorialButton.x,tutorialButton.y,tutorialButton.Width,tutorialButton.Height,3,3,3,3)
    strokeWeight(2)
    fill("black")
    stroke("black")
    textSize(30);
    text(tutorialButton.label,tutorialButton.x+10,tutorialButton.y+7)
    
    pop()
  },
  
  update: function(){
    
  }
}