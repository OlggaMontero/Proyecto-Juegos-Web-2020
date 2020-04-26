const TEXT_OFFSET_HOR_I = 40;
const TEXT_OFFSET_VER_I = 40;

let instructionsState = {

    preload: preloadInstructions,
    create: createInstructions,
    update: updateInstructions
};

function preloadInstructions() {
    game.load.image('bg', 'assets/imgs/instructionsScreen.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');

    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');

}

function createInstructions() {

    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let textI = 'Playing Apple Jump is very simple. You can rotate the platforms using\n';
    textI += 'left and right keys or you can also use the mouse. You dont move the ball\n';
    textI += 'in the screen, just the platforms.\n';
    textI += 'Move the platforms so the ball falls through openings. It can bounce on the\n';
    textI += 'platforms but you cannot bounce on the trap platforms. If you bounce in a trap\n';
    textI += 'platform, your life will decrease, if you reach zero score you will die.\n';
    textI += 'Otherwise you will have power-ups with the X X X keys that will give you\n';
    textI += 'facilities to finish the level.\n';
    textI += 'If you complete all levels, you will win.';


    let styleI = {font: '25px Sniglet', fill: '#000000', fontWeight: 'bold', align: 'center'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_I+25, TEXT_OFFSET_VER_I+300, textI, styleI);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-50, extPosY+350, 'buttonBack', back);
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
