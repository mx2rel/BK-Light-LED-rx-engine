const FONT = {
    // --- UPPERCASE (3x4) ---
    "A": [
        [false, true, false],
        [true, false, true],
        [true, true, true],
        [true, false, true]
    ],
    "B": [
        [true, true, false],
        [true, false, true],
        [true, true, false],
        [true, true, false]
    ],
    "C": [
        [true, true, true],
        [true, false, false],
        [true, false, false],
        [true, true, true]
    ],
    "D": [
        [true, true, false],
        [true, false, true],
        [true, false, true],
        [true, true, false]
    ],
    "E": [
        [true, true, true],
        [true, true, false],
        [true, false, false],
        [true, true, true]
    ],
    "F": [
        [true, true, true],
        [true, true, false],
        [true, false, false],
        [true, false, false]
    ],
    "G": [
        [true, true, true],
        [true, false, false],
        [true, false, true],
        [true, true, true]
    ],
    "H": [
        [true, false, true],
        [true, true, true],
        [true, false, true],
        [true, false, true]
    ],
    "I": [
        [true],
        [true],
        [true],
        [true]
    ],
    "J": [
        [false, false, true],
        [false, false, true],
        [true, false, true],
        [false, true, false]
    ],
    "K": [
        [true, false, true],
        [true, true, false],
        [true, false, true],
        [true, false, true]
    ],
    "L": [
        [true, false, false],
        [true, false, false],
        [true, false, false],
        [true, true, true]
    ],
    "M": [
        [true, false, true],
        [true, true, true],
        [true, false, true],
        [true, false, true]
    ],
    "N": [
        [true, true, true],
        [true, false, true],
        [true, false, true],
        [true, false, true]
    ],
    "O": [
        [true, true, true],
        [true, false, true],
        [true, false, true],
        [true, true, true]
    ],
    "P": [
        [true, true, true],
        [true, false, true],
        [true, true, true],
        [true, false, false]
    ],
    "Q": [
        [true, true, true],
        [true, false, true],
        [true, true, true],
        [false, false, true]
    ],
    "R": [
        [true, true, true],
        [true, false, true],
        [true, true, false],
        [true, false, true]
    ],
    "S": [
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [true, true, false]
    ],
    "T": [
        [true, true, true],
        [false, true, false],
        [false, true, false],
        [false, true, false]
    ],
    "U": [
        [true, false, true],
        [true, false, true],
        [true, false, true],
        [true, true, true]
    ],
    "V": [
        [true, false, true],
        [true, false, true],
        [true, false, true],
        [false, true, false]
    ],
    "W": [
        [true, false, true],
        [true, false, true],
        [true, true, true],
        [true, false, true]
    ],
    "X": [
        [true, false, true],
        [false, true, false],
        [false, true, false],
        [true, false, true]
    ],
    "Y": [
        [true, false, true],
        [true, false, true],
        [false, true, false],
        [false, true, false]
    ],
    "Z": [
        [true, true, true],
        [false, true, true],
        [true, true, false],
        [true, true, true]
    ],

    // --- LOWERCASE (3x4) ---
    // Lowercase usually sits on the bottom, leaving the top row empty 
    // unless it has an ascender (like b, d, f, h, k, l, t).
    "a": [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
    ],
    "b": [
        [true, false, false],
        [true, true, false],
        [true, false, true],
        [true, true, false]
    ],
    "c": [
        [false, false, false],
        [false, true, true],
        [true, false, false],
        [false, true, true]
    ],
    "d": [
        [false, false, true],
        [false, true, true],
        [true, false, true],
        [false, true, true]
    ],
    "e": [
        [false, false, false],
        [true, true, true],
        [true, true, false],
        [false, true, true]
    ],
    "f": [
        [false, true, true],
        [true, false, false],
        [true, true, false],
        [true, false, false]
    ],
    "g": [
        [false, false, false],
        [true, true, true],
        [false, false, true],
        [true, true, false]
    ],
    "h": [
        [true, false, false],
        [true, true, false],
        [true, false, true],
        [true, false, true]
    ],
    "i": [
        [true],
        [false],
        [true],
        [true]
    ],
    "j": [
        [false, false, false],
        [false, false, true],
        [true, false, true],
        [false, true, false]
    ],
    "k": [
        [true, false, false],
        [true, false, true],
        [true, true, false],
        [true, false, true]
    ],
    "l": [
        [true],
        [true],
        [true],
        [true]
    ],
    "m": [
        [false, false, false, false, false],
        [true, true, false, true, true],
        [true, false, true, false, true],
        [true, false, true, false, true]
    ],
    "n": [
        [false, false, false],
        [true, true, false],
        [true, false, true],
        [true, false, true]
    ],
    "o": [
        [false, false, false],
        [false, true, false],
        [true, false, true],
        [false, true, false]
    ],
    "p": [
        [false, false, false],
        [true, true, false],
        [true, true, true],
        [true, false, false]
    ],
    "q": [
        [false, false, false],
        [false, true, true],
        [true, true, true],
        [false, false, true]
    ],
    "r": [
        [false, false, false],
        [true, true, true],
        [true, false, false],
        [true, false, false]
    ],
    "s": [
        [false, false, false],
        [false, true, true],
        [true, true, false],
        [true, true, true]
    ],
    "t": [
        [false, true, false],
        [true, true, true],
        [false, true, false],
        [false, true, true]
    ],
    "u": [
        [false, false, false],
        [true, false, true],
        [true, false, true],
        [false, true, true]
    ],
    "v": [
        [false, false, false],
        [true, false, true],
        [true, false, true],
        [false, true, false]
    ],
    "w": [
        [false, false, false],
        [true, false, true],
        [true, true, true],
        [true, false, true]
    ],
    "x": [
        [false, false, false],
        [true, false, true],
        [false, true, false],
        [true, false, true]
    ],
    "y": [
        [false, false, false],
        [true, false, true],
        [false, true, true],
        [false, false, true]
    ],
    "z": [
        [false, false, false],
        [true, true, true],
        [false, true, false],
        [true, true, true]
    ],

    // --- NUMBERS (3x4) ---
    "0": [
        [true, true, true],
        [true, false, true],
        [true, false, true],
        [true, true, true]
    ],
    "1": [
        [false, true, false],
        [true, true, false],
        [false, true, false],
        [true, true, true]
    ],
    "2": [
        [true, true, false],
        [false, false, true],
        [false, true, false],
        [true, true, true]
    ],
    "3": [
        [true, true, false],
        [false, true, true],
        [false, false, true],
        [true, true, false]
    ],
    "4": [
        [true, false, true],
        [true, true, true],
        [false, false, true],
        [false, false, true]
    ],
    "5": [
        [true, true, true],
        [true, true, false],
        [false, false, true],
        [true, true, false]
    ],
    "6": [
        [false, true, false],
        [true, true, false],
        [true, false, true],
        [false, true, false]
    ],
    "7": [
        [true, true, true],
        [false, false, true],
        [false, true, false],
        [false, true, false]
    ],
    "8": [
        [true, true, true],
        [true, true, true],
        [true, false, true],
        [true, true, true]
    ],
    "9": [
        [true, true, true],
        [true, false, true],
        [false, true, true],
        [false, false, true]
    ],

    // --- BASIC SIGNS (3x4) ---
    " ": [
    ],
    ".": [
        [false],
        [false],
        [false],
        [true]
    ],
    ",": [
        [false],
        [false],
        [false],
        [true],
        [true] // Minimal comma
    ],
    ":": [
        [false],
        [true],
        [false],
        [true]
    ],
    ";": [
        [false],
        [true],
        [false],
        [true]
    ],
    "!": [
        [true],
        [true],
        [false],
        [true]
    ],
    "?": [
        [true, true, false],
        [false, true, false],
        [false, false, false],
        [false, true, false]
    ],
    "-": [
        [false, false, false],
        [true, true, true],
        [false, false, false],
        [false, false, false]
    ],
    "+": [
        [false, true, false],
        [true, true, true],
        [false, true, false],
        [false, false, false]
    ],
    "=": [
        [true, true, true],
        [false, false, false],
        [true, true, true],
        [false, false, false]
    ],
    "/": [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [false, false, false]
    ],
    "(": [
        [false, true],
        [true, false],
        [true, false],
        [false, true]
    ],
    ")": [
        [true, false],
        [false, true],
        [false, true],
        [true, false]
    ],
    "*": [
        [true, false, true],
        [false, true, false],
        [true, false, true],
        [false, false, false]
    ],
    "@": [
        [false, true, true],
        [true, false, true],
        [true, false, true],
        [false, true, true]
    ],
    "❤": [
        [false, true, false, true, false],
        [true, true, true, true, true],
        [false, true, true, true, false],
        [false, false, true, false, false]
    ]
}

