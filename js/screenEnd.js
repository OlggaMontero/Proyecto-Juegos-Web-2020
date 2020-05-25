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
    game.load.image('buttnBack', 'assets/imgs/button_back.png');

    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');
    game.load.audio('musicEndScreen', 'assets/snds/musicEndScreen.wav');
    game.load.audio('musicWin', 'assets/snds/LevelWin.wav');
    game.load.audio('musicDefeat', 'assets/snds/LevelDefeat.wav');
}

function createEnd() 
{
    game.scale.setGameSize(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT);
    background = game.add.sprite(0, 0, 'background_win');
    if (condition == 'lose')
    {
        background = game.add.sprite(0, 0, 'background_lose');
    }
    background.scale.setTo(1,1);
    clockText = 0;

    musicEndScreen = game.add.audio('musicEndScreen');
    musicEndScreen.loop = true;
    musicEndScreen.play();
    optionOnHover = game.add.audio('OptionOnHover');

    buttnBack = game.add.button(150, 700, 'buttnBack', back);
    buttnBack.anchor.setTo(0.5, 0.5);
    buttnBack.scale.setTo(0.7);

    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);

    keyS.onDown.add(function() { 
        musicEndScreen.stop();
        startCurrentLevel();
    }, this);

    let styleI = {font: '30px Sniglet', fill: '#000000', strokeThickness: '1'};

    let textI = 'Platforms knocked down: ' + totalPlatformsKnocked;
    totalPlatformsKnocked = 0; 
    game.add.text(TEXT_OFFSET_HOR_E+80, TEXT_OFFSET_VER_E+250, textI, styleI);

    let textJ = 'Press S to play again!';
    game.add.text(TEXT_OFFSET_HOR_E+80, TEXT_OFFSET_VER_E+350, textJ, styleI);

    counter = 15;
    createTimer();
}

function updateEnd()
{
    if (buttnBack.input.pointerOver())
    {
        buttnBack.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else
    {
        buttnBack.scale.setTo(0.7);
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

function back()
    {
        //document.getElementById("player").style.display = "none"; //Hide the names options when returning to the main menu
        musicEndScreen.destroy();
        game.state.start('init');
    }

