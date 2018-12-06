import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { delay } from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();                      // we need to create the saga middleware that we're going to apply to the store
createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));  // sagas need to have a store available. The store will hold

const simpleSaga = function* () {
    console.log('Doing one...');
    const one = yield delay(1000, 1);   // delay is a utility method provided by redux-saga that sleeps the current thread for X milliseconds and then 
    console.log('Doing two...');        // returns the value that was (optionally) provided to it - in this case, 1.
    const two = yield delay(2000, 2);   // note that delay has to be yielded to, hence can only be used from within a generator
    console.log('Doing three...');
    const three = yield delay(3000, 3);

    console.log(`Result: ${one + two + three}`);
}

sagaMiddleware.run(simpleSaga); // the run() function provided by the saga middleware is going to iterate over the Generator (simpleSaga) 
                                // and execute all yielded effects.


/*

The equivalent of the above, using only the generator, would be something like:

const saga = simpleSaga();
saga.next();
saga.next();
saga.next();

Note that if we executed the 3 calls to .next() one after the other, without waiting for the promises to resolve,
    the result would be a NaN, as some of the variables would be undefined. 
    Using a saga to handle the generator and resolving of promises solves this issue.

*/