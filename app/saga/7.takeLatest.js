import createSagaMiddleware, { delay } from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();
createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

// pretty much the same forkedProcess that we saw in the last example
const forkedProcess = function* () {
    let chugCounter = 1;
    try {
        while (true) {
            console.log(`Chugging away, nothing can stop me now... Been chugging for ${chugCounter} years!`);
            yield delay(500);
            chugCounter++;
        }
    } finally {
        const cancelled = yield effects.cancelled();
        console.log(`Was the process cancelled? ${cancelled}`);
    }
};

const takeLatestSaga = function* () {
    console.log('starting saga.');
    yield effects.takeLatest('SET_STATE', forkedProcess);   // set the saga so that when a SET_STATE is received, start a new forkedProcess
    yield delay(1000);
    
    yield effects.put({ type: 'SET_STATE', value: 10 });    // put a SET_STATE action in the sore - this will start the forked process,
    yield delay(5000);                                      // which should be chugging along for 10 years    
    
    yield effects.put({ type: 'SET_STATE', value: 34 });    // put another SET_STATE in the store. This will cancel the currently running forkedProcess
                                                            // invoking its finally block. Then, a new forked process is gonna be started.
    console.log('the saga has completed.');
};

sagaMiddleware.run(takeLatestSaga);