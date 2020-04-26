let level1State = {

    preload: preloadLevel1,
    create: createLevel1,
    update: updateLevel1,
};

let STAGE_HEIGHT = 3200;
let STAGE_WIDTH = 400;
let CANVAS_HEIGHT = 800;
let CANVAS_WIDTH  = 400;
let x = 300;
let y = 750;
let level;
let life;
let lifeText;
let nameText;
let platforms = [];

function preloadLevel1() {
    game.load.image('background', 'assets/imgs/background_level1.png');
    game.load.image('ground', 'assets/imgs/ground.png');
    game.load.image('platform', 'assets/imgs/platform_normal.png');
    game.load.image('platform_trap', 'assets/imgs/platform_trap.png');
    game.load.image('character', 'assets/imgs/character.png');
    game.load.image('healthBar', 'assets/imgs/healthBar.jpg');

    game.load.audio('musicFirstLevel', 'assets/snds/musicFirstLevel.wav');
}

function createLevel1() {

    game.scale.setGameSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    
    level = 1;
    life = 100;

    musicFirstLevel = game.add.audio('musicFirstLevel');
    musicFirstLevel.loop = true;
    musicFirstLevel.play();

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
    game.world.setBounds(1, 0, STAGE_WIDTH-2, STAGE_HEIGHT, true, true, true, true);   
    background = game.add.tileSprite(0, 0, STAGE_WIDTH, STAGE_HEIGHT, 'background');
    ground = game.add.tileSprite(0, 3100, STAGE_WIDTH, STAGE_HEIGHT, 'ground');
    
    createPlatforms(400, [1,1,2,1,2,1,1,2,2,1]);
    createPlatforms(600, [1,2,1,1,2,2,1,2,1,1]);
    createPlatforms(800, [2,2,2,1,2,1,2,2,2,1]);
    createPlatforms(1000, [1,2,1,1,2,2,1,2,1,1]);    
    createCharacter();
    createHUD();   
   
    //Aquí iría en teoría la variable del nombre que le pasemos:
    //const cuadroTexto = new type(input);
}

function createPlatforms(positionY, platformTypes)
{
    //platforms = game.add.group();
    let platformOffset = 0;

    for(i = 0; i < platformTypes.length; i++)
    {
        let platform = createPlatform(platformOffset, positionY, platformTypes[i]);
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

