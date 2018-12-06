const delayGenerator = function* () {
    console.log('entering the generator');
    yield new Promise(result => setTimeout(result, 2000));  // imagine this is something like api.getQuotes(), for example

    return 'the end.';
};

const generator = delayGenerator();
const promise = generator.next();   // get the Promise object from the generator
console.log(promise)
promise.value.then(_ => console.log(generator.next())); // when the Promise resolves, let the generator run to completion and log the end result