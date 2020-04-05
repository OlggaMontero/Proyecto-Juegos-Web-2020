const GAME_STAGE_WIDTH = 800;
const GAME_STAGE_HEIGHT = 600;

let game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'game');

// Entry point
window.onload = startGame;

function startGame() {

    game.state.add('init', initState);
    game.state.add('screenAbout', aboutState);
    game.state.add('screenInstructions', instructionsState);
    game.state.add('screenPlayer', playerState);
    game.state.add('level1', level1State);


    game.state.start('init');
}

