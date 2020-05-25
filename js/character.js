function createCharacter(x, y)
{
    character = game.add.sprite(x, y, 'character'); 
    character.scale.setTo(0.04, 0.04); 
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
    lifeText.anchor.setTo(0.5); 
    lifeText.font = '25px Revalia';
    lifeText.fixedToCamera = true; 
    
    grd = lifeText.context.createLinearGradient(0, 0, 0, lifeText.canvas.height);
    grd.addColorStop(0, '#ffffff');
    
    lifeText.fill = grd;
    lifeText.stroke = '#000000';
    lifeText.strokeThickness = 2;
  
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
        game.state.start('screenEnd');
        hasPowerup = false;
    }
}

