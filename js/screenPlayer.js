const TEXT_OFFSET_HOR_P = 40;
const TEXT_OFFSET_VER_P = 40;

let playerState = {

    preload: preloadPlayer,
    create: createPlayer
};

function preloadPlayer() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('button', 'assets/imgs/button.png');
}

function createPlayer() {

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let textI = 'Esta es la pantalla del jugador, deberá escoger su nombre y habilitar el botón';
    let styleI = {font: '20px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_P, TEXT_OFFSET_VER_P, textI, styleI);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX, extPosY, 'button', back);
    buttonBack.scale.setTo(0.1);

    function back(){
        game.state.start('init');
    }
}
