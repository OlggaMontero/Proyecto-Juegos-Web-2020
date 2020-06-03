const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;

let aboutState = {

    preload: preloadAbout,
    create: createAbout,
    update: updateAbout
};


function preloadAbout() 
{
    game.load.image('bg', 'assets/imgs/aboutScreen.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');

    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');
}


function createAbout() 
{
    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    let styleText = {font: '27px Sniglet', fill: '#000000', fontWeight: 'bold'};
    let styleText2 = {font: '27px Sniglet', fill: '#000000', fontWeight: 'bold', fontStyle: 'italic'};

    game.add.text(TEXT_OFFSET_HOR+240, TEXT_OFFSET_VER+265, 'Olga Montero, Fernando Soria and Sara Montagud', styleText);
    game.add.text(TEXT_OFFSET_HOR+170, TEXT_OFFSET_VER+380, 'Los ancestrales', styleText2);

    let textK = 'Apple Jump is a skill game where you must move the\n'
    textK += 'platforms to get the ball to the end.\n';
    textK += 'You will find power-ups and traps that will make\n';
    textK += 'the game more exciting.';
    game.add.text(TEXT_OFFSET_HOR+275, TEXT_OFFSET_VER+505, textK, styleText);

    buttonBack = game.add.button(150, 750, 'buttonBack', back);
    buttonBack.anchor.setTo(0.5, 0.5);
    buttonBack.scale.setTo(0.7);

    function back(){
        musicMenu.destroy();
        game.state.start('init');
    }
}

function updateAbout()
{
    if (buttonBack.input.pointerOver())
    {
        buttonBack.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else
    {
        buttonBack.scale.setTo(0.6, 0.6);
    }
}