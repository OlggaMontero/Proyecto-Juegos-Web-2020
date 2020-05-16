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

//Funcion que gestiona la selección de nombres
function CambiarNombre(){

    document.getElementById("player").style.display = "block"; //Esto sacaría a la luz los botones
    //var nombre = document.forms[0];
    // if (nombre[i].checked)
    //https://www.w3schools.com/jsref/prop_radio_checked.asp

    //Otra cosa por si sirve https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onchange
    nombresRadio = ['Newton','Olga','Fer','Sara'];
    nameAvailable=false;
    for (let name in nombresRadio)
        if (document.getElementById(name).checked)
            nameAvailable = true;
            nombre = document.getElementById(name).value;
    if (!nameAvailable)
    {
        nombre = document.getElementById('LabelName').value;
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