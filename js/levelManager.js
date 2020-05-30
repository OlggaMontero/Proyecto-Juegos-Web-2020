function loadJSON(level)
{
    let i;
    for (i = 0; i < assets.length; i++)
    {
        assets[i].destroy();
        assets = [];
    }
    let levelJSON = JSON.parse(game.cache.getText(level));

    numberOfPlatforms = levelJSON.ObjectsInMap.platforms.length;
    numberOfObstacles = levelJSON.ObjectsInMap.obstacles.length;

    if (levelToPlay!=0 && levelToPlay!=1)
    {
        numberOfBubles = levelJSON.ObjectsInMap.bubles.length;
    }
    
    for (i = 0; i < numberOfPlatforms; i++)
    {
        let x = levelJSON.ObjectsInMap.platforms[i].position.x;
        let y = levelJSON.ObjectsInMap.platforms[i].position.y;
        //levelJSON.ObjectsInMap.platforms[i].siguiente = levelJSON.ObjectsInMap.platforms[i+1]; // check i+1
        let type = levelJSON.ObjectsInMap.platforms[i].type;
        createAssetsJSON(x, y, type, true);
    }
    for (i = 0; i < numberOfObstacles; i++)
    {
        let x = levelJSON.ObjectsInMap.obstacles[i].position.x;
        let y = levelJSON.ObjectsInMap.obstacles[i].position.y;
        let type = levelJSON.ObjectsInMap.obstacles[i].type;
        // levelJSON.ObjectsInMap.platforms[i].obstacles = 
        createAssetsJSON(x, y, type, false);
    }
    if (levelToPlay!=0 && levelToPlay!=1)
    {
        for (i = 0; i < numberOfBubles; i++)
        {
            let x = levelJSON.ObjectsInMap.bubles[i].position.x;
            let y = levelJSON.ObjectsInMap.bubles[i].position.y;
            let type = levelJSON.ObjectsInMap.bubles[i].type;
            createAssetsJSON(x, y, type, false);
        }
    }
}

function createAssetsJSON(x, y, platformTypes, addTriggerToLane)
{
    x = 0;
    //assetsNow=[];

    for(i = 0; i < 10; i++) //Este 10 es número mágico, debería ser la fila .length
    {
        //limitLeft = 0;
        if (platformTypes[i] != 0)
        {
            let asset = createAsset(x, y, platformTypes[i]);
            assets.push(asset);
            /*if (platformTypes[i] == 1){
                limitLeft = x;
            }*/
            //vamos estableciendo el limite de la izquierda
            //limite de la izquiedda = 0
            
            /*if (platformTypes[i]==9){
                //ya tyenemos el limite de la izq, nos lo guardamos 
                //lka siguiente platagorma que encontremos que sea 1 es la derecha 
                //lo guardmaos todo
            }*/
        }
        //x += 40;
       
        if (platformTypes[i] == 0){
            let asset = createPowerupsInMap();
            if (asset!=""){
                newAsset = createPowerup(x, y, asset);
                assets.push(newAsset);
            }
        }
        x += PLATFORM_SIZE;
    }
    if (addTriggerToLane)
    {
        let colliderBox;
        colliderBox = game.add.sprite(0, y + 10, 'platform');
        game.physics.arcade.enable(colliderBox);
        colliderBox.body.immovable = true;
        colliderBox.height = 20;
        colliderBox.width = 200000;
        colliderBox.alpha = 0;
        colliderBoxes.push(colliderBox);
    }
    //Añadir assetsNow a assets
    //return assetsNow;
}