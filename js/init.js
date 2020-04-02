const SHIP_OFFSET_HOR = 550;
const SHIP_OFFSET_VER = 350;

let selected;

let initState = {

    preload: preloadInit,
    create: createInit
};

function preloadInit() {
    game.load.image('button', 'assets/imgs/button.png');
}

function createInit() {
    selected = null;

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;

    btnAbout = game.add.button(posX, posY, 'button', startAbout);
    btnAbout.anchor.setTo(0.5, 0.5)
    btnAbout.scale.setTo(0.1);

    btnAbout = game.add.button(posX+200, posY, 'button', startInstructions);
    btnAbout.anchor.setTo(0.5, 0.5)
    btnAbout.scale.setTo(0.1);

    function startAbout() {
        game.state.start('about');
    }

    function startInstructions() {
        game.state.start('instructions');
    }

}
