const TEXT_OFFSET_HOR_P = 40;
const TEXT_OFFSET_VER_P = 40;

let playerState = {

    preload: preloadPlayer,
    create: createPlayer
};

function preloadPlayer() {
    game.load.image('bg', 'assets/imgs/bg.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');
    game.load.image('button', 'assets/imgs/button.png');
}

function createPlayer() {

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');

    
    let textI = 'En esta pantalla el jugador\n';
    textI += 'debe escoger un nombre o escribir\n';
    textI += 'el suyo';
    let styleI = {font: '18px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_P, TEXT_OFFSET_VER_P, textI, styleI);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-150, extPosY+350, 'buttonBack', back);
    buttonBack.scale.setTo(0.7);

    function back(){
        game.state.start('init');
    }
    
    buttonSelectionPlayer = game.add.button(100, 100, 'button', ChangeName);
    buttonSelectionPlayer.scale.setTo(0.11);

    function ChangeName(){
        //Pasarle un parámetro al cartel que habrá en level1
        game.state.start('init'); //De momento lo devuelve al inicio al clickar
    }

    //squareTextoPlayer = game.add.input(10, 10, 'input', CuadroTexto);
    //squareTextoPlayer.scale.setTo(0.11);
//Aquí es donde en teoría se escribe el cuadro de texto, pero no sé cómo darle formato
//Input es la variable que metería en la siguiente pantalla para seguir con su nombre
    function CuadroTexto(){
        var input = document.createElement("input");
        input.type = "text";
        input.className = "css-class-name";
        CredentialsContainer.appendChild(input);
    }
/* He probado estas dos opciones y no me funcionan, supongo que les faltará algo...
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    var parent = document.getElementById("parentDiv");
    parent.appendChild(input);
*/
}