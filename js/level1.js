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
let assets = [];
let remainingPlatforms = 20;
let condicion;


function preloadLevel1() 
{
    game.load.image('background', 'assets/imgs/background_level1.png');
    game.load.image('ground', 'assets/imgs/ground.png');
    game.load.image('platform', 'assets/imgs/platform_normal.png');
    game.load.image('platform_trap', 'assets/imgs/platform_trap.png');
    game.load.image('character', 'assets/imgs/character.png');
    game.load.image('healthBar', 'assets/imgs/healthBar.jpg');
    game.load.image('enemy', 'assets/imgs/enemy.png');

    game.load.audio('musicFirstLevel', 'assets/snds/MusicFirstLevel.wav');
    game.load.audio('rebound', 'assets/snds/Rebound.wav');

    game.load.text('level', 'levels/levelOneJSON.json', true);
}

function createLevel1() 
{
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
    game.physics.arcade.collide(character, assets);
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

function createStage()
{
    game.world.setBounds(1, 0, STAGE_WIDTH-2, STAGE_HEIGHT, true, true, true, true);   
    background = game.add.tileSprite(0, 0, STAGE_WIDTH, STAGE_HEIGHT, 'background');
    ground = game.add.tileSprite(0, 3100, STAGE_WIDTH, STAGE_HEIGHT, 'ground');
    
    createCharacter();
    createHUD();
    loadJSON('level');
   
    //Aquí iría en teoría la variable del nombre que le pasemos:
    //const cuadroTexto = new type(input);
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
    remainingPlatformsText = game.add.text(x-30, y+10, 'Remaining Platforms: ' + remainingPlatforms);
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

function loadJSON(level)
{
    let levelJSON = JSON.parse(game.cache.getText('level'));

    numberOfPlatforms = levelJSON.ObjectsInMap.platforms.length;
    numberOfObstacles = levelJSON.ObjectsInMap.obstacles.length;
    
    //metemos las plataformas
    let i;
    for (i = 0; i < numberOfPlatforms; i++)
    {
        let x = levelJSON.ObjectsInMap.platforms[i].position.x;
        let y = levelJSON.ObjectsInMap.platforms[i].position.y;
        let type = levelJSON.ObjectsInMap.platforms[i].type;
        createAssetsJSON(x, y, type);
    }
    for (i = 0; i < numberOfObstacles; i++)
    {
        let x = levelJSON.ObjectsInMap.obstacles[i].position.x;
        let y = levelJSON.ObjectsInMap.obstacles[i].position.y;
        let type = levelJSON.ObjectsInMap.obstacles[i].type;
        createAssetsJSON(x, y, type);
    }
}

function createAssetsJSON(x, y, platformTypes)
{
    x = 0
    for(i = 0; i < 10; i++)
    {
        
        if (platformTypes[i] != 0)
        {
            let asset = createAsset(x, y, platformTypes[i]);
            assets.push(asset);
        }
        x += 40;
    }
}

