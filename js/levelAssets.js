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
        asset.body.onCollide = new Phaser.Signal();
        asset.body.onCollide.add(playerHitsBomb, this);
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
        characterHurt(NewValue);
        console.log(NewValue);
        platform.destroy();
    }
    character.body.velocity.y *= 0.4;  
}

function playerHitsObstacle(obstacle)
{
    if (character.y < obstacle.y + obstacle.height)
    {
        characterHurt(8);
        obstacle.destroy();
    }
    character.body.velocity.y *= 0.3;
}

function playerHitsBomb(platform)
{
    if (character.y < platform.y + platform.height)
    {
        platform.loadTexture('platform_bomb_active');
        platform.width = PLATFORM_SIZE;
        platform.height = PLATFORM_SIZE;
        game.time.events.add(2500, function () {
            displayBlast(platform.x, platform.y);
            platform.destroy();
        })
    }
    character.body.velocity.y *= 0.4;  
}

function displayBlast(x, y)
{
    blasts = game.add.group();
    blasts.createMultiple(10, 'purple_blast');
    blasts.forEach(setupBlast, this);
    let blast = blasts.getFirstExists(false);
    blast.reset(x, y);
    blast.play('pruple_blast', 30, false, true);
}

function setupBlast(blast)
{
    blast.anchor.x = 0.5;
    blast.anchor.y = 0.5;
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

    //falta tener en cuenta el aumento de velocidad
    if (hasPowerup)
    {
        platform.destroy();
    }
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
    //console.log(character.body.velocity.y); //Just to visualize on console this values
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
        if (nombre == 'powerupSpeed')
        {
            //cambiar la aceleracion como piden para el primer powerup
        }
        else if (nombre == 'superSoldier')
        {
            //cambiar la aceleracion como piden para el segundo powerup
            //debe acabar cunado rompa la plataforma o la velocidad llegue a la norma
        }
        else if (nombre == 'buble')
        {
            bubleCharacter = game.add.sprite(character.x, character.y, 'buble');
            bubleCharacter.scale.setTo(0.07);
            hasBuble = true;
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
            //poner la aceleracion y todos los valores a normal
            timerEnds = game.add.audio('timerEnds');
            timerEnds.play();
            timerSound.destroy();
            powerupHUD.destroy();
            hasPowerup = false;
            if (hasBuble)
            {
                bubleCharacter.destroy();
                hasBuble = false;
            }
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
        return assetSupersoldier;
    }
}

function createPowerupsInMap(x, y){

    let numberRandom = game.rnd.integerInRange(0,20);
    if (numberRandom==0 || numberRandom==1 || numberRandom==2){
        return "powerupSpeed";
    }

    if ((numberRandom==4 || numberRandom==5 || numberRandom==6) && levelToPlay!=0){
        return "superSoldier";
    }
    return "";
}