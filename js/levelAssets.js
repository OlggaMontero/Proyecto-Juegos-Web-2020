function createAsset(x, y, type)
{
    let asset;
    //Plataformas
    if (type == 1)
    {
        asset = game.add.sprite(x, y, 'platform');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsPlatform, this);
    }
    //Plataformas trampa
    else if (type == 2)
    {
        asset = game.add.sprite(x, y, 'platform_trap');
        game.physics.arcade.enable(asset);
        asset.body.bounce.y = 0.1;
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsTrap, this);

    }
    //Enemigos
    else if (type == 3)
    {
        asset = game.add.sprite(x, y, 'enemy');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsObstacle, this);
        
    }
    //Power up de la velocidad
    else if (type == 4){
        asset = game.add.sprite(x, y, 'powerupSpeed');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(function(asset){playerHitsPowerup(asset, 'powerupSpeed')}, this);
    }
    //Power up superSoldier
    else if (type == 5){
        asset = game.add.sprite(x, y, 'superSoldier');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(function(asset){playerHitsPowerup(asset, 'superSoldier')}, this);
    }
    //Power up de la burbuja
    else if (type == 6){
        asset = game.add.sprite(x, y, 'buble');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(function(asset){playerHitsPowerup(asset, 'buble')}, this);
    }         
    asset.width = 40;
    asset.height = 40;
    asset.checkWorldBounds = true;
    asset.events.onOutOfBounds.add(assetOut, this);

    return asset;
}

function moveAssetLeft(asset)
{
    asset.x -= asset.width;
}

function moveAssetRight(asset)
{
    asset.x += asset.width;
}

function moveRight()
{
    for(i = 0; i < assets.length; i++)
    {
        moveAssetRight(assets[i]);
    }
}

function moveLeft()
{
    for(i = 0; i < assets.length; i++)
    {
        moveAssetLeft(assets[i]);  
    }
}

function assetOut(asset)
{
    if (asset.x <= 0)
    {     
        asset.x = game.width - asset.width;
    }
    else if (asset.x >= game.width)
    {
        asset.x = 0;
    }
}

function playerHitsTrap(platform)
{
    if (character.y < platform.y)
    {
        characterHurt(20);
        platform.destroy();
    }
    character.body.bounce.y -= 0.1;  
    console.log(character.body.bounce.y);

}

function playerHitsObstacle(obstacle)
{
    if (character.y < obstacle.y)
    {
        characterHurt(8);
        obstacle.destroy();
    }
}

function playerHitsTemp(n, platform, sound)
{
    if (character.y < platform.y)
    {
        characterHurt(n);
        platform.destroy();
    }
}

function playerHitsPlatform(platform)
{
    reboundSound = game.add.audio('rebound');
    reboundSound.play();
    character.body.bounce.y = 1; //Para hacerlo infinito
    
    if (character.body.velocity.y < -300){
        character.body.velocity.y *= 0.6
        if (character.body.velocity.y < -400){
            character.body.velocity.y *= 0.4;
        }
    }
    else if (character.body.velocity.y > -250){
        character.body.velocity.y *= 1.15;
    }
    
    /*if (character.body.velocity.y > -250){
        character.body.velocity.y *= 1.1;
    }*/
    console.log(character.body.velocity.y);
}

function playerHitsPowerup(powerup, nombre)
{
    if (!hasPowerup)
    {
        timerSound = game.add.audio('timerSound');
        pickPowerup = game.add.audio('pickPowerup');
        timerSound.play();
        pickPowerup.play();
        let nombreHUD = nombre + 'HUD';
        powerupHUD = game.add.sprite(330, 660, nombreHUD);
        if (nombre == 'powerupSpeed'){
            //cambiar la velocidad como piden para el primer powerup
        }
        else if (nombre == 'superSoldier'){
            //cambiar la velocidad como piden para el segundo powerup
        }
        else if (nombre == 'buble'){
            bubleCharacter = game.add.sprite(character.x, character.y, 'buble');
            bubleCharacter.scale.setTo(0.07);
            hasBuble = true;
        }
        powerupHUD.scale.setTo(0.05);
        powerupHUD.fixedToCamera = true;
        counterPowerup = 5;
        game.time.events.loop(Phaser.Timer.SECOND, updateCounterPowerUp, this);
        powerup.destroy();
        hasPowerup = true;
    }
}

function updateCounterPowerUp()
{
    counterPowerup--;
    if (counterPowerup == 0){
        //poner la velocidad normal
        timerEnds = game.add.audio('timerEnds');
        timerEnds.play();
        timerSound.destroy();
        powerupHUD.destroy();
        hasPowerup = false;
        if (hasBuble){
            bubleCharacter.destroy();
            hasBuble = false;
        }
    }
}


function manageAppleMovement()
{
    if (mouse)
    {
        pointerX = game.input.mousePointer.x;
        if (pointerX >= previousPointerX + THRESHOLD)
        {
            moveRight();
            previousPointerX = pointerX;
        }
        else if (pointerX <= previousPointerX - THRESHOLD)
        {
            moveLeft();
            previousPointerX = pointerX;
        }
    }
}