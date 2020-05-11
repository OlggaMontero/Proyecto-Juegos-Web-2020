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
    numberOfPowerups = levelJSON.ObjectsInMap.powerup.length;
    
    for (i = 0; i < numberOfPlatforms; i++)
    {
        let x = levelJSON.ObjectsInMap.platforms[i].position.x;
        let y = levelJSON.ObjectsInMap.platforms[i].position.y;
        let type = levelJSON.ObjectsInMap.platforms[i].type;
        createAssetsJSON(x, y, type);
    }
    for (i = 0; i < numberOfObstacles; i++)
    {
        let x = levelJSON.ObjectsInMap.obstacles[i].position.x;
        let y = levelJSON.ObjectsInMap.obstacles[i].position.y;
        let type = levelJSON.ObjectsInMap.obstacles[i].type;
        createAssetsJSON(x, y, type);
    }
    for (i = 0; i < numberOfPowerups; i++)
    {
        let x = levelJSON.ObjectsInMap.powerup[i].position.x;
        let y = levelJSON.ObjectsInMap.powerup[i].position.y;
        let type = levelJSON.ObjectsInMap.powerup[i].type;
        createAssetsJSON(x, y, type);
    }
}

function createAssetsJSON(x, y, platformTypes)
{
    x = 0
    for(i = 0; i < 10; i++)
    {
        
        if (platformTypes[i] != 0)
        {
            let asset = createAsset(x, y, platformTypes[i]);
            assets.push(asset);
        }
        x += 40;
    }
}

function preloadLevels()
{

}