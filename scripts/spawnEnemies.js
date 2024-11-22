function spawnEnemies(){
    if(enemiesAlive < 50){
        let clusterAmount = round(random(4,10))
        let clusterX = random(tank.x-width*2.5,tank.x+width*2.5)
        let clusterY = random(tank.y-height*2.5,tank.y+width*2.5)
        if(distance(clusterX,clusterY,tank.x,tank.y) < width*2){
            while(distance(clusterX,clusterY,tank.x,tank.y) < width){
                clusterX = random(tank.x-width*2.5,tank.x+width*2.5)
                clusterY = random(tank.y-height*2.5,tank.y+width*2.5)
                if(distance(clusterX,clusterY,tank.x,tank.y) > width*3){
                    break
                }
            }
        }
        for(let i = 0; i < clusterAmount; i++){
            enemies[enemies.length] = new createEnemy(clusterX+cos((360/clusterAmount)*i)*140,clusterY+sin((360/clusterAmount)*i)*140)
        }
    }
}