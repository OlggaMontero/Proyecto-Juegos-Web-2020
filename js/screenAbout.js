const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;

let aboutState = {

    preload: preloadAbout,
    create: createAbout,
    update: updateAbout
};

function preloadAbout() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');

    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');
}

function createAbout() {

    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let textI = 'El nombre del equipo es: Los ancestrales\n';
    textI += 'y esta es la pantalla del about';
    let styleI = {font: '18px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);


    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-100, extPosY+350, 'buttonBack', back);
    buttonBack.anchor.setTo(0.5, 0.5);
    buttonBack.scale.setTo(0.7);

    function back(){
        game.state.start('init');
    }

}

function updateAbout(){

    if (buttonBack.input.pointerOver()){
        buttonBack.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else{
        buttonBack.scale.setTo(0.6, 0.6);
    }

}