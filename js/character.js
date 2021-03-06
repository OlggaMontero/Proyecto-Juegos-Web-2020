function createCharacter(x, y)
{
    character = game.add.sprite(x, y, 'character'); 
    character.scale.setTo(0.035, 0.035); 
    game.physics.arcade.enable(character); 
    character.body.collideWorldBounds = true; 
    character.body.bounce.y = 0.7; 
    character.body.gravity.y = 500; 
    character.body.velocity.y = -300;
    game.camera.follow(character); 
    game.camera.deadzone = new Phaser.Rectangle(40, 40, 300, 150);
}

function createLife()
{
    lifeText = game.add.text(x-50, y-705, life + '% '); 
    
    grd = lifeText.context.createLinearGradient(0, 0, 0, lifeText.canvas.height);
    grd.addColorStop(0, '#ffffff');
    putStyle(lifeText);
  
    healthBar = game.add.sprite(x-270, y-720, 'healthBar');
    healthBar.scale.setTo(0.15, 0.15);
    healthBar.fixedToCamera = true;
}

function characterHurt(damage)
{
    if (!hasBuble)
    {
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
        if (hasPowerup){
            powerupEnd();
        }
        game.state.start('screenEnd');
    }
}


