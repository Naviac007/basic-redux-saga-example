import {legacy_createStore as createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import mySaga from './get/get.saga';
import reducer from './get/get.reducer';

const sagaMiddleware = createSagaMiddleware();
export default createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);