import { Platform } from "react-native";

const utilities = {};

/* COLORS */

utilities.convertHexToRGB = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/* TIMING */

utilities.getPrettyMinutesFromSeconds = seconds => {
    // 126 => 02:06
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;

    // add zero padding for seconds, if necessary
    let zeroPaddingSeconds = "";
    if (remainingSeconds < 10) {
        zeroPaddingSeconds = "0";
    }

    const prettyMinutes = minutes + ":" + zeroPaddingSeconds + remainingSeconds;

    return prettyMinutes;
};

utilities.getPrettyDate = (timestamp, returnTime) => {
    const date = new Date(timestamp);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let year = date.getFullYear();
    year = utilities.addZeroPadding(year, 4);
    const month = months[date.getMonth()];
    let day = date.getDate();
    day = utilities.addZeroPadding(day);

    let prettyDate = day + " " + month + " " + year;

    if (returnTime) {
        let hours = date.getHours();
        hours = utilities.addZeroPadding(hours);
        let minutes = date.getMinutes();
        minutes = utilities.addZeroPadding(minutes);

        prettyDate += ", " + hours + ":" + minutes;
    }

    return prettyDate;
};

utilities.getTimestampFromISODate = date => {
    const timestamp = Date.parse(date);
    return timestamp;
};

utilities.getDaysFromDate = date => {
    return Math.abs(
        Math.ceil(
            (Date.now() - new Date(date).getTime()) / 86400000 // milliseconds in a day
        )
    );
};

/* FILES */

utilities.getFileName = path => {
    const pathArray = path.split("/");
    const fileName = pathArray[pathArray.length - 1];

    return fileName;
};

utilities.appendStringToFileName = (fileName, string) => {
    const fileNameArray = fileName.split(".");
    const newFileName = fileNameArray[0] + string + "." + fileNameArray[1];

    return newFileName;
};

utilities.convertURIsToPaths = array => {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        const newValue = value.replace("file:", "");
        newArray.push(newValue);
    }

    return newArray;
};

/* METHODS */

utilities.getInputHeight = (inputWidth, inputLineHeight, charCount) => {
    const charsPerLine = Math.floor(inputWidth / inputLineHeight);
    const numberOfLines = Math.ceil(charCount / charsPerLine);
    const inputHeight = Math.ceil(numberOfLines * inputLineHeight);

    return inputHeight;
};

/* STRINGS */

utilities.firstCharToUppercase = string => {
    const trimmedString = string.trim();
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
};

utilities.firstCharToLowercase = string => {
    const trimmedString = string.trim();
    return trimmedString.charAt(0).toLowerCase() + trimmedString.slice(1);
};

// Takes a string and converts each word's first character to uppercase
utilities.prettifyString = string => {
    const stringArray = string.split(" ");
    let prettyStringArray = [];

    stringArray.map(value => {
        // Don't add blank characters
        if (value) {
            prettyStringArray.push(utilities.firstCharToUppercase(value));
        }
    });

    const prettyString = prettyStringArray.join(" ");
    return prettyString;
};

utilities.createUUID = () => {
    var d = new Date().getTime();
    if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
    ) {
        d += performance.now(); //use high-precision timer if available
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = ((d + Math.random() * 16) % 16) | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
};

utilities.prettifyUrl = url => {
    const prettyUrl = url.split("//")[1].split("/")[0];

    return prettyUrl;
};

utilities.addZeroPadding = (number, digits) => {
    let zeroPaddedNumber = number.toString();
    let loopFor = digits ? digits - 1 : 1;
    let factor = 10;

    for (let i = 0; i < loopFor; i++) {
        if (zeroPaddedNumber < factor) {
            zeroPaddedNumber = "0" + zeroPaddedNumber;
            factor *= 10;
        }
    }
    return zeroPaddedNumber;
};

// Eg. 'toolTip-1' => 'toolTip-2'
utilities.incrementNumberInString = (string, delimiter) => {
    const stringArray = string.split(delimiter);
    const nextNumber = Number(stringArray[1]) + 1;
    const newString = stringArray[0] + delimiter + nextNumber;

    return newString;
};

utilities.createLinkingURL = url => {
    let linkingUrl = "";

    // Location ({lat: X, lng: X})
    if (url.lat) {
        if (Platform.OS === "android") {
            linkingUrl = "geo:" + url.lat + "," + url.lng;
        } else {
            linkingUrl = `http://maps.apple.com/?ll=${url.lat},${url.lng}`;
        }
    } else if (url.indexOf("@") > -1) {
        // Email address
        linkingUrl = "mailto:" + url;
    } else if (url.indexOf("+") > -1) {
        // Telephone number
        linkingUrl = "tel:" + url;
    } else {
        linkingUrl = url;
    }

    return linkingUrl;
};

