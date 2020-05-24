const GAME_STAGE_WIDTH = 1000;
const GAME_STAGE_HEIGHT = 800;

let game;

let wfConfig = {
    active: function(){
        startGame();
    },

    google:{
        families: ['Rammetto One', 'Sniglet']
    },

    custom:{
        families: ['FerrumExtracondensed'],
        urls: ["https://fontlibrary.org/face/ferrum"]
    }
};

WebFont.load(wfConfig);

game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'game');

function startGame() {


    game.state.add('init', initState);
    game.state.add('screenAbout', aboutState);
    game.state.add('screenInstructions', instructionsState);
    game.state.add('screenPlayer', playerState);
    game.state.add('screenEnd', endState);
    game.state.add('level', level1State);
    
    game.state.start('init');
    
    document.getElementById("game").children[0].onmouseover = function(){mouse = true; };
    document.getElementById("game").children[0].onmouseout = function(){mouse = false; };
}

