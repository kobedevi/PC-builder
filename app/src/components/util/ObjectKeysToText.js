import humps from "humps";

const ObjectKeysToText = (key) => {
    return key.charAt(0).toUpperCase() + humps.decamelize(key, { separator: " " }).substring(1)
}

export {ObjectKeysToText}