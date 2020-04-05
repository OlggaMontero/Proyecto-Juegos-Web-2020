
let level1State = {

    preload: preloadLevel1,
    create: createLevel1
};

function preloadLevel1() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
}

function createLevel1() {
    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');
}
