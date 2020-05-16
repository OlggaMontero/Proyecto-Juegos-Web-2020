let level1State = {

    preload: loadLevelAssets,
    create: createLevel,
    update: updateLevel,
};

const STAGE_HEIGHT = 4500;
const STAGE_WIDTH = 400;
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH  = 400;
const THRESHOLD = 25;
const LEVEL_ONE = 'level1';
const LEVEL_TWO = 'level2';
const LEVEL_THREE = 'level3';

let x = 300;
let y = 750;
let level;
let life;
let lifeText;
let nameText;
let assets = [];
let remainingPlatforms;
let condition;
let counterPowerup;
let hasPowerup;
let mouse;
let pointerX;
let previousPointerX;
let hasBuble;
let musicLevel;

let levelToPlay = 0;
let levels = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE];

function loadLevelAssets()
{
    loadImages();
    loadSounds();
    loadLevels(); 
}

function loadImages()
{
    game.load.image('background', 'assets/imgs/background_level1.png');
    game.load.image('ground', 'assets/imgs/ground.png');
    game.load.image('platform', 'assets/imgs/platform_normal.png');
    game.load.image('platform_trap', 'assets/imgs/platform_trap.png');
    game.load.image('character', 'assets/imgs/character.png');
    game.load.image('healthBar', 'assets/imgs/healthBar.jpg');
    game.load.image('enemy', 'assets/imgs/enemy.png');
    game.load.image('powerupSpeed', 'assets/imgs/powerup.png');
    game.load.image('powerupSpeedHUD', 'assets/imgs/powerupHUD.png');
    game.load.image('superSoldier', 'assets/imgs/superSoldier.png');
    game.load.image('superSoldierHUD', 'assets/imgs/superSoldierHUD.png');
    game.load.image('buble', 'assets/imgs/buble.png');
    game.load.image('bubleHUD', 'assets/imgs/buble.png');
    game.load.image('letter_A', 'assets/imgs/platform_A.png');
}

function loadSounds()
{
    game.load.audio('musicFirstLevel', 'assets/snds/MusicFirstLevel.wav');
    game.load.audio('musicSecondLevel', 'assets/snds/musicSecondLevel.wav');
    game.load.audio('musicThirdLevel', 'assets/snds/musicThirdLevel.wav');
    game.load.audio('rebound', 'assets/snds/Rebound.wav');
    game.load.audio('pickPowerup', 'assets/snds/PowerUp.wav');
    game.load.audio('hurtSound', 'assets/snds/Hurt.wav');
    game.load.audio('timerSound', 'assets/snds/Timer.wav');
    game.load.audio('timerEnds', 'assets/snds/Ding.wav');
}

function loadLevels()
{
    game.load.text(LEVEL_ONE, 'levels/levelOneJSON.json', true);
    game.load.text(LEVEL_TWO, 'levels/levelTwoJSON.json', true);
    game.load.text(LEVEL_THREE, 'levels/levelThreeJSON.json', true);
}

function createLevel() 
{   
    game.scale.setGameSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    levelToPlay;
    test = 0;
    level = 1;
    life = 100;
    counterPowerup = 7;
    remainingPlatforms = 20;
    hasPowerup = false;
    hasBuble = false;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounterPowerUp, this);

    if (levelToPlay == 0){
        musicLevel = game.add.audio('musicFirstLevel');
        musicLevel.loop = true;
        musicLevel.play();
    }
    else if (levelToPlay == 1){
        musicLevel = game.add.audio('musicSecondLevel');
        musicLevel.loop = true;
        musicLevel.play();
    }
    else if (levelToPlay == 2){
        musicLevel = game.add.audio('musicThirdLevel');
        musicLevel.loop = true;
        musicLevel.play();
    }

    createKeysInput();
    createStage();
}


function updateLevel()
{
    game.physics.arcade.collide(character, assets);
    game.physics.arcade.collide(character, ground, nextLevel);
    if (mouse)
    {
        manageAppleMovement();
    }
    if (hasBuble){
        bubleCharacter.x = character.x - bubleCharacter.width/8;
        bubleCharacter.y = character.y - bubleCharacter.height/8;
    }
}

function createStage()
{
    game.world.setBounds(1, 0, STAGE_WIDTH-2, STAGE_HEIGHT, true, true, true, true);   
    background = game.add.tileSprite(0, 0, STAGE_WIDTH+20, STAGE_HEIGHT+20, 'background');
    ground = game.add.tileSprite(0, 4400, STAGE_WIDTH, STAGE_HEIGHT, 'ground');
    game.physics.arcade.enable(ground);
    createCharacter(200, 100);
    loadJSON(levels[levelToPlay]);
    createHUD();
}

function createKeysInput()
{
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    leftKey.onDown.add(function() { 
        if (!mouse) 
        {
            moveLeft();
        }
    }, this);
    rightKey.onDown.add(function() {
        if (!mouse)
        {
            moveRight()
        }
    }, this);

    pointerX = game.input.mousePointer.x;
    previousPointerX = pointerX;
}

function nextLevel()
{
    levelToPlay += 1;
    musicLevel.destroy();
    if (levelToPlay < 3){
        startCurrentLevel();
    }
    else{
        condition = 'win';
        game.state.start('screenEnd');
    }
}

function startCurrentLevel()
{
    game.state.start('level');
}

function createHUD()
{
    createLife();
    createInfoLevel();
}

function createInfoLevel()
{
    levelText = game.add.text(x+40, y-20, 'Level: ' + (levelToPlay+1) + '  ');
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
    nameText = game.add.text(x-230, y-660, CambiarNombre());
    nameText.anchor.setTo(0.5, 0.5);
    nameText.font = '20px Revalia';
    nameText.fontSize = 20;
    nameText.fixedToCamera = true;
}
