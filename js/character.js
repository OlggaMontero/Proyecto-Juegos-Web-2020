//Funcion para crear al personaje jugable
function createCharacter()
{
    character = game.add.sprite(200, 100, 'character'); //Se carga la imagen del personaje con su posición
    character.scale.setTo(0.04, 0.04); //Se establece el tamaño del personaje
    game.physics.arcade.enable(character); //Se le ponen físicas al personaje
    character.body.collideWorldBounds = true; //Se activan las colisiones con el personaje
    character.body.bounce.y = 0.7; //Se establece un valor a su rebote
    character.body.gravity.y = 500; //Se establece un valor a su gravedad
    game.camera.follow(character, Phaser.Camera.FOLLOW_PLATFORMER); //Se establece que la cámara siga al personaje

    //Para hacer el rebote eterno
    if (game.physics.arcade.collide (character, "platform" )) { 
        //Habría que hacer una distinción luego para cada plataforma/obstáculo/enemigo
        character.body.bounce.y = 0.7;
        
    }
}
//Funcion para la vida del personaje
function createLife()
{
    lifeText = game.add.text(x-30, y-700, life + '% '); //Se coloca un texto para mostrar el valor de la vida del personaje
    lifeText.anchor.setTo(0.5); 
    //Formato del texto
    lifeText.font = '20px Revalia';
    lifeText.fontSize = 20;
    lifeText.fixedToCamera = true; //Se fija a la pantalla para que la cámara no lo pierda
    //Se realiza una barra de vida
    healthBar = game.add.sprite(x-270, y-720, 'healthBar');
    healthBar.scale.setTo(0.15, 0.15);
    healthBar.fixedToCamera = true;
}
//Funcion para controlar el daño que recibe el personaje
function characterHurt(damage)
{
    healthBar.width = healthBar.width - damage; //Esto va recortando la barra de vida cuando se recibe daño
    life -= damage; //Le quita el daño a la vida
    lifeText.setText(life + '%');  
    //Esta condición controla si el personaje llega a 0 con su vida que se vaya a la pantalla de GameOver
    if (life <= 0)
    {
        musicFirstLevel.destroy();
        condition = 'derrota';
        game.state.start('screenEnd');
    }
}
