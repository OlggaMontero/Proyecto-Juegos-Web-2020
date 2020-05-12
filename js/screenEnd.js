let endState = {

    preload: preloadEnd,
    create: createEnd,
    update: updateEnd
};

TEXT_OFFSET_HOR_E = 40;
TEXT_OFFSET_VER_E = 40;

let keyS;
let counter;
let clockText = 0;


function preloadEnd() 
{
    game.load.image('background_end', 'assets/imgs/background_end.png');
    game.load.image('background_win', 'assets/imgs/win.jpg');
    game.load.image('background_lose', 'assets/imgs/lost.jpg');

    game.load.audio('musicEndScreen', 'assets/snds/musicEndScreen.wav');
    game.load.audio('musicWin', 'assets/snds/LevelWin.wav');
    game.load.audio('musicDefeat', 'assets/snds/LevelDefeat.wav');
}

function createEnd() 
{
    game.scale.setGameSize(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT);

    musicEndScreen = game.add.audio('musicEndScreen');
    musicEndScreen.loop = true;
    musicEndScreen.play();

    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);

    let styleI = {font: '30px Sniglet', fill: '#000000', strokeThickness: '1'};
    
    if (condition == 'derrota')
    {
        background = game.add.sprite(0, 0, 'background_lose');
        background.scale.setTo(1,1);
    }
    else
    {
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

function updateEnd()
{
    if (keyS.isDown) 
    {
        musicEndScreen.stop();
        startCurrentLevel();
    }
}

function createTimer()
{
    clockText = game.add.text(TEXT_OFFSET_HOR_E+80, TEXT_OFFSET_VER_E+450, 'Counter: ' + counter + '  ');
    clockText.font = 'Sniglet';
    clockText.fontSize = "30px";

    clockText.stroke = '#000000';
    clockText.strokeThickness = 1;

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

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
