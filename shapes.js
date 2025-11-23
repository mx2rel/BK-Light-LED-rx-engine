let shapesObjects = {}

function line(id, x1, y1, x2, y2, color) {
    const prev = shapesObjects[id]
    shapesObjects[id] = {
        func: getLinePixels, args: { x1: x1 ?? prev?.args.x1, y1: y1 ?? prev?.args.y1, x2: x2 ?? prev?.args.x2, y2: y2 ?? prev?.args.y2, color: color ?? prev?.args.color }
    }
}
function circle(id, x, y, r, color) {
    const prev = shapesObjects[id]
    shapesObjects[id] = {
        func: getCirclePixels, args: { x: x ?? prev?.args.x, y: y ?? prev?.args.y, r: r ?? prev?.args.r, color: color ?? prev?.args.color }
    }
}
function rectangle(id, x1, y1, x2, y2, color, fill = true) {
    const prev = shapesObjects[id]
    shapesObjects[id] = {
        func: getRectanglePixels, args: { x1: x1 ?? prev?.args.x1, y1: y1 ?? prev?.args.y1, x2: x2 ?? prev?.args.x2, y2: y2 ?? prev?.args.y2, color: color ?? prev?.args.color, fill: fill ?? prev?.args.fill }
    }
}
function getLinePixels({ x1, y1, x2, y2, color }) {
    let pixels = [];
    const a = (y2 - y1) / (x2 - x1);
    let currentY = y1
    for (let x = x1; x <= x2; x++) {
        pixels.push({ x: x, y: Math.round(currentY), color: color })
        currentY += + a
    }
    return pixels;
}

function getCirclePixels({ x, y, r, color }) {
    let pixels = [];
    for (let i = -r; i <= r; i++) {
        for (let j = -r; j <= r; j++) {
            if (i * i + j * j <= r * r) {
                pixels.push({ x: x + i, y: y + j, color: color });
            }
        }
    }
    return pixels;
}

function getRectanglePixels({ x1, y1, x2, y2, color, fill = true }) {
    let pixels = [];
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            if (fill || x === x1 || x === x2 || y === y1 || y === y2)
                pixels.push({ x: x, y: y, color: color });
        }
    }

    return pixels;
}