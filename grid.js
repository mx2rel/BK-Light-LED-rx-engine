const grid = document.getElementById('grid-container');
let lights = [];

function initGrid() {
    grid.innerHTML = '';
    lights = Array.from({ length: WIDTH }, () => Array(HEIGHT));

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const div = document.createElement('div');
            div.className = 'pixel';
            div.onmousedown = () => pixelClicked(x, y);
            div.onmouseenter = (e) => { if (e.buttons === 1) pixelEnteredClicked(x, y); };
            div.onmouseup = () => pixelUnclicked(x, y)
            div.style.backgroundColor = "#000000"
            grid.appendChild(div);
            lights[x][y] = div;
        }
    }
}

function updateGridPixel(x, y, color) {
    lights[x][y].style.backgroundColor = `#${color}`;
}

initGrid();