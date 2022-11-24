function animation () {
    let frameWidth = 32;
    let frames = 4;
    let div = document.getElementsByClassName('animation')[0]
    let frame = 0;
    setInterval( () => {
        let frameOffset = (++frame % frames) * -frameWidth;
        div.style.backgroundPosition = frameOffset +"px 0px";}, 100);
}