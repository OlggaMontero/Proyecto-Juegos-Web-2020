const TEXT_OFFSET_HOR_I = 40;
const TEXT_OFFSET_VER_I = 40;

let instructionsState = {

    preload: preloadInstructions,
    create: createInstructions,
    update: updateInstructions
};

function preloadInstructions() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');

    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');

}

function createInstructions() {

    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let textI = 'Esta es la pantalla de las instrucciones';
    let styleI = {font: '20px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_I, TEXT_OFFSET_VER_I, textI, styleI);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-100, extPosY+350, 'buttonBack', back);
    buttonBack.anchor.setTo(0.5, 0.5);
    buttonBack.scale.setTo(0.7);

    function back(){
        game.state.start('init');
    }
}

function updateInstructions(){

    if (buttonBack.input.pointerOver()){
        buttonBack.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else{
        buttonBack.scale.setTo(0.6, 0.6);
    }
}
