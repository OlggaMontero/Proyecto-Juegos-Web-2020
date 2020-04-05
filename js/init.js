const SHIP_OFFSET_HOR = 550;
const SHIP_OFFSET_VER = 150;

let selected;

let initState = {

    preload: preloadInit,
    create: createInit
};

function preloadInit() {
    game.load.image('button', 'assets/imgs/button.png');
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonLevel1', 'assets/imgs/level1.png');
}

function createInit() {

    game.world.setBounds(0, 0, 400, 800);
    
    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    selected = null;

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;

    btnAbout = game.add.button(posX+200, posY, 'button', startAbout);
    btnAbout.anchor.setTo(0.5, 0.5)
    btnAbout.scale.setTo(0.1);

    btnInstructions = game.add.button(posX+350, posY, 'button', startInstructions);
    btnInstructions.anchor.setTo(0.5, 0.5)
    btnInstructions.scale.setTo(0.1);

    btnPlayer = game.add.button(posX+500, posY, 'button', startPlayer);
    btnPlayer.anchor.setTo(0.5, 0.5)
    btnPlayer.scale.setTo(0.1);

    btnLevel1 = game.add.button(posX+350, posY-200, 'buttonLevel1', startLevel1);
    btnLevel1.anchor.setTo(0.5, 0.5)
    btnLevel1.scale.setTo(0.7);


    function startAbout() {
        game.state.start('screenAbout');
    }

    function startInstructions() {
        game.state.start('screenInstructions');
    }

    function startPlayer(){
        game.state.start('screenPlayer')
    }

    function startLevel1(){
        game.state.start('level1');
    }

}
