const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;

let aboutState = {

    preload: preloadAbout,
    create: createAbout
};

function preloadAbout() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('button', 'assets/imgs/button.png');
}

function createAbout() {

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let textI = 'El nombre del equipo es: Los ancestrales\n';
    textI += 'y esta es la pantalla del about';
    let styleI = {font: '20px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);


    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX, extPosY, 'button', back);
    buttonBack.scale.setTo(0.1);

    function back(){
        game.state.start('init');
    }
}
