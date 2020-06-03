let differentLetters = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
const PLATFORM_SIZE = 40;
const NUMBER_PLATFORMS_ROW = 10;
const CHARACTER_STEP_KEY = 5;
const CHARACTER_STEP_MOUSE = 20;

function createAsset(x, y, type)
{
    let asset;
    //Normal Platform
    if (type == 1)
    {
        asset = game.add.sprite(x, y, 'platform');
        asset.transitionOutSprite = game.add.sprite(x, y, 'platform');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsPlatform, this);
    }
    //Platform trap
    else if (type == 2)
    {
        asset = game.add.sprite(x, y, 'platform_trap');
        asset.transitionOutSprite = game.add.sprite(x, y, 'platform_trap');
        game.physics.arcade.enable(asset);
        asset.body.bounce.y = 0.1;
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsTrap, this);

    }
    //Cactus obstacles
    else if (type == 3)
    {
        asset = game.add.sprite(x, y, 'enemy');
        asset.transitionOutSprite = game.add.sprite(x, y, 'enemy');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsObstacle, this);
        
    }
    //Buble power up
    else if (type == 6)
    {
        asset = game.add.sprite(x, y, 'buble');
        asset.transitionOutSprite = game.add.sprite(x, y, 'buble');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(function(asset){playerHitsPowerup(asset, 'buble')}, this);
    }
    //Letter platform
    else if (type == 7)
    {
        asset = game.add.sprite(x, y, 'platform');
        asset.transitionOutSprite = game.add.sprite(x, y, 'platform');
        game.physics.arcade.enable(asset);
        let index = Math.floor(Math.random() * differentLetters.length);
        let selectedLetter = differentLetters.charAt(index);
        let platformTextStyle = {font: "256px Verdana", fill: "#000000"};
        let letter = game.add.text(0, 0, selectedLetter, platformTextStyle);
        letter.x += asset.width/2 - letter.width/2;
        letter.y += asset.height/2 - letter.height/2;
        asset.addChild(letter);
        asset.platformText = letter;
        asset.isKeyPlatform = true;
        asset.keyCode = selectedLetter;
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsPlatform, this);

    }
    //Bomb platform
    else if (type == 8)
    {
        asset = game.add.sprite(x, y, 'platform_bomb');
        asset.transitionOutSprite = game.add.sprite(x, y, 'platform_bomb');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.bombEnabled = false;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsBomb, this);
    }
    //Platform on movemet
    else if (type == 9)
    {
        asset = game.add.sprite(x, y, 'platform');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsPlatform, this);
        asset.body.velocity.x = 40;
    }
    //Bomb power up
    /*
    else if (type == 10)
    {
        asset = game.add.sprite(x, y, 'nuke');
        asset.transitionOutSprite = game.add.sprite(x, y, 'nuke');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.bombEnabled = false;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(function(asset){playerHitsPowerup(asset, 'nuke')}, this);
    }*/

    //asset.transitionOutSprite.tint = 0x0000ff; //debug
    asset.transitionOutSprite.alpha = 0;
    asset.transitionOutSprite.width = PLATFORM_SIZE;
    asset.transitionOutSprite.height = PLATFORM_SIZE;
    asset.width = PLATFORM_SIZE;
    asset.height = PLATFORM_SIZE;
    asset.checkWorldBounds = true;
    asset.events.onOutOfBounds.add(assetOut, this);

    return asset;
}

function moveAssetLeft(asset, speed)
{
    asset.x -= speed;
    if (asset.x < 0 && asset.transitionOutSprite.alpha == 0)
    {
        asset.transitionOutSprite.alpha = 1;
        asset.transitionOutSprite.x = CANVAS_WIDTH - Math.abs(asset.x);
    }
    else if (asset.transitionOutSprite.alpha == 1)
    {
        asset.transitionOutSprite.x -= speed;
    }
}

function moveAssetRight(asset, speed)
{
    asset.x += speed;
    if (asset.x + asset.width > CANVAS_WIDTH && asset.transitionOutSprite.alpha == 0)
    {
        asset.transitionOutSprite.alpha = 1;
        outOfScreen = asset.x + asset.width - CANVAS_WIDTH;

        asset.transitionOutSprite.x = -asset.width + outOfScreen;
    }
    else if (asset.transitionOutSprite.alpha == 1)
    {
        asset.transitionOutSprite.x += speed;
    }
}

function moveRight(speed)
{
    for(i = 0; i < assets.length; i++)
    {
        moveAssetLeft(assets[i], speed);
    }
}

function moveLeft(speed)
{
    for(i = 0; i < assets.length; i++)
    {
        moveAssetRight(assets[i], speed); 
    }
}

function manageAppleMovementMouse()
{
    if (mouse)
    {
        pointerX = game.input.mousePointer.x;
        if (pointerX >= previousPointerX + THRESHOLD)
        {
            moveRight(CHARACTER_STEP_MOUSE);
            previousPointerX = pointerX;
        }
        else if (pointerX <= previousPointerX - THRESHOLD)
        {
            moveLeft(CHARACTER_STEP_MOUSE);
            previousPointerX = pointerX;
        }
    }
}

