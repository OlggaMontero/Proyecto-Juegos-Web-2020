const TEXT_OFFSET_HOR_I = 40;
const TEXT_OFFSET_VER_I = 40;

let instructionsState = {

    preload: preloadInstructions,
    create: createInstructions
};

function preloadInstructions() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');
}

function createInstructions() {

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let textI = 'Esta es la pantalla de las instrucciones';
    let styleI = {font: '20px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_I, TEXT_OFFSET_VER_I, textI, styleI);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-150, extPosY+350, 'buttonBack', back);1
    buttonBack.scale.setTo(0.7);

    function back(){
        game.state.start('init');
    }
}
