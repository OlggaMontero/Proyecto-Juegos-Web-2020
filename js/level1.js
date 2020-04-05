
let level1State = {

    preload: preloadLevel1,
    create: createLevel1,
    update: updateLevel1
};

function preloadLevel1() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('platform', 'assets/imgs/platform.png');
    game.load.image('character', 'assets/imgs/character.png');
}

function createLevel1() {

    createLevel();
    
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
}