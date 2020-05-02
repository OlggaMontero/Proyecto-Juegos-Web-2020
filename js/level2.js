let level2State = {

    preload: preloadLevel2,
    create: createLevel2,
    update: updateLevel2,
};

function preloadLevel2() {
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

function createLevel2() {

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
    backgroundL2 = game.add.sprite(STAGE_WIDTH_L2, STAGE_HEIGHT_L2, 'background');
    createHUD();
}

/*
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
    nameText = game.add.text(x-230, y-660, 'Fulanito');
    nameText.anchor.setTo(0.5, 0.5);
    nameText.font = '20px Revalia';
    nameText.fontSize = 20;
    nameText.fixedToCamera = true;
}

*/