utilities.stripHTML = html => {
    return html.replace(/<(?:.|\n)*?>/gm, "");
};

/* ARRAYS */

utilities.isValueInArray = (value, array, returnIndex) => {
    for (let i = 0; i < array.length; i++) {
        if (value == array[i]) {
            if (returnIndex) {
                return i;
            } else {
                return true;
            }
        }
    }

    return false;
};

utilities.reverseArray = array => {
    const copy = array.slice();
    return copy.reverse();
};

utilities.filterArrayByValue = (value, array) => {
    const pattern = new RegExp(value.toLowerCase(), "g");

    const filteredArray = array.filter(item => {
        return item.toLowerCase().match(pattern);
    });

    return filteredArray;
};

// Deletes an object that matches a key value pair from an array
utilities.deleteObjectWithKeyValuePairFromArray = (keyValuePair, array) => {
    let newArray = array;
    let index;
    let targetKey;
    let targetValue;

    for (key in keyValuePair) {
        targetKey = key;
        targetValue = keyValuePair[targetKey];
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i][targetKey] === targetValue) {
            index = i;
        }
    }

    newArray.splice(index, 1);

    return newArray;
};

// Takes an array and converts it into a dictionary with the id as parent key
utilities.convertArrayToDictionary = array => {
    let dictionary = {};

    for (let i = 0; i < array.length; i++) {
        const id = array[i].id;
        dictionary[id] = array[i];
    }

    return dictionary;
};

utilities.stripNullElementsFromArray = array => {
    let copyArray = array;
    array.map((item, index) => {
        if (item === null || item === undefined) {
            copyArray.splice(index, 1);
        }
    });
    return copyArray;
};

/* OBJECTS */

utilities.cloneObject = object => {
    return JSON.parse(JSON.stringify(object));
};

utilities.getRandomItemFromDictionary = dictionary => {
    const array = Object.values(dictionary);
    const dictionaryLength = utilities.getLengthOfObject(dictionary);
    const randomNumber = Math.round(Math.random() * (dictionaryLength - 1));
    const randomItem = array[randomNumber];

    return randomItem;
};

// Takes a dictionary and returns a normal array without the keys
utilities.convertDictionaryToArray = (dictionary, shouldKeepUUID) => {
    let array = [];

    for (key in dictionary) {
        let object = dictionary[key];
        if (shouldKeepUUID) {
            object["id"] = key;
        }
        array.push(object);
    }

    return array;
};

// Filter array of objects by value (of provided keys)
utilities.filterArrayOfObjectsByValue = (array, value, targetKey) => {
    let key;
    const pattern = new RegExp(value.toString().toLowerCase(), "g");

    const filteredArray = array.filter(item => {
        for (key in item) {
            if (key === targetKey) {
                if (
                    item[key]
                        .toString()
                        .toLowerCase()
                        .match(pattern)
                ) {
                    return item;
                }
            }
        }
    });

    return filteredArray;
};

// Takes a key value pair and checks to see if that key value pair is present in a dictionary
utilities.isKeyValuePairPresentInDictionary = (keyValuePair, dictionary) => {
    let targetKey;
    let targetValue;

    for (key in keyValuePair) {
        targetKey = key;
        targetValue = keyValuePair[targetKey];
    }

    let isKeyValuePairPresent;

    for (key in dictionary) {
        if (dictionary[key][targetKey] === targetValue) {
            isKeyValuePairPresent = true;
        }
    }

    return isKeyValuePairPresent;
};

// Takes a new object, creates a unique id and pushes it to a dictionary
utilities.pushObjectToDictionary = (object, dictionary) => {
    let newObject = {};
    let newDictionary;

    const id = object.id;
    newObject[id] = object;

    if (dictionary) {
        newDictionary = { ...dictionary, ...newObject };
    } else {
        // If the object array was empty/null
        newDictionary = newObject;
    }

    return newDictionary;
};

// Removes an object from a dictionary that matches the id/key, value or key value pair (if present)
utilities.removeObjectFromDictionary = (id, dictionary) => {
    let newDictionary = {};

    for (key in dictionary) {
        if (key !== id) {
            newDictionary[key] = dictionary[key];
        }
    }

    return newDictionary;
};