function manageAppleMovementKeys()
{
    if(leftKey.isDown)
    {
        moveLeft(CHARACTER_STEP_KEY);
    }

    if(rightKey.isDown)
    {
        moveRight(CHARACTER_STEP_KEY);       
    }
}

function assetOut(asset)
{
    //console.log(asset.x);
    if (asset.x <= 0)
    {   
        asset.x = CANVAS_WIDTH - Math.abs(asset.x);
    }
    else if (asset.x >= game.width)
    {
        outOfScreen = asset.x + asset.width - CANVAS_WIDTH;
        asset.x = -asset.width + outOfScreen;
    }
    asset.transitionOutSprite.alpha = 0;
}

function playerHitsTrap(platform)
{
    if (character.y <  platform.y + platform.height)
    {
        //Para calcular el daño con la velocidad pero mapeando el rango de valores en uno mas pequeño (Solo tiene 100 de vida y la velocidad es +300) 
        //https://stackoverflow.com/questions/929103/convert-a-number-range-to-another-range-maintaining-ratio

        let velocity = Math.min(500, Math.abs(character.body.velocity.y));
        let OldRange = (500 - 0);
        let NewRange = (30 - 5);
        let NewValue = (((velocity - 0) * NewRange) / OldRange) + 5;
        NewValue = Math.floor(NewValue);
        if (!hasSupersoldier){
            characterHurt(NewValue);
        }
        platform.transitionOutSprite.destroy();
        platform.destroy();
        //console.log(NewValue);
    }
    if(!hasPowerup){character.body.velocity.y *= 0.4;}
    LimitPlayerSpeed();
}

function playerHitsObstacle(obstacle)
{
    if (character.y < obstacle.y + obstacle.height)
    {
        characterHurt(8);
        obstacle.transitionOutSprite.destroy();
        obstacle.destroy();
        
    }
    if (!hasPowerup){character.body.velocity.y *= 0.3;}
    LimitPlayerSpeed();
}

function playerHitsBomb(platform)
{
    bombFused = game.add.audio('bombFused');
    bombExplode = game.add.audio('bombExplode');

    if (character.y < platform.y + platform.height && platform.bombEnabled == false)
    {
        bombFused.play();
        platform.loadTexture('platform_bomb_active');
        platform.width = PLATFORM_SIZE;
        platform.height = PLATFORM_SIZE;
        platform.bombEnabled = true;
        game.time.events.add(2500, function () {
            bombFused.destroy();
            bombExplode.play();
            blast(platform);
            platform.transitionOutSprite.destroy();
            platform.destroy();
        })
    }
    LimitPlayerSpeed();
}

function blast(platform)
{
    blasts = game.add.group();
    blasts.createMultiple(10, 'purple_blast');
    blasts.forEach(setupBlast, this);
    let blast = blasts.getFirstExists(false);
    blast.reset(platform.x + platform.width/2 - blast.width/2, platform.y + platform.height/2 - blast.height/2);
    blast.play('pruple_blast', 30, false, true);
    if (character.x >= platform.x && character.x < platform.x + platform.width && character.y < platform.y + platform.height)
    {
        characterHurt(20);  
    }
    else if (game.physics.arcade.distanceBetween(platform, character) < blast.width)
    {
        characterHurt(20);
    }
}

function setupBlast(blast)
{
    blast.scale.setTo(2);
    blast.animations.add('pruple_blast');
}

function updateRemainingPlatforms(player, colliderBox)
{
    remainingPlatforms -= 1;
    totalPlatformsKnocked += 1;
    remainingPlatformsText.text = 'Remaining Platforms: ' + remainingPlatforms;
    colliderBox.destroy();
}

function playerHitsPlatform(platform)
{
    reboundSound = game.add.audio('rebound');
    reboundSound.play();
    crashPlatform = game.add.audio('crashPlatform');
    
    //console.log('Current position' + platform.position.y);
    if (hasPowerup && (character.body.velocity.y < -800))
    {
        crashPlatform.play();
        platform.destroy();
        platform.transitionOutSprite.destroy();
        powerupEnd();
    }
    if (character.body.velocity.y < - 550)
    {
        crashPlatform.play();
        platform.destroy();
    }
    LimitPlayerSpeed();
}

function LimitPlayerSpeed()
{
    character.body.bounce.y = 1; //Infinite bounce
    //If character goes too fast this slows it down
    if (character.body.velocity.y < -320)
    {
        if (character.body.velocity.y < -400)
        {
            if (character.body.velocity.y < -520)
            {
                character.body.velocity.y *= 0.45;
            }
            else 
            {
                character.body.velocity.y *= 0.55;
            }
        }
        else {character.body.velocity.y *= 0.65;}
    }
    //If character goes too slow this speeds it up
    else if (character.body.velocity.y > -250)
    {
        if (character.body.velocity.y > -220)
        {
            character.body.velocity.y *= 1.35;
        }
        else
        {
            character.body.velocity.y *= 1.15;
        }
    }
}

