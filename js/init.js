const SHIP_OFFSET_HOR = 550;
const SHIP_OFFSET_VER = 150;

let selected;
let musicOn = false;
let pointer;

let initState = {

    preload: preloadInit,
    create: createInit,
    update: updateInit
};


function preloadInit() {
    //cargamos las imagenes
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonAbout', 'assets/imgs/button_about.png');
    game.load.image('buttonPlayer', 'assets/imgs/button_PlayerSelection.png');
    game.load.image('buttonInstructions', 'assets/imgs/button_instructions.png');
    game.load.image('buttonLevel1', 'assets/imgs/level1.png');
    //game.load.image('character', 'assets/imgs/character.png');
    //game.load.image('platform', 'assets/imgs/platform.png');//Esto igual sobra depende de como quede

    //cargamos los audios
    game.load.audio('MusicMenu', 'assets/snds/MusicMenu.wav');
    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');
    game.load.audio('OptionChosen', 'assets/snds/MenuOptionChosen.mp3');
}

function createInit() {

    let w = game.world.width;
    let h = game.world.height;

    game.world.setBounds(0, 0, w, h);  
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    selected = null;

    musicMenu = game.add.audio('MusicMenu');

    if (musicOn == false){
        musicMenu.loop = true;
        musicMenu.play();
        musicOn = true;
    }
    
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

    btnLevel1 = game.add.button(posX+50, posY-200, 'buttonLevel1', startLevel1);
    btnLevel1.anchor.setTo(0.5, 0.5);
    btnLevel1.scale.setTo(0.7);


    function startAbout() {
        optionChosen.play();
        game.state.start('screenAbout');
    }

    function startInstructions() {
        optionChosen.play();
        game.state.start('screenInstructions');
    }

    function startPlayer(){
        optionChosen.play();
        game.state.start('screenPlayer')
    }

    function startLevel1(){
        musicMenu.destroy();
        musicMenu.stop
        optionChosen.play();
        game.state.start('level1');
    }
    createAnimation();
}

function updateInit(){
    onHoverButton();
    //game.physics.arcade.collide(character, platforms); //Esto hace que la pantalla se ponga en negro y no sé porqué
}

function onHoverButton(){
   
    if (btnAbout.input.pointerOver()){
        btnAbout.scale.setTo(0.25, 0.25);
        optionOnHover.play();
    }
    else{
        btnAbout.scale.setTo(0.15, 0.15);
    }
    

    if (btnInstructions.input.pointerOver()){
        btnInstructions.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else{
        btnInstructions.scale.setTo(0.6);
    }
    

    if (btnPlayer.input.pointerOver()){
        btnPlayer.scale.setTo(0.9);
        optionOnHover.play();
    }
    else{
        btnPlayer.scale.setTo(0.6);
    }


    if (btnLevel1.input.pointerOver()){
        btnLevel1.scale.setTo(0.8, 0.8);
        optionOnHover.play();
    }
    else{
        btnLevel1.scale.setTo(0.7);
    }
/*function createAnimation(){
    platform = game.add.sprite(50, 400, 'platform'); //Aquí no haría falta una imagen platform
    platform.scale.setTo(0.5, 0.3);
    game.physics.arcade.enable(platform);
    platform.body.collideWorldBounds = true;
    platform.body.immovable = true;

    //Y aquí mi duda es si esto sobraría porque ya está     createCharacter(); que se usa en character js todo preparado.
    character = game.add.sprite(150, 100, 'character');
    character.scale.setTo(0.1, 0.1);
    game.physics.arcade.enable(character);
    character.body.collideWorldBounds = true;
    character.body.bounce.y = 1;
    character.body.gravity.y = 500;
}*/
}
