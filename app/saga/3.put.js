import createSagaMiddleware from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';
import { sleep } from '../helpers';

const sagaMiddleware = createSagaMiddleware();
createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

// this is a copy of the saga we just covered - nothing new thus far.
const takeSaga = function* () {
    console.log('starting takeSaga.');

    const state = yield effects.take('SET_STATE');

    console.log(`State is: ${state.value}`);
};

sagaMiddleware.run(takeSaga);

// here we create another saga that's only purpose in life is to put an action in the store
const putSaga = function* () {
    yield effects.put({ type: 'SET_STATE', value: 32 });  // put the SET_STATE action with a value of 32 in the store
};

sleep(2000).then(() => {                // sleep is just a helper method that pauses the thread execution and it doesn't need to be yielded to
    console.log('starting putSaga.');

    sagaMiddleware.run(putSaga);        // run the putSaga. note here that we're running both sagas via the same instance of sagaMiddleware.
});                                     // therefore, both sagas are attached to the same store. 
