function createObstacle(positionY) 
{
    let obstacleOffset = 40;
    let maxObstacles = Math.random() * (4 - 1) + 1;
    for(i = 0; i < maxObstacles; i++)
    {
        obstacle = game.add.sprite(obstacleOffset, positionY, 'enemy');
        obstacle.scale.setTo(0.09, 0.1);
        obstacle.enableBody = true;
        game.physics.arcade.enable(obstacle);
        obstacle.body.collideWorldBounds = true;
        obstacles.push(obstacle);
        obstacleOffset += 40;
        obstacle.events.onOutOfBounds.add(obstaclesOut, this);
    }  
}

function moveObstaclesLeft(obstacle)
{
   obstacle.x -= 40;
}

function moveObstaclesRight(obstacle)
{
    obstacle.x += 40;
}

function obstaclesOut(obstacle)
{
    if (obstacle.x <= 0)
    {     
        obstacle.x = game.width - obstacle.width;
    }
    else if (obstacle.x >= game.width)
    {
        obstacle.x = 0;
    }
}
