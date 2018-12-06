import createSagaMiddleware, { delay } from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';
import { dispatchAction } from '../helpers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

const dispatch = action => store.dispatch(action);

// again, log endlessly 
const logger = function* () {
    console.log('Statring to log!');
    while (true) {
        console.log('Logging...');
        yield delay(1000);
    }
};

const takeEverySaga = function* () {
    console.log('starting saga.');
    yield effects.takeEvery('SET_STATE', logger);   // everytime a SET_STATE is received, a new logger process will be forked and will carry on independently 
    console.log(`Got here!`);
};

sagaMiddleware.run(takeEverySaga);

dispatchAction(dispatch, { type: 'SET_STATE', value: 10 });
dispatchAction(dispatch, { type: 'SET_STATE', value: 5 });
dispatchAction(dispatch, { type: 'SET_STATE', value: 73 });