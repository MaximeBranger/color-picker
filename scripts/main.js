const reloadButton = document.querySelector("#reload");
const main = document.querySelector("main");
const hexaColorElement = document.querySelector("#hexaColor");
const rgbColorElement = document.querySelector("#rgbColor");
const alertDiv = document.querySelector(".alert");

const hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

document.addEventListener("DOMContentLoaded", newColor);
reloadButton.addEventListener("click", newColor);

hexaColorElement.addEventListener("click", copyToClipboard);
rgbColorElement.addEventListener("click", copyToClipboard);

function newColor(ev) {
    ev.preventDefault();
    const newColor = randomColor();
    updateColor(newColor, hexaToRGB(newColor));
}

function randomColor() {
    const newColorArray = ["#"];
    for (let index = 0; index < 6; index++) {
        newColorArray.push(randomValue());
    }
    return newColorArray.join('');
}

function randomValue() {
    return hexValues[Math.floor(Math.random() * hexValues.length)];
}

function hexaToRGB(hexacolor) {
    const hexaR = hexacolor.slice(1, 3);
    const hexaG = hexacolor.slice(3, 5);
    const hexaB = hexacolor.slice(5, 7);
    return [hexaToDec(hexaR), hexaToDec(hexaG), hexaToDec(hexaB)];
}

function hexaToDec(value) {
    return hexValues.indexOf(value[0]) * 16 + hexValues.indexOf(value[1]);
}

function rgbComplementary(rgb) {
    return [255 - rgb[0], 255 - rgb[1], 255 - rgb[2]];
}

function updateColor(hexa, rgb) {
    main.style.backgroundColor = hexa;
    hexaColorElement.textContent = hexa;
    rgbColorElement.textContent = "rgb(" + rgb + ")";

    console.log(rgb.filter(i => i <= 50))
    if (rgb.filter(i => i <= 50).length > 1) {
        main.style.color = "white";
    } else {
        main.style.color = "black";
    }
}

function copyToClipboard(ev) {
    alertDiv.classList.remove("hide");
    navigator.clipboard.writeText(ev.target.textContent);

    setTimeout(() => {
        alertDiv.classList.add("hide");
    }, 1000);
}