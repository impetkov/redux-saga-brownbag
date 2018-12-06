import createSagaMiddleware from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';
import { dispatchAction } from '../helpers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

const dispatch = action => store.dispatch(action);

// simple saga that will wait for 2 actions to arrive and output their values
const allSaga = function* () {
    console.log('starting saga.');

    const [setStateOne, setStateTwo] = yield effects.all([  // exection is paused while we wait for the actions to arrive
        effects.take('SET_STATE_ONE'),
        effects.take('SET_STATE_TWO')
    ]);

    console.log(`Set state one is: ${setStateOne.value}`);
    console.log(`Set state two is: ${setStateTwo.value}`);
};

sagaMiddleware.run(allSaga);

dispatchAction(dispatch, { type: 'SET_STATE_ONE', value: 10 });
dispatchAction(dispatch, { type: 'SET_STATE_TWO', value: 30 });