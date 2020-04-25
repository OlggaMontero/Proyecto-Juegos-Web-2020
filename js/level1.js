
let level1State = {

    preload: preloadLevel1,
    create: createLevel1,
    update: updateLevel1,
};

let NEW_HEIGHT = 3200;
let NEW_WIDTH = 400;
let x = 300;
let y = 750;
let level;
let life;
let lifeText;
let nameText;
let platforms;
let platformOffset = 0;
let rightkeyDown = false;
let leftkeyDown = false;

function preloadLevel1() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('platform', 'assets/imgs/platform_normal.png');
    game.load.image('platform_trap', 'assets/imgs/platform_trap.png');
    game.load.image('character', 'assets/imgs/character.png');
    game.load.image('healthBar', 'assets/imgs/healthBar.jpg');
}

function createLevel1() {

    game.scale.setGameSize(NEW_WIDTH, NEW_HEIGHT);
    
    level = 1;
    life = 100;

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    leftKey.onDown.add(moveLeft, this);
    rightKey.onDown.add(moveRight, this);
    createStage();
}

function updateLevel1()
{
    game.physics.arcade.collide(character, platforms); 
}

function moveRight()
{
    for(i = 0; i < platforms.length; i++)
    {
        movePlatformRight(platforms[i]);
        //platforms.children[i].x += 1;
    }

}

function moveLeft()
{
    for(i = 0; i < platforms.length; i++)
    {
        movePlatformLeft(platforms[i]);
        //platforms.children[i].x -= 1;   
    }
}

function createStage()
{
    game.world.setBounds(1, 0, NEW_WIDTH-2, NEW_HEIGHT, true, true, true, true);   
    fondo = game.add.tileSprite(0, 0, NEW_WIDTH, NEW_HEIGHT, 'bg');
    
    createPlatforms(400);   
    createCharacter();
    createHUD();   
   
    //Aquí iría en teoría la variable del nombre que le pasemos:
    //const cuadroTexto = new type(input);
}

function createCharacter()
{
    character = game.add.sprite(150, 100, 'character');
    character.scale.setTo(0.05, 0.05);
    game.physics.arcade.enable(character);
    character.body.collideWorldBounds = true;
    character.body.bounce.y = 1;
    character.body.gravity.y = 500;    
}

function createPlatforms(positionY)
{
    //platforms = game.add.group();
    platforms = [];

    for(i = 0; i < 8; i++)
    {
        let platform = createPlatform(platformOffset, positionY);
        platformOffset += 40;
        //platforms.add(platform);
        platforms.push(platform);
    }
}

function createHUD()
{
    createLife(); //hud de la barra de vida
    createInfoLevel(); //hud de info del nivel
}

function createLife()
{
    lifeText = game.add.text(x-30, y-700, life + '% ');
    lifeText.anchor.setTo(0.5);

    lifeText.font = '20px Revalia';
    lifeText.fontSize = 20;
    lifeText.fixedToCamera = true;

    healthBar = game.add.sprite(x-270, y-720, 'healthBar');
    healthBar.scale.setTo(0.15, 0.15);
    healthBar.fixedToCamera = true;
}

function createInfoLevel()
{
    //el nivel en el que estamos
    levelText = game.add.text(x+40, y-20, 'Level: ' + level + '  ');
    levelText.anchor.setTo(0.5, 0.5);
    levelText.font = '20px Revalia';
    levelText.fontSize = 20;
    levelText.fixedToCamera = true;
    
    //plataformas que quedan para llegar al fin del nivel (cambiar cuando lo tengamos)
    remainingPlatformsText = game.add.text(x-30, y+10, 'Remaining Platforms: ');
    remainingPlatformsText.anchor.setTo(0.5, 0.5);
    remainingPlatformsText.font = '20px Revalia';
    remainingPlatformsText.fontSize = 20;
    remainingPlatformsText.fixedToCamera = true;

    //nombre elegido (cambiar cuando lo tengamos)
    nameText = game.add.text(x-230, y-660, 'Fulanito');
    nameText.anchor.setTo(0.5, 0.5);
    nameText.font = '20px Revalia';
    nameText.fontSize = 20;
    nameText.fixedToCamera = true;
}

function characterHurt()
{
    healthBar.width = healthBar.width - 10; //para cuando el personaje sea herido, baja la barra
    life -= 10; //por poner un ejemplo
}