let textObjects = {}

function text(id, text, left, top, color, right = -1, characterSpacing = "auto") {
    const prev = textObjects[id]

    textObjects[id] = {
        func: getTextPixels, args: {
            text: text ?? prev?.args.text, left: left ?? prev?.args.left, top: top ?? prev?.args.top, color: color ?? prev?.args.color, right: right ?? prev?.args.right,
            characterSpacing: characterSpacing ?? prev?.args.characterSpacing
        }
    }
}

function getTextPixels({ text, left, top, color, right, characterSpacing }) {
    const pixels = [];
    let prevSpace = null;
    let prevChar = null;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const characterSpace = characterSpacing == "auto" ? ((char == char.toLowerCase() && char != char.toUpperCase()) ? 0 : 1) : characterSpacing;
        if (characterSpacing == "auto") {
            if (prevSpace == 0 && ((char != char.toLowerCase() || char == char.toUpperCase()))) {
                left += 1;
            }
            if (prevSpace == 1 && ((char == char.toLowerCase() && char != char.toUpperCase())))
                left -= 1;
        }
        const charPixels = FONT[char];
        if (!charPixels) continue;

        if (right != -1)
            if (right - (left + (charPixels[0]?.length ?? 0) - characterSpace) < 5) {
                for (let i = 0; i < 3; i++) {
                    pixels.push({ x: left + i * 2, y: top + charPixels.length - 1, color: color })
                }
                break;
            }

        for (let row = 0; row < charPixels.length; row++) {
            for (let col = 0; col < charPixels[row]?.length ?? 0; col++) {
                if (charPixels[row][col]) {
                    pixels.push({
                        x: left + col,
                        y: top + row,
                        color: color
                    });
                }
            }
        }

        left += Math.max((charPixels[0]?.length ?? 0) + characterSpace, 1);
        prevSpace = characterSpace;
        prevChar = char;
    }

    return pixels;
}