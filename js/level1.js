let level1State = {

    preload: preloadLevel1,
    create: createLevel1,
    update: updateLevel1,
};
//Declara todas las variables que se van a utilizar
let STAGE_HEIGHT = 3200;
let STAGE_WIDTH = 400;
let CANVAS_HEIGHT = 800;
let CANVAS_WIDTH  = 400;
let THRESHOLD = 25;
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
let mouse;
let hasPowerup = false;
let pointerX;
let previousPointerX;

//Precarga todas las imagenes, audios y textos a usar en el nivel 1
function preloadLevel1() 
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

    game.load.audio('musicFirstLevel', 'assets/snds/MusicFirstLevel.wav');
    game.load.audio('rebound', 'assets/snds/Rebound.wav');
    game.load.audio('pickPowerup', 'assets/snds/PowerUp.wav');
    game.load.audio('hurtSound', 'assets/snds/Hurt.wav');
    game.load.audio('timerSound', 'assets/snds/Timer.wav');
    game.load.audio('timerEnds', 'assets/snds/Ding.wav');

    game.load.text('level1', 'levels/levelOneJSON.json', true);
    game.load.text('level2', 'levels/levelTwoJSON.json', true);
}
//Coloca todo lo necesario en la pantalla y hace uso de algunas variables
function createLevel1() 
{   
    game.scale.setGameSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    test = 0;
    level = 1;
    life = 100;
    counterPowerup = 7;
    remainingPlatforms = 20;
    //Reproduce la música
    musicFirstLevel = game.add.audio('musicFirstLevel');
    musicFirstLevel.loop = true;
    musicFirstLevel.play();
    //Permite usar las flechas del teclado
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    leftKey.onDown.add(moveLeft, this);
    rightKey.onDown.add(moveRight, this);
    //Guarda la posicion antigua del ratón y la nueva
    pointerX = game.input.mousePointer.x;
    previousPointerX = pointerX;
    //Carga el nivel
    createStage();

}
//Usa las físicas en el update
function updateLevel1()
{
    game.physics.arcade.collide(character, assets);
    game.physics.arcade.collide(character, ground, nextLevel);
    if (mouse){
        manageAppleMovement();
    }
}
//Funcion para moverse a la derecha
function moveRight()
{
    if (!mouse){
        for(i = 0; i < assets.length; i++)
        {
            moveAssetRight(assets[i]);
        }
    }
}
//Funcion para moverse a la izquierda
function moveLeft()
{
    if (!mouse){
        for(i = 0; i < assets.length; i++)
        {
            moveAssetLeft(assets[i]);  
        }
    }
}

function setmouse(estado) {
    mouse = estado;
 }

 function moveRightMouse(){

    for(i = 0; i < assets.length; i++)
    {
        moveAssetRight(assets[i]);
    }
 }

 function moveLeftMouse(){

    for(i = 0; i < assets.length; i++)
    {
        moveAssetLeft(assets[i]);  
    }
 }

//Funcion para cargar el nivel con todos los formatos puestos
function createStage()
{   //Da formato al fondo, el final del nivel, los límites de la pantalla 
    game.world.setBounds(1, 0, STAGE_WIDTH-2, STAGE_HEIGHT, true, true, true, true);   
    background = game.add.tileSprite(0, 0, STAGE_WIDTH+20, STAGE_HEIGHT+20, 'background');
    ground = game.add.tileSprite(0, 3100, STAGE_WIDTH, STAGE_HEIGHT, 'ground');
    //Establece el final del nivel (ground) como objeto para colisionar con el personaje
    game.physics.arcade.enable(ground);
    //Crea al personaje
    createCharacter();
    //Carga el JSON del nivel 1
    loadJSON('level1');
    //Carga el HUD
    createHUD();


    //Aquí iría en teoría la variable del nombre que le pasemos:
    //const cuadroTexto = new type(input);
}

//Para crear el HUD coge la función de la creación de vida y la función de crear la información del nivel
function createHUD()
{
    createLife();
    createInfoLevel();
}

//Esta función crea un texto con información sobre el nivel y el formato de la misma
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

//Funcion para cargar el JSON
function loadJSON(level)
{
    let levelJSON = JSON.parse(game.cache.getText('level1'));

    numberOfPlatforms = levelJSON.ObjectsInMap.platforms.length;
    numberOfObstacles = levelJSON.ObjectsInMap.obstacles.length;
    numberOfPowerups = levelJSON.ObjectsInMap.powerup.length;
    
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
    for (i = 0; i < numberOfPowerups; i++)
    {
        let x = levelJSON.ObjectsInMap.powerup[i].position.x;
        let y = levelJSON.ObjectsInMap.powerup[i].position.y;
        let type = levelJSON.ObjectsInMap.powerup[i].type;
        createAssetsJSON(x, y, type);
    }
}

//Funcion para crear los assets del JSON
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

//Funcion para pasar al siguiente nivel
function nextLevel(){
    musicFirstLevel.destroy();
    game.state.start('level2');
}
