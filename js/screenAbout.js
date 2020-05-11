const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;

let aboutState = {

    preload: preloadAbout,
    create: createAbout,
    update: updateAbout
};

//Precarga las imagenes y el audio
function preloadAbout() {
    game.load.image('bg', 'assets/imgs/aboutScreen.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');

    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');
}

//Funcion para colocar la imagen de fondo, el texto y el boton para volver al menu de inicio
function createAbout() {

    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let styleText = {font: '27px Sniglet', fill: '#000000', fontWeight: 'bold'};
    let styleText2 = {font: '27px Sniglet', fill: '#000000', fontWeight: 'bold', fontStyle: 'italic'};

    let textI = 'Olga Montero, Fernando Soria and Sara Montagud';
    let instructionsI = game.add.text(TEXT_OFFSET_HOR+240, TEXT_OFFSET_VER+265, textI, styleText);

    let textJ = 'Los ancestrales';
    let instructionsJ = game.add.text(TEXT_OFFSET_HOR+170, TEXT_OFFSET_VER+380, textJ, styleText2);

    let textK = 'Apple Jump is a skill game where you must move the\n'
    textK += 'platforms to get the ball to the end.\n';
    textK += 'You will find power-ups and traps that will make\n';
    textK += 'the game more exciting.';
    let instructionsK = game.add.text(TEXT_OFFSET_HOR+275, TEXT_OFFSET_VER+505, textK, styleText);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-50, extPosY+350, 'buttonBack', back);
    buttonBack.anchor.setTo(0.5, 0.5);
    buttonBack.scale.setTo(0.7);

    function back(){
        musicMenu.destroy();
        game.state.start('init');
    }

}
//Esta funcion controla si se le da al boton de volver atrás o no
function updateAbout(){

    if (buttonBack.input.pointerOver()){
        buttonBack.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else{
        buttonBack.scale.setTo(0.6, 0.6);
    }

}