import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import main from "./reducers/index";
import routes from "./reducers/routes";
import { sagas } from "./sagas/index";

// add the middlewares
let middlewares = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// create the store
const store = createStore(combineReducers({ main, routes }), middleware);
sagaMiddleware.run(sagas);

// export
export { store };
