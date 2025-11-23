
async function paintPixel(x, y) {
    setPixel(x, y, document.getElementById('colorPicker').value.slice(1, 7))
}