function playerHitsPowerup(powerup, nombre) //Antes estaba (powerup, nombre) 
{
    //nombre = powerup.nombre; //Alternativa
    if (!hasPowerup)
    {
        timerSound = game.add.audio('timerSound'); //Tener el audio en otro lugar antes
        pickPowerup = game.add.audio('pickPowerup');
        timerSound.play();
        pickPowerup.play();
        let nombreHUD = nombre + 'HUD';
        powerupHUD = game.add.sprite(330, 660, nombreHUD);
        //Lightning power-up
        if (nombre == 'powerupSpeed')
        {
            character.body.gravity.y *= 1.3; 
        }
        //Rocket power-up
        else if (nombre == 'superSoldier')
        {
            character.body.gravity.y *= 1.5; 
        }
        else if (nombre == 'buble')
        {
            bubleCharacter = game.add.sprite(character.x, character.y, 'buble');
            bubleCharacter.scale.setTo(0.07);
            hasBuble = true;
        }
        /*
        else if (nombre == 'nuke')
        {
            /*for (let e in platform.siguiente.obstacles)
            {
                e.destroy();
            }
        }
        */
        powerupHUD.scale.setTo(0.05);
        powerupHUD.fixedToCamera = true;
        counterPowerup = 5;
        powerup.transitionOutSprite.destroy(); //Esto da error al tocar un power up
        powerup.destroy(); //Esto da error en el nivel 2 al tocar un power up
        hasPowerup = true;
    }
}

function updateCounterPowerUp()
{
    if (hasPowerup)
    {
        counterPowerup--;
        if (counterPowerup <= 0)
        {
           powerupEnd();
        }
    }
}

function powerupEnd(){
    if (hasPowerup){
        timerEnds = game.add.audio('timerEnds');
        timerEnds.play();
        timerSound.destroy();
        powerupHUD.destroy();
        hasPowerup = false;
        hasSupersoldier = false;
        character.body.gravity.y = 500; 
        if (hasBuble)
        {
            bubleCharacter.destroy();
            hasBuble = false;
        }
        //Reaction to crash when hits a power up Limit speed?
    }   
}

function createPowerup(x, y, asset){
    if (asset=='powerupSpeed')
    {
        assetPowerup = game.add.sprite(x, y, 'powerupSpeed');
        assetPowerup.transitionOutSprite = game.add.sprite(x, y, 'powerupSpeed');
        game.physics.arcade.enable(assetPowerup);
        assetPowerup.body.immovable = true;
        assetPowerup.scale.setTo(0.15);
        assetPowerup.body.onCollide = new Phaser.Signal();
        assetPowerup.body.onCollide.add(function(assetPowerup){playerHitsPowerup(assetPowerup, 'powerupSpeed')}, this);
        assetPowerup.width = PLATFORM_SIZE;
        assetPowerup.height = PLATFORM_SIZE;
        assetPowerup.transitionOutSprite.width = PLATFORM_SIZE;
        assetPowerup.transitionOutSprite.height = PLATFORM_SIZE;
        assetPowerup.transitionOutSprite.alpha = 0;
        assetPowerup.checkWorldBounds = true;
        assetPowerup.events.onOutOfBounds.add(assetOut, this);
        assetPwrup = assetPowerup;
        return assetPowerup;
    }
    if (asset=='superSoldier')
    {
        assetSupersoldier = game.add.sprite(x, y, 'superSoldier');
        assetSupersoldier.transitionOutSprite = game.add.sprite(x, y, 'superSoldier');
        game.physics.arcade.enable(assetSupersoldier);
        assetSupersoldier.body.immovable = true;
        assetSupersoldier.scale.setTo(0.15);
        assetSupersoldier.body.onCollide = new Phaser.Signal();
        assetSupersoldier.body.onCollide.add(function(assetSupersoldier){playerHitsPowerup(assetSupersoldier, 'superSoldier')}, this);
        assetSupersoldier.width = PLATFORM_SIZE;
        assetSupersoldier.height = PLATFORM_SIZE;
        assetSupersoldier.transitionOutSprite.width = PLATFORM_SIZE;
        assetSupersoldier.transitionOutSprite.height = PLATFORM_SIZE;
        assetSupersoldier.transitionOutSprite.alpha = 0;
        assetSupersoldier.checkWorldBounds = true;
        assetSupersoldier.events.onOutOfBounds.add(assetOut, this);
        hasSupersoldier = true;
        return assetSupersoldier;
    }
}

function createPowerupsInMap(){

    let result = "";
    let numberRandom = game.rnd.integerInRange(0,10);
    if (numberRandom==0){
        result = "powerupSpeed";
    }

    if (numberRandom==1 && levelToPlay!=0){
        result = "superSoldier";
    }
    return result;
}