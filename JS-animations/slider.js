const track = document.getElementById("img-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage || 0) + percentage;
    const clampedPercentage = Math.min(Math.max(nextPercentage, -100), 0);

    
    track.dataset.percentage = clampedPercentage;
         
    track.style.transform = `translate(${clampedPercentage}%, 45%)`;

    for(const image of track.getElementsByClassName("image")){
        image.style.objectPosition = `${100 + clampedPercentage}% center`;
    }
}

window.onwheel = e => {
    e.preventDefault();
    
    const currentPercentage = parseFloat(track.dataset.percentage || 0);
    const scrollSpeed = 3; // Velocidad de scroll (ajustable)
    const delta = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
    const nextPercentage = currentPercentage + delta;
    const clampedPercentage = Math.min(Math.max(nextPercentage, -100), 0);

    track.dataset.percentage = clampedPercentage;
    track.dataset.prevPercentage = clampedPercentage;
    
    track.style.transform = `translate(${clampedPercentage}%, 45%)`;

    for(const image of track.getElementsByClassName("image")){
        image.style.objectPosition = `${100 + clampedPercentage}% center`;
    }
}