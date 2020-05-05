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
        game.state.start('init');
    }
/*
    function nombreJugador(){
        document.getElementById("player").style.display = "block"; //Esto sacaría a la luz los botones


        document.getElementById("player");
        Meter aquí toda la movida del formato del cartel
        https://www.geeksforgeeks.org/hide-or-show-elements-in-html-using-display-property/
        Esto me lo dejo aquí para luego


Una forma que creo que funcionaría mejor que la de arriba
https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
<body>
	<form>
		<input type = ''radio'' name= ''nombre'' value ''yes''> Yes
	</form>
	<script>
	const aceptar_nombre = document.querySelector('#aceptar_nombre' );
	//handle click button
	aceptar_nombre.onclick = nombreJugador(){
		const rbs = document.querySelectorAll('input[name = "nombre"]' );
		let selectedValue;
		for (const rb of rbs){
			if (rb.checked){
				selectedValue = rb.value;
				break;
					}
		}
		alert(selectedValue);
};
    }*/
//Haría falta varias funciones de callback para detectar pulsación en el boton de radio para cambiar el nombre de jugador Practica 1 slider para controlar la opacidad del canvas misma funcion de callback
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