const SERVICE_UUID = "000000fa-0000-1000-8000-00805f9b34fb";
const CHAR_WRITE_UUID = "0000fa02-0000-1000-8000-00805f9b34fb";

const WIDTH = 64;
const HEIGHT = 16;

let device, server, service, characteristic;
let isConnected = false;
let pixels = [];

for (let x = 0; x < WIDTH; x++) {
    pixels[x] = [];
    for (let y = 0; y < HEIGHT; y++) {
        pixels[x][y] = "000000";
    }
}

let transaction = false;

function log(msg) {
    const logEl = document.getElementById('log');
    logEl.innerText = `> ${msg}\n` + logEl.innerText;
    console.log(msg);
}

async function connectBluetooth() {
    log("Requesting device...");
    device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [SERVICE_UUID]
    });

    device.addEventListener('gattserverdisconnected', onDisconnected);

    log("Connecting to GATT...");
    server = await device.gatt.connect();

    log("Getting Service...");
    service = await server.getPrimaryService(SERVICE_UUID);

    log("Getting Characteristic...");
    characteristic = await service.getCharacteristic(CHAR_WRITE_UUID);

    isConnected = true;
    log("Connected!");

    await sendInitPacket();

    await setPixel(0, 0, "0");

}

async function disconnect() {
    if (device && device.gatt.connected) {
        device.gatt.disconnect();
    }
}

function onDisconnected() {
    isConnected = false;
    log("Device disconnected.");
}



async function setPixel(x, y, hex) {
    if (x > WIDTH || y > HEIGHT) return;


    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const packet = new Uint8Array([0x0A, 0x00, 0x05, 0x01, 0x00, r, g, b, x, y]);

    try {
        await characteristic.writeValueWithoutResponse(packet);

        pixels[x][y] = hex;
        updateGridPixel(x, y, hex)

    } catch (e) { console.error(e); }
}


async function sendInitPacket() {
    // This specific sequence was in your logs before the image data
    const initData = new Uint8Array([0x08, 0x00, 0x01, 0x80, 0x10, 0x07, 0x2c, 0x00]);
    // Note: In the logs, the payload starts after the '52 06 00' ATT header. 
    // The log was: 06 00 08 00 01 80 ... 
    // We'll try sending the command associated with handle 0x0006

    // However, often with these devices, specific command headers define operations.
    // Let's assume the image header (09...) handles the mode switch, but just in case:
    // log("Sending init packet...");
    // await characteristic.writeValueWithoutResponse(initData); 
}



async function sendFullFrame(rgbData) {
    if (updateInProgress || (lastUpdate && (Date.now() - lastUpdate) < 200)) {
        return;
    }
    updateInProgress = true;
    if (!isConnected) { log("Not connected"); return; }

    const header = new Uint8Array([0x09, 0x0C, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x00, 0x00]);

    const fullPayload = new Uint8Array(header.length + rgbData.length);
    fullPayload.set(header);
    fullPayload.set(rgbData, header.length);

    log(`Sending Frame (${fullPayload.length} bytes)...`);

    // CHUNKING:
    // BLE MTU is usually limited. We must split the large payload into small chunks.
    // 244 bytes is a safe chunk size for modern Android/iOS (Max MTU is usually 512).
    // If it fails, reduce to 20.
    const CHUNK_SIZE = 500;

    for (let i = 0; i < fullPayload.length; i += CHUNK_SIZE) {
        const chunk = fullPayload.slice(i, i + CHUNK_SIZE);
        try {
            await characteristic.writeValueWithoutResponse(chunk);
            // Small delay to prevent flooding the buffer
            await new Promise(r => setTimeout(r, 10));
        } catch (e) {
            log("Write error: " + e);
            break;
        }
    }
    log("Frame Sent.");
    lastUpdate = Date.now();
    updateInProgress = false;
}

let updateInProgress = false;
let lastUpdate = null;

async function updatePixels(pixelUpdates, startEmpty = false) {

    let array = new Uint8Array(WIDTH * HEIGHT * 3)
    if (!startEmpty)
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                const hex = pixels[x][y];
                const r = parseInt(hex.slice(0, 2), 16);
                const g = parseInt(hex.slice(2, 4), 16);
                const b = parseInt(hex.slice(4, 6), 16);
                const index = (y * WIDTH + x) * 3;
                array[index] = r;
                array[index + 1] = g;
                array[index + 2] = b;
            }
        }
    else {
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                pixels[x][y] = "000000";
                updateGridPixel(x, y, "000000");
            }
        }
    }

    for (const update of pixelUpdates) {
        const { x, y, color } = update;
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) continue;
        pixels[x][y] = color;
        updateGridPixel(x, y, color);
        const r = parseInt(color.slice(0, 2), 16);
        const g = parseInt(color.slice(2, 4), 16);
        const b = parseInt(color.slice(4, 6), 16);
        const index = (y * WIDTH + x) * 3;
        array[index] = r;
        array[index + 1] = g;
        array[index + 2] = b;

    }

    await sendFullFrame(array);
}

async function fillColor(color) {
    let array = new Uint8Array(WIDTH * HEIGHT * 3)
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    for (let i = 0; i < array.length; i += 3) {
        array[i] = r;
        array[i + 1] = g;
        array[i + 2] = b;
    }
    await sendFullFrame(array);
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            pixels[x][y] = color;
            updateGridPixel(x, y, color)
        }
    }
}