// Deletes an object from a single tier object array that matches a key
utilities.deleteObjectFromDictionary = (targetKey, dictionary) => {
    let newDictionary = {};

    for (key in dictionary) {
        if (key !== targetKey) {
            newDictionary[key] = dictionary[key];
        }
    }

    return newDictionary;
};

// Finds a key value pair in a two tier object array and sets the keys value to null
utilities.findKeyValuePairAndSetKeysValueToNull = (
    targetKeyValuePair,
    dictionary
) => {
    let targetKey;
    let targetValue;
    let newDictionary = dictionary;

    for (pairKey in targetKeyValuePair) {
        targetKey = pairKey;
        targetValue = targetKeyValuePair[pairKey];
    }

    for (key in newDictionary) {
        for (subKey in newDictionary[key]) {
            if (
                subKey === targetKey &&
                newDictionary[key][subKey] === targetValue
            ) {
                newDictionary[key][subKey] = null;
            }
        }
    }

    return newDictionary;
};

// Updates a dictionary's object at a given id
utilities.updateObjectInDictionary = (id, newObject, dictionary) => {
    let newDictionary = dictionary;

    newDictionary[id] = newObject;

    return newDictionary;
};

// Returns a new object array filtered by a key value pair
utilities.filterDictionaryByKeyValuePair = (keyValuePair, dictionary) => {
    let targetKey;
    let targetValue;
    let newDictionary = {};

    for (key in keyValuePair) {
        targetKey = key;
        targetValue = keyValuePair[targetKey];
    }

    for (key in dictionary) {
        if (dictionary[key][targetKey] === targetValue) {
            newDictionary[key] = dictionary[key];
        }
    }

    return newDictionary;
};

utilities.sortArrayOfObjectsByKey = (array, targetKey) => {
    Array.prototype.sortBy = function(key) {
        return this.slice(0).sort(function(a, b) {
            return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
        });
    };

    const sortedArray = array.sortBy(targetKey);
    return sortedArray;
};

// Sorts a dictionary on key name and array of values where the first value in the array will be at the top of the object array
utilities.sortDictionaryByKeyAndValues = (dictionary, targetKey, values) => {
    let newDictionary = {};
    let lastSubDictionary = {};

    for (let i = 0; i < values.length; i++) {
        for (key in dictionary) {
            if (dictionary[key].hasOwnProperty(targetKey)) {
                for (subKey in dictionary[key]) {
                    if (
                        subKey === targetKey &&
                        dictionary[key][targetKey] === values[i]
                    ) {
                        newDictionary[key] = dictionary[key];
                    }
                }
            } else {
                lastSubDictionary[key] = dictionary[key];
            }
        }
    }

    if (lastSubDictionary) {
        newDictionary = { ...newDictionary, ...lastSubDictionary };
    }

    return newDictionary;
};

utilities.getLengthOfObject = object => {
    let counter = 0;

    for (key in object) {
        counter++;
    }

    return counter;
};

utilities.getValuesThatMatchKeyFromDictionary = (targetKey, dictionary) => {
    let valuesArray = [];

    for (key in dictionary) {
        valuesArray.push(dictionary[key][targetKey]);
    }

    return valuesArray;
};

// Returns a dictionary with objects missing in new object array relative to old object array (NOTE: does not account for objects in old array that are not in new array - only added objects to new array)
utilities.getDifferenceBetweenDictionarys = (newDictionary, oldDictionary) => {
    const newDictionaryKeys = Object.keys(newDictionary);
    const oldDictionaryKeys = Object.keys(oldDictionary);
    let foundKey;
    let missingObjects = null;

    for (newKey in newDictionary) {
        foundKey = false;

        for (oldKey in oldDictionary) {
            if (newKey === oldKey) {
                foundKey = true;
            }
        }

        if (!foundKey) {
            if (!missingObjects) {
                missingObjects = {};
            }
            missingObjects[newKey] = newDictionary[newKey];
        }
    }

    return missingObjects;
};

/* LOCATION */

// Thanks to https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula (https://stackoverflow.com/users/1921/chuck)
utilities.getDistanceBetweenCoordinateSets = (setA, setB) => {
    var R = 6371; // Radius of the earth in km
    var dLat = utilities.convertDegreesToRadians(setB.lat - setA.lat);
    var dLon = utilities.convertDegreesToRadians(setB.lng - setA.lng);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(utilities.convertDegreesToRadians(setA.lat)) *
            Math.cos(utilities.convertDegreesToRadians(setB.lat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
};

utilities.convertDegreesToRadians = degrees => {
    return degrees * (Math.PI / 180);
};

export default utilities;
