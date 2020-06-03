const TEXT_OFFSET_HOR_P = 40;
const TEXT_OFFSET_VER_P = 40;

let playerState = {

    preload: preloadPlayer,
    create: choosePlayer,
    update: updatePlayer
};

function preloadPlayer() 
{
    game.load.image('bg', 'assets/imgs/playerScreen.jpg');
    game.load.image('buttonBack', 'assets/imgs/button_back.png');
    game.load.audio('OptionOnHover', 'assets/snds/MenuOptionOnHover.wav');

    document.getElementById("chooseName").style.display = "block"; //This shows the name change buttons
}

function choosePlayer() 
{ 
    optionOnHover = game.add.audio('OptionOnHover');

    let w = game.world.width;
    let h = game.world.height;
    fondo = game.add.tileSprite(0, 0, w, h, 'bg');
    
    let textI = 'To play, you have to choose between these pre-established names \n';
    textI += 'or you can write your own if this adventurers do not fit you\n';
    let styleI = {font: '25px Sniglet', fill: '#000000', fontWeight: 'bold', align: 'center'};
    game.add.text(TEXT_OFFSET_HOR_P+100, TEXT_OFFSET_VER_P+300, textI, styleI);

    buttonBack = game.add.button(150, 700, 'buttonBack', back);
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

var username = "";
var currentRadiobtn = undefined;

function changeName(elem)
{
    username = elem.value;
    currentRadiobtn = elem;
}

function changeNameLabel(element)
{
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