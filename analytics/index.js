import firebase from "../firebase";

export default class Analytics {
    static logEvent(event) {
        console.log("Logging " + event);

        return new Promise(resolve => {
            firebase.analytics().logEvent(event, {});
        });
    }
}
