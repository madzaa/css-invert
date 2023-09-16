import {readFileSync} from "fs";

function convertColor(cssFile: string) {
    const regex = /#[a-fA-F0-9]+/g;
    const simpleCss = readFileSync(cssFile, 'utf-8');
    return simpleCss.replace(regex, replaceWithRGB);
}

function replaceWithRGB(hexArray: string) {
    const colorCode = hexArray.replace("#", "");
    let colorComponents = [];

    if (colorCode.length < 6) {
        for (const element of colorCode) {
            colorComponents.push(hexToDecimalFromMap(element.repeat(2)));
        }
    } else {
        colorComponents = colorCode.match(/.{1,2}/g).map(hexToDecimalFromMap);
    }

    if (colorComponents.length > 3) {
        const alphaChannel = (Number.parseInt(colorComponents.at(3)) / 0xff).toFixed(5)
        const rgbChannel = colorComponents.slice(0, 3);
        return `rgba(${rgbChannel.join(" ")} / ${alphaChannel})`;
    }

    return `rgb(${colorComponents.join(" ")})`;
}

function hexToDecimalFromMap(value: string) {
    const hexMap = {
        "0": 0x0,
        "1": 0x1,
        "2": 0x2,
        "3": 0x3,
        "4": 0x4,
        "5": 0x5,
        "6": 0x6,
        "7": 0x7,
        "8": 0x8,
        "9": 0x9,
        "a": 0xa,
        "b": 0xb,
        "c": 0xc,
        "d": 0xd,
        "e": 0xe,
        "f": 0xf
    }

    const firstHexValue = value.split("")[0].toLowerCase()
    const secondHexValue = value.split("")[1].toLowerCase();

    return (hexMap[firstHexValue] << 4) + hexMap[secondHexValue];
}
