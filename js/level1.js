
let level1State = {

    preload: preloadLevel1,
    create: createLevel1,
    update: updateLevel1
};

let x = 300;
let y = 750;
let level;
let life;
let lifeText;
let nameText;

function preloadLevel1() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('platform', 'assets/imgs/platform.png');
    game.load.image('character', 'assets/imgs/character.png');
    game.load.image('healthBar', 'assets/imgs/healthBar.jpg');
}

function createLevel1() {

    level = 1;
    life = 100;

    createLevel();
    createHUD();
    
}

function updateLevel1(){

    game.physics.arcade.collide(character, platform);

}


function createLevel(){

    game.world.setBounds(0, 0, 400, 3200);
    
    fondo = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg');
    
    platform = game.add.sprite(50, 400, 'platform');
    platform.scale.setTo(0.5, 0.3);
    game.physics.arcade.enable(platform);
    platform.body.collideWorldBounds = true;
    platform.body.immovable = true;


    character = game.add.sprite(150, 100, 'character');
    character.scale.setTo(0.1, 0.1);
    game.physics.arcade.enable(character);
    character.body.collideWorldBounds = true;
    character.body.bounce.y = 1;
    character.body.gravity.y = 500;

    //Aquí iría en teoría la variable del nombre que le pasemos:
    //const cuadroTexto = new type(input);
}

function createHUD(){
    createLife(); //hud de la barra de vida
    createInfoLevel(); //hud de info del nivel
}

function createLife(){

    lifeText = game.add.text(x-30, y-700, life + '% ');
    lifeText.anchor.setTo(0.5);

    lifeText.font = '20px Revalia';
    lifeText.fontSize = 20;
    lifeText.fixedToCamera = true;

    healthBar = game.add.sprite(x-270, y-720, 'healthBar');
    healthBar.scale.setTo(0.15, 0.15);
    healthBar.fixedToCamera = true;
}

function createInfoLevel(){
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

function characterHurt(){
    healthBar.width = healthBar.width - 10; //para cuando el personaje sea herido, baja la barra
    life -= 10; //por poner un ejemplo
}