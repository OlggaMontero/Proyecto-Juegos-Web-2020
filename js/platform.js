function createPlatform(x, y, type)
{
    let platform;
    if (type == 1)
    {
        platform = game.add.sprite(x, y, 'platform');
        game.physics.arcade.enable(platform);
        platform.body.immovable = true
    }
    else if (type == 2)
    {
        platform = game.add.sprite(x, y, 'platform_trap');
        game.physics.arcade.enable(platform);
        platform.body.bounce.y = 0.1;
        platform.body.immovable = true;
        platform.body.onCollide = new Phaser.Signal();
        platform.body.onCollide.add(playerHitsTrap, this);

    }            
    platform.width = 40;
    platform.height = 40;
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
    }
    else if (platform.x >= game.width)
    {
        platform.x = 0;
    }
}

function playerHitsTrap(platform)
{
    if (character.y < platform.y)
    {
        characterHurt(10);
        platform.destroy();
    }
}



