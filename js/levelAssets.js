//Funcion para crear varios tipos de assets (posiciones y tipo)
function createAsset(x, y, type)
{
    let asset;
    //Para las plataformas
    if (type == 1)
    {
        asset = game.add.sprite(x, y, 'platform');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsPlatform, this);
    }
    //Para las plataformas trampa
    else if (type == 2)
    {
        asset = game.add.sprite(x, y, 'platform_trap');
        game.physics.arcade.enable(asset);
        asset.body.bounce.y = 0.1;
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsTrap, this);

    }
    //Para los enemigos
    else if (type == 3)
    {
        asset = game.add.sprite(x, y, 'enemy');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsObstacle, this);
        
    }
    //Para el power up de la velocidad
    else if (type == 4){
        asset = game.add.sprite(x, y, 'powerupSpeed');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsPowerup, this);
    }            
    asset.width = 40;
    asset.height = 40;
    asset.checkWorldBounds = true;
    asset.events.onOutOfBounds.add(assetOut, this);
    //Devuelve el asset seleccionado
    return asset;
}
//Funciones para que dependiendo del asset se mueva
function moveAssetLeft(asset)
{
    asset.x -= asset.width;
}

function moveAssetRight(asset)
{
    asset.x += asset.width;
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
//Funcion para cuando el jugador choque contra una trampa
function playerHitsTrap(platform)
{
    if (character.y < platform.y)
    {
        hurtSound = game.add.audio('hurtSound');
        hurtSound.play();
        characterHurt(10);
        platform.destroy();
    }
}
//Funcion para cuando el jugador choque contra un obstáculo
function playerHitsObstacle(obstacle)
{
    if (character.y < obstacle.y)
    {
        hurtSound = game.add.audio('hurtSound');
        hurtSound.play();
        characterHurt(8);
        obstacle.destroy();
    }
}
//Funcion para cuando el jugador choca contra plataforma (simplemente audio)
function playerHitsPlatform(platform)
{
    rebound = game.add.audio('rebound');
    rebound.play();
}
//Funcion para cuando el jugador coge un power uo
function playerHitsPowerup(powerup)
{
    if (!hasPowerup){
        //incrementar velocidad
        counterPowerup = 7;
        timerSound = game.add.audio('timerSound');
        pickPowerup = game.add.audio('pickPowerup');
        timerSound.play();
        pickPowerup.play();
        powerupHUD = game.add.sprite(330, 660, 'powerupHUD');
        powerupHUD.scale.setTo(0.05);
        powerupHUD.fixedToCamera = true;
        game.time.events.loop(Phaser.Timer.SECOND, updateCounterPowerUp, this);
        powerup.destroy();
        hasPowerup = true;
    }
}
//Funcion que hace que tras un tiempo el power up finalice
function updateCounterPowerUp(){
    counterPowerup--;
    if (counterPowerup == 0){
        //poner la velocidad normal
        timerEnds = game.add.audio('timerEnds');
        timerEnds.play();
        timerSound.destroy();
        powerupHUD.destroy();
        hasPowerup = false;
    }
}
//Funcion para el movimiento del personaje con el raton
function manageAppleMovement(){
    if (game.input.mousePointer.x <= STAGE_WIDTH/2){
        moveLeft();
    }
    else if (game.input.mousePointer.x > STAGE_WIDTH/2){
        moveRight();
    }
}