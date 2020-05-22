let level1State = {

    preload: loadLevelAssets,
    create: createLevel,
    update: updateLevel,
    render: render
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
let colliderBoxes = [];
let blasts = [];

let levelToPlay = 0;
let levels = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE];

function loadLevelAssets()
{
    loadImages();
    loadSpriteSheets();
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
    game.load.image('platform_bomb', 'assets/imgs/platform_bomb.png');
    game.load.image('platform_bomb_active', 'assets/imgs/platform_bomb_active.png');
    game.load.image('gradient', 'assets/imgs/gradient.png');
    game.load.image('gradientLeft', 'assets/imgs/gradienteLeft.png');
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

function loadSpriteSheets()
{
    game.load.spritesheet('purple_blast', 'assets/imgs/purple_blast.png', 128, 128);
}

function render()
{
    game.context.fillStyle = 'rgba(255,0,0,0.6)';
    //game.context.fillRect(40, 40, 300, 150);
}

function createLevel() 
{   
    game.scale.setGameSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    levelToPlay;
    test = 0;
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
    game.physics.arcade.overlap(character, colliderBoxes, updateRemainingPlatforms);
    game.physics.arcade.collide(character, ground, nextLevel);
    //game.physics.arcade.overlap(character, assetPowerup, function(assetPowerup){playerHitsPowerup(assetPowerup, 'powerupSpeed')}, this);

    if (mouse)
    {
        manageAppleMovement();
    }
    if (hasBuble)
    {
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
    //createPowerupsInMap();
    createHUD();
    gradientRight = game.add.sprite(330, 0, 'gradient');
    gradientRight.scale.setTo(1, 10);
    gradientLeft = game.add.sprite(-30, 0, 'gradientLeft');
    gradientLeft.scale.setTo(1, 10); 
}

function createKeysInput()
{
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);

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

    keyA.onDown.add(function() {
        for(i = 0; i < assets.length; i++)
        {
            if (assets[i].isKeyPlatform)
            {
                assets[i].destroy();
            }
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
    levelText = game.add.text(x+50, y-20, 'Level: ' + (levelToPlay+1) + '  ');
    levelText.anchor.setTo(0.5, 0.5);
    levelText.font = '25px Revalia';
    levelText.fixedToCamera = true;
 
    grd = levelText.context.createLinearGradient(0, 0, 0, levelText.canvas.height);
    grd.addColorStop(0, '#ffffff');
    levelText.fill = grd;
    levelText.stroke = '#000000';
    levelText.strokeThickness = 2;

    remainingPlatformsText = game.add.text(x-50, y+10, 'Remaining Platforms: ' + remainingPlatforms);
    remainingPlatformsText.anchor.setTo(0.5, 0.5);
    remainingPlatformsText.font = '25px Revalia';
    remainingPlatformsText.fixedToCamera = true;
    remainingPlatformsText.fill = grd;
    remainingPlatformsText.stroke = '#000000';
    remainingPlatformsText.strokeThickness = 2;
    
    nameText = game.add.text(x-230, y-660, username);
    nameText.anchor.setTo(0.5, 0.5);
    nameText.font = '25px Revalia';
    nameText.fixedToCamera = true;
    nameText.fill = grd;
    nameText.stroke = '#000000';
    nameText.strokeThickness = 2;
}

