//
let level2State = {

    preload: preloadLevel2,
    create: createLevel2,
    update: updateLevel2,
};

//Precarga imagenes y audio que se va a usar en el nivel
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

//Da valores y declara algunas variables
let STAGE_HEIGHT_L2 = 3200;
let STAGE_WIDTH_L2 = 400;
let CANVAS_HEIGHT_L2 = 800;
let CANVAS_WIDTH_L2  = 400;
let backgroundL2;

//Coloca todo lo necesario en la pantalla y hace uso de algunas variables
function createLevel2() 
{
    game.scale.setGameSize(STAGE_WIDTH_L2, CANVAS_HEIGHT_L2); //Tamaño de la pantalla donde pondremos todas las imagenes
    
    level = 2; //Número del nivel
    life = 100; //Vida del personaje
    remainingPlatforms = 20; //Las plataformas que quedan
    //Cargay reproduce la musica
    music = game.add.audio('music');
    music.loop = true;
    music.play();
    
   createStageL2();
}

function updateLevel2()
{

}
//Funcion para cargar el nivel con todos los formatos puestos
function createStageL2()
{
    game.world.setBounds(STAGE_WIDTH_L2-2, STAGE_HEIGHT_L2, true, true, true, true);  
    backgroundL2 = game.add.sprite(STAGE_WIDTH_L2-20, STAGE_HEIGHT_L2, 'background');
    createHUD();
}