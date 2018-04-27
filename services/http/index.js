import axios from "axios";

const response = {
    success: null,
    message: null,
};

export default class HTTP {
    static get(action) {
        return new Promise(resolve => {
            const params = {
                ...action.parameters,
            };

            axios
                .get(action.endPoint, params)
                .then(data => {
                    response.success = true;
                    response.message = data.data;
                    resolve(response);
                })
                .catch(error => {
                    response.message = error.message;
                    resolve(response);
                });
        });
    }
}
