let snakeHead = { x: 3, y: 3 };
let prevSnakeHeads = [{ x: 0, y: 0 }];
let dir = { x: 1, y: 0 };
let length = 5;
let food = null;

function snakeStart() {
    setInterval(snakeTick, 200);
    fillColor("0");
    ticking = true;

    document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                dir = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                dir = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                dir = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                dir = { x: 1, y: 0 };
                break;
        }
    }
}

function snakeTick() {

    function reset() {
        snakeHead = { x: 3, y: 3 };
        prevSnakeHeads = [{ x: 0, y: 0 }];
        dir = { x: 1, y: 0 };
        length = 5;
        food = null;
        fillColor("000000");
    }

    prevSnakeHeads.push({ ...snakeHead });
    let pixels = [
        { x: snakeHead.x, y: snakeHead.y, color: "FF0000" }
    ];

    for (let y = 0; y < HEIGHT; y++) {
        pixels.push({ x: 0, y: y, color: "ff0000" });
        pixels.push({ x: WIDTH - 1, y: y, color: "ff0000" });
    }
    for (let x = 0; x < WIDTH; x++) {
        pixels.push({ x: x, y: 0, color: "ff0000" });
        pixels.push({ x: x, y: HEIGHT - 1, color: "ff0000" });
    }


    if (food == null) {
        spawnFood(pixels);
    }
    if (prevSnakeHeads.length > length) {
        const tail = prevSnakeHeads.shift();
        if (pixels.filter(p => p.x === tail.x && p.y === tail.y).length === 0)
            pixels.push({ x: tail.x, y: tail.y, color: "000000" });
    }

    snakeHead.x += dir.x;
    snakeHead.y += dir.y;

    if (snakeHead.x == food.x && snakeHead.y == food.y) {
        length += 2;
        spawnFood(pixels);
    }
    if (snakeHead.x == 0 || snakeHead.x >= WIDTH - 1 || snakeHead.y == 0 || snakeHead.y >= HEIGHT - 1) {
        reset();
        return;
    }

    if (prevSnakeHeads.some(part => part.x === snakeHead.x && part.y === snakeHead.y)) {
        reset();
        return;
    }

    pixels.push({ x: snakeHead.x, y: snakeHead.y, color: "FFFFFF" });

    updatePixels(pixels);
}

function spawnFood(pixels) {
    let fx = Math.floor(Math.random() * (WIDTH - 2)) + 1;
    let fy = Math.floor(Math.random() * (HEIGHT - 2)) + 1;
    food = { x: fx, y: fy };
    pixels.push({ x: fx, y: fy, color: "00FF00" });
}

toolButton("Start snake", snakeStart, "games");