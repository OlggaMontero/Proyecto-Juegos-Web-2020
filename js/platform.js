function createPlatform(x, y)
{           
    let platform = game.add.sprite(x, y, 'platform');
    platform.width = 40;
    platform.height = 40;
    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.checkWorldBounds = true;
    platform.events.onOutOfBounds.add(platformOut, this);
    
    return platform;
}

function movePlatformLeft(platform)
{
    platform.x -= platform.width;
}

function movePlatformRight(platform)
{
    platform.x += platform.width;
}

function platformOut(platform)
{
    if (platform.x <= 0)
    {     
        platform.x = game.width - platform.width;
        console.log("izquierda");
    }
    else if (platform.x >= game.width)
    {
        platform.x = 0;
        console.log("derecha");
    }
}



