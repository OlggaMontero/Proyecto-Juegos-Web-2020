const TEXT_OFFSET_HOR_P = 40;
const TEXT_OFFSET_VER_P = 40;

let playerState = {

    preload: preloadPlayer,
    create: createPlayer,
    update: updatePlayer
};

function preloadPlayer() {
    game.load.image('bg', 'assets/imgs/playerScreen.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');

    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');

}

function createPlayer() {
    nombreJugador();

    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    
    let textI = 'En esta pantalla el jugador debe escoger un nombre\n';
    textI += 'o escribir el suyo\n';
    let styleI = {font: '25px Sniglet', fill: '#000000', fontWeight: 'bold', align: 'center'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_P+300, TEXT_OFFSET_VER_P+300, textI, styleI);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-50, extPosY+350, 'buttonBack', back);
    buttonBack.anchor.setTo(0.5, 0.5);
    buttonBack.scale.setTo(0.7);

    function back(){
        musicMenu.destroy();
        game.state.start('init');
    }

    function nombreJugador(){
        document.getElementById("player").style.display = "block"; //Esto sacaría a la luz los botones
        var nombre = document.getElementById("player").value;
        return nombre;
        //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_text_value2
    }
//para detectar pulsación en el boton de radio para cambiar el nombre de jugador Practica 1 slider para controlar la opacidad del canvas misma funcion de callback

}
function updatePlayer(){

    if (buttonBack.input.pointerOver()){
        buttonBack.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else{
        buttonBack.scale.setTo(0.6, 0.6);
    }
}