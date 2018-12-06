import createSagaMiddleware, { delay } from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();
createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

// a basic logger process with a try-finally block. it will carry on logging until it gets cancelled by its parent
const forkedProcess = function* () {
    try {
        while (true) {
            console.log('Forking all day long...');
            yield delay(500);
        }
    } finally {
        const cancelled = yield effects.cancelled();           // check if the process was deliberately cancelled
        console.log(`Was the process cancelled? ${cancelled}`);
    }
};

const cancelSaga = function* () {
    console.log('starting saga.');
    
    const forked = yield effects.fork(forkedProcess);   // start a new process...
    
    yield delay(5000);                                  // ... waaaaaait for iiit...

    yield effects.cancel(forked);                       // ...and cancel it

    console.log('the saga has completed.')
};

sagaMiddleware.run(cancelSaga);