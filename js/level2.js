let level2State = {

    preload: preloadLevel2,
    create: createLevel2,
    update: updateLevel2,
};

function preloadLevel2() 
{
    game.load.image('background', 'assets/imgs/background_level1.png');
    game.load.image('ground', 'assets/imgs/ground.png');
    game.load.image('platform', 'assets/imgs/platform_normal.png');
    game.load.image('platform_trap', 'assets/imgs/platform_trap.png');
    game.load.image('character', 'assets/imgs/character.png');
    game.load.image('healthBar', 'assets/imgs/healthBar.jpg');

    game.load.audio('music', 'assets/snds/musicSecondLevel.wav');
}

let STAGE_HEIGHT_L2 = 3200;
let STAGE_WIDTH_L2 = 400;
let CANVAS_HEIGHT_L2 = 800;
let CANVAS_WIDTH_L2  = 400;
let backgroundL2;

function createLevel2() 
{
    game.scale.setGameSize(STAGE_WIDTH_L2, CANVAS_HEIGHT_L2);
    
    level = 2;
    life = 100;
    remainingPlatforms = 20;

    music = game.add.audio('music');
    music.loop = true;
    music.play();
    
   createStageL2();
}

function updateLevel2()
{

}

function createStageL2()
{
    game.world.setBounds(STAGE_WIDTH_L2-2, STAGE_HEIGHT_L2, true, true, true, true);  
    backgroundL2 = game.add.sprite(STAGE_WIDTH_L2-20, STAGE_HEIGHT_L2, 'background');
    createHUD();
}