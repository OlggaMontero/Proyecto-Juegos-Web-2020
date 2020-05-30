let differentLetters = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
const PLATFORM_SIZE = 40;


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
    //Obstaculos
    else if (type == 3)
    {
        asset = game.add.sprite(x, y, 'enemy');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsObstacle, this);
        
    }
    //Power up de la burbuja
    else if (type == 6)
    {
        asset = game.add.sprite(x, y, 'buble');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(function(asset){playerHitsPowerup(asset, 'buble')}, this);
    }
    //Plataforma letras
    else if (type == 7)
    {
        asset = game.add.sprite(x, y, 'platform');
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
    //Plataforma bomba
    else if (type == 8)
    {
        asset = game.add.sprite(x, y, 'platform_bomb');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.bombEnabled = false;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsBomb, this);
    }
    //Platform on movemet
    /*else if (type == 9)
    {
        asset = game.add.sprite(x, y, 'platform');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.scale.setTo(0.15);
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsPlatform, this);
        //asset.body.velocity.x = 40;
        //Now we add the movemement
        //platformMovement(asset);
    }*/
    //Plataforma bomba
    else if (type == 10)
    {
        asset = game.add.sprite(x, y, 'nuke');
        game.physics.arcade.enable(asset);
        asset.body.immovable = true;
        asset.bombEnabled = false;
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(function(asset){playerHitsPowerup(asset, 'nuke')}, this);
    }

    asset.width = PLATFORM_SIZE;
    asset.height = PLATFORM_SIZE;
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
    if (character.y < platform.y + platform.height)
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
        platform.destroy();
        hasSupersoldier = false;
        console.log(NewValue);
    }
    if(!hasPowerup){character.body.velocity.y *= 0.4;}
    LimitPlayerSpeed();
}

function playerHitsObstacle(obstacle)
{
    if (character.y < obstacle.y + obstacle.height)
    {
        characterHurt(8);
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
            blast(platform.x + platform.width/2, platform.y + platform.height/2);
            platform.destroy();
        })
    }
    LimitPlayerSpeed();
}

function blast(x, y)
{
    blasts = game.add.group();
    blasts.createMultiple(10, 'purple_blast');
    blasts.forEach(setupBlast, this);
    let blast = blasts.getFirstExists(false);
    blast.reset(x, y);
    blast.play('pruple_blast', 30, false, true);
    if (game.physics.arcade.distanceBetween(platform, character) < blast.width)
    {
        characterHurt(20);
    }
}

function setupBlast(blast)
{
    blast.anchor.x = 0.5;
    blast.anchor.y = 0.5;
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
    
   // console.log(levelJSON.ObjectsInMap.platforms[0].position.y);
    console.log('Current position' + platform.position.y);

    //falta adecuar la velocidad
    //HABLAR PROFESOR
    if (hasPowerup && (character.body.velocity.y < -800))
    {
        crashPlatform.play();
        platform.destroy();
        hasPowerup = false;
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
        //Lightning power-up
        if (nombre == 'powerupSpeed')
        {
            character.body.gravity.y *= 1.25; 
        }
        //Rocket power-up
        else if (nombre == 'superSoldier')
        {
            character.body.gravity.y *= 1.45; 
        }
        else if (nombre == 'buble')
        {
            bubleCharacter = game.add.sprite(character.x, character.y, 'buble');
            bubleCharacter.scale.setTo(0.07);
            hasBuble = true;
        }
        else if (nombre == 'nuke')
        {
            /*for (let e in platform.siguiente.enemies)
            {
                e.destroy();
            }*/
        }

        powerupHUD.scale.setTo(0.05);
        powerupHUD.fixedToCamera = true;
        counterPowerup = 5;
        powerup.destroy();
        hasPowerup = true;
    }
}

function updateCounterPowerUp()
{
    if (hasPowerup)
    {
        counterPowerup--;
        if (counterPowerup == 0)
        {
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
        }
    }
    //Reaction to crash when hits a power up Limit speed?   
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

function createPowerup(x, y, asset){
    if (asset=='powerupSpeed')
    {
        assetPowerup = game.add.sprite(x, y, 'powerupSpeed');
        game.physics.arcade.enable(assetPowerup);
        assetPowerup.body.immovable = true;
        assetPowerup.scale.setTo(0.15);
        assetPowerup.body.onCollide = new Phaser.Signal();
        assetPowerup.body.onCollide.add(function(assetPowerup){playerHitsPowerup(assetPowerup, 'powerupSpeed')}, this);
        assetPowerup.width = PLATFORM_SIZE;
        assetPowerup.height = PLATFORM_SIZE;
        assetPowerup.checkWorldBounds = true;
        assetPwrup = assetPowerup;
        return assetPowerup;
    }
    if (asset=='superSoldier')
    {
        assetSupersoldier = game.add.sprite(x, y, 'superSoldier');
        game.physics.arcade.enable(assetSupersoldier);
        assetSupersoldier.body.immovable = true;
        assetSupersoldier.scale.setTo(0.15);
        assetSupersoldier.body.onCollide = new Phaser.Signal();
        assetSupersoldier.body.onCollide.add(function(assetSupersoldier){playerHitsPowerup(assetSupersoldier, 'superSoldier')}, this);
        assetSupersoldier.width = PLATFORM_SIZE;
        assetSupersoldier.height = PLATFORM_SIZE;
        assetSupersoldier.checkWorldBounds = true;
        hasSupersoldier = true;
        return assetSupersoldier;
    }
}

function createPowerupsInMap(){

    let result = "";
    let numberRandom = game.rnd.integerInRange(0,80);
    if (numberRandom==0 || numberRandom==1 || numberRandom==2){
        result = "powerupSpeed";
    }

    if ((numberRandom==3 || numberRandom==4) && levelToPlay!=0){
        result = "superSoldier";
    }
    return result;
}

/*
function platformMovement(asset){
    for (let i=0; i<100; i++){      //cambiar
        if (asset.position.x == limitLeft) {
            asset.body.velocity.x = 40;
        }
        if (asset.position.x == limitRight){
            asset.body.velocity.x = -40;
        }
    }
}*/