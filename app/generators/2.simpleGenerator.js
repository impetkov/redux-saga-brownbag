const simpleGenerator = function* () {  // Generator Function declaration, note the * after the function keyword. 
    let i = 0;                          // This is the syntax for allowing the use of yield. 
       console.log('starting')                                 // Generators cannot be declared as arrow functions.
    while (i < 3) {
        yield (i++);  // yeild specifies the value to be returned from the Generator object
    }

    console.log('done');
};

const gen = simpleGenerator();      // invoking the Generator Function returns a Generator object for the function. 
                                    // This conforms to the Iterable protocol

const firstResult = gen.next();  // .next() executes the generator function's body until the first yield expression 
                                 // which specifies the value to be returned from the generator

console.log(firstResult);   // the result of calling .next() is an object with a value property containing the yielded value
                            // and a done property indicating whether the generator has yielded its last value
                            // { value: 0, done: false }
                            
console.log(gen.next());    // { value: 1, done: false }
console.log(gen.next());    // { value: 2, done: false }

console.log(gen.next());    // when the generator has completed, calling the iterator's .next() method will return a result object
                            // with undefined value and true done flag: { value: undefined, done: true }