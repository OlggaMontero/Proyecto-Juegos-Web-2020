const TEXT_OFFSET_HOR_I = 40;
const TEXT_OFFSET_VER_I = 40;

let instructionsState = {

    preload: preloadInstructions,
    create: createInstructions
};

function preloadInstructions() {
}

function createInstructions() {
    let textI = 'Esta es la pantalla de las instrucciones';
    let styleI = {font: '20px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR_I, TEXT_OFFSET_VER_I, textI, styleI);
}
