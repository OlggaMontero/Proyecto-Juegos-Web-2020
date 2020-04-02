const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;

let aboutState = {

    preload: preloadAbout,
    create: createAbout
};

function preloadAbout() {
}

function createAbout() {
    let textI = 'El nombre del equipo es: Los ancestrales\n';
    textI += 'y esta es la pantalla del about';
    let styleI = {font: '20px Arial', fill: '#FFFFFF'};
    let instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);
}
