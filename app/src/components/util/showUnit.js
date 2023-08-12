
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
        case "capacity":
            return "GB"
        case "RPM":
        case "rpm":
            return "'"
        case "vram":
        case "sizePerStick":
            return "GB"
        case "price":
            return "€"
        default:
            return "";
    }
}

export {showUnit}