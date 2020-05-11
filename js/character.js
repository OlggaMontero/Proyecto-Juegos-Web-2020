function createCharacter()
{
    character = game.add.sprite(200, 100, 'character'); 
    character.scale.setTo(0.04, 0.04); 
    game.physics.arcade.enable(character); 
    character.body.collideWorldBounds = true; 
    character.body.bounce.y = 0.7; 
    character.body.gravity.y = 500; 
    game.camera.follow(character, Phaser.Camera.FOLLOW_PLATFORMER); 

    
    if (game.physics.arcade.collide (character, "platform" )) 
    { 
        //Habría que hacer una distinción luego para cada plataforma/obstáculo/enemigo
        character.body.bounce.y = 0.7;
        
    }
}

function createLife()
{
    lifeText = game.add.text(x-30, y-700, life + '% '); 
    lifeText.anchor.setTo(0.5); 

    lifeText.font = '20px Revalia';
    lifeText.fontSize = 20;
    lifeText.fixedToCamera = true; 
  
    healthBar = game.add.sprite(x-270, y-720, 'healthBar');
    healthBar.scale.setTo(0.15, 0.15);
    healthBar.fixedToCamera = true;
}

function characterHurt(damage)
{
    healthBar.width = healthBar.width - damage; 
    life -= damage; 
    lifeText.setText(life + '%');  
    
    if (life <= 0)
    {
        musicFirstLevel.destroy();
        condition = 'derrota';
        game.state.start('screenEnd');
    }
}
