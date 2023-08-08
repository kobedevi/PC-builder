
const showUnit = (key) => {
    switch (key) {
        case "height":
        case "width":
        case "depth":
            return "mm"
        case "wattage":
            return "W"
        case "clockSpeed":
            return "GHz"
        case "speed":
        case "clockspeed":
            return "MHz"
        case "Capacity":
            return "Gb"
        case "RPM":
            return "RPM"
        case "vram":
        case "sizePerStick":
            return "GB"
        default:
            break;
    }
}

export {showUnit}