const SHIP_OFFSET_HOR = 550;
const SHIP_OFFSET_VER = 150;

let selected;
let pointer;

let initState = 
{
    preload: preloadInit,
    create: createInit,
    update: updateInit
};

function preloadInit() 
{
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonAbout', 'assets/imgs/button_about.png');
    game.load.image('buttonPlayer', 'assets/imgs/button_playerSelection.png');
    game.load.image('buttonInstructions', 'assets/imgs/button_instructions.png');
    game.load.image('buttonLevel1', 'assets/imgs/level1.png');
    game.load.image('buttonLevel2', 'assets/imgs/level2.png');
    game.load.image('buttonLevel3', 'assets/imgs/level3.png');
    game.load.image('character', 'assets/imgs/character.png');
    game.load.image('platform', 'assets/imgs/platform.png');

    game.load.audio('MusicMenu', 'assets/snds/MusicMenu.wav');
    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');
    game.load.audio('OptionChosen', 'assets/snds/MenuOptionChosen.mp3');
}

function createInit() 
{   
    game.scale.setGameSize(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT);
    game.world.setBounds(0, 0, GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, true, true, true, true);

    let w = game.world.width;
    let h = game.world.height;

    game.world.setBounds(0, 0, w, h);  
    background = game.add.sprite(0, 0,'bg'); 
    background.scale.setTo(0.8, 1.2); 

    selected = null;
    totalPlatformsKnocked = 0;

    musicMenu = game.add.audio('MusicMenu');
    musicMenu.loop = true;
    musicMenu.play();
    
    optionOnHover = game.add.audio('OptionOnHover');
    optionChosen = game.add.audio('OptionChosen');

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

    btnLevel1 = game.add.button(posX+0, posY-200, 'buttonLevel1', function (){ startLevel(0)});
    btnLevel1.anchor.setTo(0.5, 0.5);
    btnLevel1.scale.setTo(0.1);

    btnLevel2 = game.add.button(posX+200, posY-200, 'buttonLevel2', function() { startLevel(1)});
    btnLevel2.anchor.setTo(0.5, 0.5);
    btnLevel2.scale.setTo(0.1);

    btnLevel3 = game.add.button(posX+400, posY-200, 'buttonLevel3', function() {startLevel(2)});
    btnLevel3.anchor.setTo(0.5, 0.5);
    btnLevel3.scale.setTo(0.1);

    function startAbout() 
    {
        optionChosen.play();
        game.state.start('screenAbout');
    }

    function startInstructions() 
    {
        optionChosen.play();
        game.state.start('screenInstructions');
    }

    function startPlayer()
    {
        optionChosen.play();
        game.state.start('screenPlayer')
    }

    function startLevel(lvlNumber)
    {           
        if (username != "")
        {
            musicMenu.destroy();
            optionChosen.play();
            levelToPlay = lvlNumber;
            game.state.start('level');
        }
    }
    createAnimation();
}

function updateInit()
{
    onHoverButton();
    game.physics.arcade.collide(character, platform);
    character.body.bounce.y = 1;
}

function onHoverButton()
{
    if (username!="")
    {
        if (btnAbout.input.pointerOver())
        {
            btnAbout.scale.setTo(0.25, 0.25);
            optionOnHover.play();
        }
        else
        {
            btnAbout.scale.setTo(0.15, 0.15);
        }
        
        if (btnInstructions.input.pointerOver())
        {
            btnInstructions.scale.setTo(0.9, 0.9);
            optionOnHover.play();
        }
        else
        {
            btnInstructions.scale.setTo(0.6);
        }
        
        if (btnPlayer.input.pointerOver()){
            btnPlayer.scale.setTo(0.9);
            optionOnHover.play();
        }
        else
        {
            btnPlayer.scale.setTo(0.6);
        }

        if (btnLevel1.input.pointerOver())
        {
            btnLevel1.scale.setTo(0.15, 0.15);
            optionOnHover.play();
        }
        else
        {
            btnLevel1.scale.setTo(0.1);
        }

        if (btnLevel2.input.pointerOver())
        {
            btnLevel2.scale.setTo(0.15, 0.15);
            optionOnHover.play();
        }
        else
        {
            btnLevel2.scale.setTo(0.1);
        }

        if (btnLevel3.input.pointerOver())
        {
            btnLevel3.scale.setTo(0.15, 0.15);
            optionOnHover.play();
        }
        else
        {
            btnLevel3.scale.setTo(0.1);
        }
    }
}

function createAnimation()
{
    platform = game.add.sprite(50, 550, 'platform');
    platform.scale.setTo(0.1, 0.2);
    game.physics.arcade.enable(platform);
    platform.body.collideWorldBounds = true;
    platform.body.immovable = true;
    createCharacter(60, 100);
}
