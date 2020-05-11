let endState = {

    preload: preloadEnd,
    create: createEnd,
    update: updateEnd
};

TEXT_OFFSET_HOR_E = 40;
TEXT_OFFSET_VER_E = 40;

//Declara unas variables
let SKey;
let counter;
let clockText = 0;

//Precarga imagenes y audio
function preloadEnd() 
{
    game.load.image('background_end', 'assets/imgs/background_end.png');
    game.load.image('background_win', 'assets/imgs/win.jpg');
    game.load.image('background_lose', 'assets/imgs/lost.jpg');

    game.load.audio('musicEndScreen', 'assets/snds/musicEndScreen.wav');
    game.load.audio('musicWin', 'assets/snds/LevelWin.wav');
    game.load.audio('musicDefeat', 'assets/snds/LevelDefeat.wav');
}
//Esta funcion genera las imagenes y el texto con la información
function createEnd() 
{
    game.scale.setGameSize(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT);
    //Reproduce la música
    musicEndScreen = game.add.audio('musicEndScreen');
    musicEndScreen.loop = true;
    musicEndScreen.play();
    //Aquí tiene en cuenta si se le pulsa S
    SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

    let styleI = {font: '30px Sniglet', fill: '#000000', strokeThickness: '1'};
    //En caso de GameOver pone un fondo y en caso de victoria otro.
    if (condition == 'derrota'){
        background = game.add.sprite(0, 0, 'background_lose');
        background.scale.setTo(1,1);
    }
    else{
        background = game.add.sprite(0, 0, 'background_win');
        background.scale.setTo(1,1);
    }
    
    let textI = 'Número de plataformas derribadas: ';
    let instructions = game.add.text(TEXT_OFFSET_HOR_E+80, TEXT_OFFSET_VER_E+250, textI, styleI);
    

    let textJ = 'Pulsa S para volver a intentarlo';
    let instructionsJ = game.add.text(TEXT_OFFSET_HOR_E+80, TEXT_OFFSET_VER_E+350, textJ, styleI);


    counter = 15;
    createTimer();

}
//Controla si se pulsa S o no
function updateEnd()
{
    if (SKey.isDown) {
        musicEndScreen.stop();
        game.state.start('level1');
    }
}
//Da formato a la cuenta atrás creada
function createTimer()
{
    clockText = game.add.text(TEXT_OFFSET_HOR_E+80, TEXT_OFFSET_VER_E+450, 'Counter: ' + counter + '  ');
    clockText.font = 'Sniglet';
    clockText.fontSize = "30px";

    clockText.stroke = '#000000';
    clockText.strokeThickness = 1;

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}
//Controla los números pasar en el texto del tiempo
function updateCounter() 
{
    counter--;
    clockText.setText('Counter: ' + counter + '  ');
    if (counter == 0)
    {
        musicEndScreen.destroy();
        game.state.start('init');
    }
}
