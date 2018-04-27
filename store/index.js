import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import { sagas } from './sagas';

// add the middlewares
const middlewares = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// apply the middleware
const middleware = applyMiddleware(...middlewares);

// create the store
const store = createStore(reducers, middleware);
sagaMiddleware.run(sagas);

// export
export default { store };
