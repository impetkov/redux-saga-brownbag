const makeIterator = array => {
    var index = 0;

    const next = () =>                                  // adding a next() function to the simple object we are going to return fromt he makeIterator function. 
        index < array.length ?                          // on each invokation, it will check if the index has reached the end of the provided array.
            { value: array[index++], done: false } :    // if it hasn't, return the next value, advancing the index and indicate that we're still not done.
            { value: undefined, done: true };           // if we've reached the end of the array, return undefined and indicate that we're done.

    return {
        next
    };
}

var it = makeIterator(['one', 'two']);

console.log(it.next()); // { value: 'one', done: false }
console.log(it.next()); // { value: 'two', done: false }
console.log(it.next()); // { value: undefined, done: true }
console.log(it.next()); // { value: undefined, done: true }