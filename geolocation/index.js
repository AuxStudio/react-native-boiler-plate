import Geocoder from "react-native-geocoder";

let response = {
    success: null,
    message: null,
};

export default class Utilities {
    static getUserCoordinates() {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    response.success = true;
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    response.message = coords;
                    resolve(response);
                },
                error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                }
            );
        });
    }

    static getUserSuburb(coordinates) {
        return new Promise(resolve => {
            Geocoder.geocodePosition(coordinates)
                .then(data => {
                    response.success = true;
                    response.message = data[0].subLocality;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                });
        });
    }
}
