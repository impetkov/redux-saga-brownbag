import createSagaMiddleware from 'redux-saga';
import { delay } from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();
createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

const sleep = function*() {     // we are not gonna use the helper methods here, because we wanna use call() to invoke another generator
    yield delay(1000);
};

// the logger function will infinitely log (after a delay) which process it was forked from
const logger = function* (processNumber) {
    while (true) {
        console.log(`Logging a message from process ${processNumber}...`);
        yield effects.call(sleep);
    };
};

// the saga will infinitely (after a delay) create (fork out) a new logger process and delegate execution to it
const forkSaga = function* () {
    console.log('starting fork saga.');

    let i = 0;
    while (true) {
        console.log('*** forking a process... ***');
        yield effects.fork(logger, i);
        yield delay(2000);
        i++;
    }
};

sagaMiddleware.run(forkSaga);


// Forking is generally used in places where we have to perform an API or DB call for a number of entities (geting details for a number of rates concurrently).
// Creating a new thread for each call, data can be returned to the saga faster - doing multiple concurrent calls instead of doing them sequentially.