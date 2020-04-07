

let endState = {

    preload: preloadEnd,
    create: createEnd,
    update: updateEnd
};

TEXT_OFFSET_HOR_E = 40;
TEXT_OFFSET_VER_E = 40;

let SKey;
let counter;
let clockText = 0;


function preloadEnd() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
}

function createEnd() {

    SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

    fondo = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg');
    
    let textI = 'Número de plataformas derribadas: \n';
    textI += 'Has ganado o perdido: ';
    let styleI = {font: '20px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_E, TEXT_OFFSET_VER_E, textI, styleI);

    let textJ = 'Pulsa S para volver a la pantalla inicial';
    let instructionsJ = game.add.text(TEXT_OFFSET_HOR_E, TEXT_OFFSET_VER_E+100, textJ, styleI);

    counter = 15;
    createTimer();
    updateTime();

}

function updateEnd(){
    if (SKey.isDown) {
        game.state.start('init');
    }
}

function createTimer(){
    clockText = game.add.text(TEXT_OFFSET_HOR_E+150, TEXT_OFFSET_VER_E+250, 'Counter: ' + counter + '  ');
    clockText.anchor.setTo(0.5, 0.5);
    clockText.font = '20px Revalia';
    clockText.fontSize = 30;

    clockText.align = 'left';
    clockText.stroke = '#000000';
    clockText.strokeThickness = 2;
    clockText.fixedToCamera = true;

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    clockText.fixedToCamera = true;
}

function updateCounter() {
    counter--;
    clockText.setText('Counter: ' + counter + '  ');
    if (counter == 0){
        game.state.start('init');
    }
}
