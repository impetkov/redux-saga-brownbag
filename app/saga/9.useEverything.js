import createSagaMiddleware, { delay } from 'redux-saga';
import * as effects from 'redux-saga/effects';
import { createStore, compose, applyMiddleware } from 'redux';
import { dispatchAction } from '../helpers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(a => a, {}, compose(applyMiddleware(sagaMiddleware)));

const dispatch = action => store.dispatch(action);

const requestQuoteDetails = function* (quoteNumber) {
    yield effects.put({ type: 'QUOTE_DETAIL_REQUESTED', value: quoteNumber });   // simply put a QUOTE_DETAIL_REQUESTED action in the store
};

const quoteRetrievalHandler = function* (action) {
    const quoteNumber = action.value;
    console.log(`Handling retrieved quote ${quoteNumber}...`);
    yield effects.call(requestQuoteDetails, quoteNumber);    // when a quote has been retrieved, request quote details for it
};

const retrieveQuote = function* (quoteIndex) {
    yield delay(500);
    yield effects.put({ type: 'QUOTE_RETRIEVED', value: quoteIndex });  // simply put a QUOTE_RETRIEVED action in the store
};

const logQuoteDetailRequested = function* (action) {
    const quoteNumber = action.value;
    try {
        while (true) {
            console.log(`Quote detail requested for quote ${quoteNumber}.`);     // a simple logger notifying us that Quote details have been requested
            yield delay(500);
        }
    } finally {
        const cancelled = yield effects.cancelled();
        if(cancelled){
            console.log(`Quote detail request for quote ${quoteNumber} has been cancelled.`);
        }
    }
};

const everythingSaga = function* () {
    console.log('starting the saga.');

    const [initialsed, quotesRequested] = yield effects.all([   // set up the saga so that it waits for the INITIALISED and QUOTES_REQUESTED actions
        effects.take('INITIALISED'),
        effects.take('QUOTES_REQUESTED')
    ]);

    console.log(`Has the process been initialsed? ${initialsed.value}`);

    if (initialsed.value) {                                                     // if the initialised flag is set to true, set the saga to react to any 
        yield effects.takeEvery('QUOTE_RETRIEVED', quoteRetrievalHandler);      // QUOTE_RETRIEVED action by forking out a new handler process
    }

    for (let i = 0; i < quotesRequested.value; i++) {   // for howver many quote we know we're going to retrieve, spawn a new retrieval process
        yield effects.spawn(retrieveQuote, i);          // each of these processes will be independent from the saga.
    }

    const latestQuoteDetailRequested = yield effects.takeLatest('QUOTE_DETAIL_REQUESTED', logQuoteDetailRequested); // the saga will intercept each 
                                                                                                                    // QUOTE_DETAIL_REQUESTED action and fork out
    yield delay(5000);                                                                                              // a new logger process, cancelling any 
                                                                                                                    // previously running loggers
    yield effects.cancel(latestQuoteDetailRequested);   // cancel the last remaining logger process...

    console.log(`Saga completed`);                      // ...and complete the saga
};

sagaMiddleware.run(everythingSaga);

dispatchAction(dispatch, { type: 'INITIALISED', value: true });
dispatchAction(dispatch, { type: 'QUOTES_REQUESTED', value: 5 });