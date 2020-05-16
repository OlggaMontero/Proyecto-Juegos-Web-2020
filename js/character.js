function createCharacter(x, y)
{
    character = game.add.sprite(x, y, 'character'); 
    character.scale.setTo(0.04, 0.04); 
    game.physics.arcade.enable(character); 
    character.body.collideWorldBounds = true; 
    character.body.bounce.y = 0.7; 
    character.body.gravity.y = 500; 
    //character.body.velocity.y = -300
    game.camera.follow(character, Phaser.Camera.FOLLOW_PLATFORMER); 
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
    if (!hasBuble){
        hurtSound = game.add.audio('hurtSound');
        hurtSound.play();
        healthBar.width = healthBar.width - damage; 
        life -= damage; 
        lifeText.setText(life + '%');  
    }
    if (life <= 0)
    {
        musicLevel.destroy();
        condition = 'lose';
        game.state.start('screenEnd');
        hasPowerup = false;
    }
}
