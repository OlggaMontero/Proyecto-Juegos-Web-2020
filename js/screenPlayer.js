const TEXT_OFFSET_HOR_P = 40;
const TEXT_OFFSET_VER_P = 40;

let playerState = {

    preload: preloadPlayer,
    create: createPlayer,
    update: updatePlayer
};

function preloadPlayer() 
{
    game.load.image('bg', 'assets/imgs/playerScreen.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');
    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');

    document.getElementById("chooseName").style.display = "block"; //This shows the name change buttons
}

function createPlayer() //Cambiar nombre funcion da lugar a confusion 
{ 
    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');
    
    let textI = 'To play, you have to choose between these pre-established names \n';
    textI += 'or you can write your own if this adventurers do not fit you\n';
    let styleI = {font: '25px Sniglet', fill: '#000000', fontWeight: 'bold', align: 'center'};
    game.add.text(TEXT_OFFSET_HOR_P+100, TEXT_OFFSET_VER_P+300, textI, styleI);

    let extPosX = 200;
    let extPosY = 350;
    buttonBack = game.add.button(extPosX-50, extPosY+350, 'buttonBack', back);
    buttonBack.anchor.setTo(0.5, 0.5);
    buttonBack.scale.setTo(0.7);

    function back()
    {
        if (username!="")
        {
            document.getElementById("chooseName").style.display = "none"; //Hide the names options when returning to the main menu
            musicMenu.destroy();
            game.state.start('init');
        }
    }
}

//These two global variables help the name change functions
var username = "";
var currentRadiobtn = undefined;
//This function manages the radio buttons that chooses the predefined names
function CambiarNombre(elem)
{
    //console.log(elem.value); //For control purposes
    username = elem.value;
    currentRadiobtn = elem;
}
//This function manages the label that the player can write into
function CambiarNombreLabel(element)
{
    //If some radio button is enabled this condition disables it
    if (currentRadiobtn != undefined)
    {
        currentRadiobtn.checked = false;
    }
    username = element.value;
}

function updatePlayer()
{
    if(username!="")
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
}