let level1State = {

    preload: loadLevelAssets,
    create: createLevel,
    update: updateLevel,
};

const STAGE_HEIGHT = 3200;
const STAGE_WIDTH = 400;
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH  = 400;
const THRESHOLD = 25;
const LEVEL_ONE = 'level1';
const LEVEL_TWO = 'level2';

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
let hasPowerup = false;
let mouse;
let pointerX;
let previousPointerX;


let levelToPlay = 0;
let levels = [LEVEL_ONE, LEVEL_TWO];

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
    game.load.image('powerupHUD', 'assets/imgs/powerupHUD.png');
}

function loadSounds()
{
    game.load.audio('musicFirstLevel', 'assets/snds/MusicFirstLevel.wav');
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
}

function createLevel() 
{   
    game.scale.setGameSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    test = 0;
    level = 1;
    life = 100;
    counterPowerup = 7;
    remainingPlatforms = 20;

    musicFirstLevel = game.add.audio('musicFirstLevel');
    musicFirstLevel.loop = true;
    musicFirstLevel.play();

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
}

function createStage()
{
    game.world.setBounds(1, 0, STAGE_WIDTH-2, STAGE_HEIGHT, true, true, true, true);   
    background = game.add.tileSprite(0, 0, STAGE_WIDTH+20, STAGE_HEIGHT+20, 'background');
    ground = game.add.tileSprite(0, 3100, STAGE_WIDTH, STAGE_HEIGHT, 'ground');
    game.physics.arcade.enable(ground);
    createCharacter();
    loadJSON(levels[levelToPlay]);
    createHUD();

    //Aquí iría en teoría la variable del nombre que le pasemos:
    //const cuadroTexto = new type(input);
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
    startCurrentLevel();
}

function startCurrentLevel()
{
    musicFirstLevel.destroy();
    game.state.start('level');
}

function createHUD()
{
    createLife();
    createInfoLevel();
}

function createInfoLevel()
{
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
    nameText = game.add.text(x-230, y-660, nombre);
    nameText.anchor.setTo(0.5, 0.5);
    nameText.font = '20px Revalia';
    nameText.fontSize = 20;
    nameText.fixedToCamera = true;
}
