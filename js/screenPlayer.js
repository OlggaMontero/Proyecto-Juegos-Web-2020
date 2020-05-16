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

function createPlayer() { //Cambiar nombre funcion da lugar a confusion
    CambiarNombre();
    
    document.getElementById("player").style.display = "block"; //Esto sacaría a la luz los botones

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

    function back()
    {
        musicMenu.destroy();
        game.state.start('init');
    }
}
//En el HTML: PRIMERA O SEGUNDA PRACTICA FUENTES DE GOOGLE EN ESTILOS
/*
<div id = "player" style="display: none; position: absolute; left: 60%; top: 60%; font: '25px Sniglet'; " > 
            <input type= "button" id="aceptar_nombre" value="Acepto este nombre" onclick="CambioNombre"><br>
            <input type="radio" name="nombre" value="Newton" onclick="setName(this)"> Newton<br>
            <input type="radio" name="nombre" value="Olga" onclick="setName(this)"> Olga<br>
            <input type="radio" name="nombre" value="Sara" onclick="setName(this)"> Sara<br>
            */

//Funcion que muestra el selector de nombres del jugador y permite interactuar
function CambiarNombre(){
    nombresRadio = ['Newton','Olga','Fer','Sara'];
    nameAvailable=false;
    for (let name in nombresRadio)
        if (document.getElementById(name).checked)
            nameAvailable=true;
            nombre=document.getElementById(name).value;
    if (!nameAvailable)
    {
        nombre=document.getElementById('textPlayer').value;
    }
    return nombre;
}

function updatePlayer()
{
    if (buttonBack.input.pointerOver())
    {
        buttonBack.scale.setTo(0.9, 0.9);
        optionOnHover.play();
    }
    else
    {
        buttonBack.scale.setTo(0.6, 0.6);
    }
}