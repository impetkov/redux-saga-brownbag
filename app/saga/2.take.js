import createSagaMiddleware from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';
import { dispatchAction } from '../helpers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

const dispatch = action => store.dispatch(action);  // in order to make a saga able to emit or consume actions, we need to use 
                                                    // the dispatch method provided by the store the saga is connected to.
                                                    // here I've created a wrapping function that I use in the simple helper class
                                                    // to make readability a bit easier.

const takeSaga = function* () {
    console.log('starting saga.');

    const state = yield effects.take('SET_STATE');  // execution is going to pause here until the SET_STATE action is received. 
                                                    // the state variable would hold a copy of the received action.

    console.log(`State is: ${state.type}`);         // here we're going to expect that SET_STATE is put in the state's type property
    console.log(`State is: ${state.value}`);        // and that 10 is put in the state's value property
};

sagaMiddleware.run(takeSaga);                       // run the saga

dispatchAction(dispatch, { type: 'SET_STATE', value: 10 }); // dispatch the SET_STATE action with a value of 10