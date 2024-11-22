var levelBar = {
    barHeight:25,
    barWidth:175,
    barBackColor:"rgb(166, 166, 166)",
    barColor:"rgb(0, 204, 255)",
    x:0,
    y:40+15/2,
    maxExperience: 25,
    maxExpIncreaseInterval: 25,
    //tank.experience

    show: function(){
        push()
        translate(this.x,this.y)
        rotate(0)

        fill(this.barBackColor)
        strokeWeight(4)
        stroke("black")
        rect(-this.barWidth/2,-this.barHeight/2,this.barWidth,this.barHeight,10,10,10,10)
        fill(this.barColor)
        if(tank.experience == 0){
            noStroke()
        }
        rect(-this.barWidth/2,-this.barHeight/2,this.barWidth*(tank.experience/this.maxExperience),this.barHeight,10,10,10,10)
        fill("black")
        textFont(font)
        textSize(20)
        noStroke()
        text("Level: "+tank.level,-textWidth("Level: "+tank.level)/2,-20)

        pop()
    },

    update: function(){
        if(tank.experience >= this.maxExperience){
            tank.experience = 0
            tank.level++
            for(let i = 0; i < 3; i++){
                let randNumb = floor(random(0,tank.parts.length))
                tank.parts[randNumb].level++
                if(tank.level == 1){
                    tank.parts[5].level++
                }
            }
            let randNumb = floor(random(0,tank.parts.length))
            tank.parts[randNumb].level++
            console.log(tank.parts[randNumb].level)
            this.maxExperience = this.maxExpIncreaseInterval*1.2^tank.level
        }
    }
}