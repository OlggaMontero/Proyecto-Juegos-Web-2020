const SHIP_OFFSET_HOR = 550;
const SHIP_OFFSET_VER = 150;

let selected;

let initState = {

    preload: preloadInit,
    create: createInit
};

function preloadInit() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonAbout', 'assets/imgs/button_about.png');
    game.load.image('buttonPlayer', 'assets/imgs/button_PlayerSelection.png');
    game.load.image('buttonInstructions', 'assets/imgs/button_instructions.png');
    game.load.image('buttonLevel1', 'assets/imgs/level1.png');
}

function createInit() {

    let w = game.world.width;
    let h = game.world.height;

    game.world.setBounds(0, 0, w, h);  
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    selected = null;

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;

    btnAbout = game.add.button(posX-250, posY+50, 'buttonAbout', startAbout);
    btnAbout.anchor.setTo(0.5, 0.5)
    btnAbout.scale.setTo(0.15);

    btnInstructions = game.add.button(posX+325, posY+50, 'buttonInstructions', startInstructions);
    btnInstructions.anchor.setTo(0.5, 0.5);
    btnInstructions.scale.setTo(0.6);

    btnPlayer = game.add.button(posX+50, posY+50, 'buttonPlayer', startPlayer);
    btnPlayer.anchor.setTo(0.5, 0.5);
    btnPlayer.scale.setTo(0.6);

    btnLevel1 = game.add.button(posX+50, posY-200, 'buttonLevel1', startLevel1);
    btnLevel1.anchor.setTo(0.5, 0.5);
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
