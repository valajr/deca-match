const FRAMES = {
    'attack': 4,
    'attack_2': 6,
    'climb': 4,
    'death': 8,
    'hurt': 4,
    'idle': 4,
    'jump': 8,
    'pull': 6,
    'run': 6,
    'throw': 4,
    'walk': 6,
    'walk+attack': 6
}

function animation (robot, type) {
    let frameWidth = 32;
    let frames = FRAMES[type];
    let div = document.getElementById(robot);
    let frame = 0;
    div.style.backgroundImage = `url(import/imgs/${robot}_${type}.png)`;
    setInterval( () => {
        let frameOffset = (++frame % frames) * -frameWidth;
        div.style.backgroundPosition = frameOffset +"px 0px";}, 100);
}