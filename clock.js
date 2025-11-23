
function clockStart() {
    setInterval(clockTick, 1000 / 3);
    fillColor("0");
    ticking = true;
}

async function clockTick() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    let timeString = `${hours}:${minutes}:${seconds}`;
    const pixels = getTextPixels({ text: timeString, left: 0, top: 0, color: "FFFFFF" });

    let s = (now.getSeconds() / 60);
    for (let x = 0; x < WIDTH; x++) {
        const ms = (now.getMilliseconds());
        const last = (x + 1) / WIDTH >= s
        pixels.push({ x: x, y: 7, color: x / WIDTH < s ? "FFFFFF" : "000000" });
        if (ms >= 333 || !last)
            pixels.push({ x: x, y: 8, color: x / WIDTH < s ? "FFFFFF" : "000000" });
        if (ms >= 666 || !last)
            pixels.push({ x: x, y: 9, color: x / WIDTH < s ? "FFFFFF" : "000000" });
    }

    let m = (now.getMinutes() / 60);
    for (let x = 0; x < WIDTH; x++) {
        pixels.push({ x: x, y: 10, color: x / WIDTH < m ? "FFFFFF" : "000000" });
        pixels.push({ x: x, y: 11, color: x / WIDTH < m ? "FFFFFF" : "000000" });
        pixels.push({ x: x, y: 12, color: x / WIDTH < m ? "FFFFFF" : "000000" });
    }

    await updatePixels(pixels, true);
}

toolButton("Clock", clockStart, "misc")