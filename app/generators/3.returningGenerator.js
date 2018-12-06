const returningGenerator = function* () {
    let i = 1;
    while (true) {
        yield i++;

        if (i > 2) {
            return 'the end.';  // returning from a generator will immediately make the generator finished
        }
    }
};


const gen = returningGenerator();
console.log(gen.next());    // { value: 0, done: false }
console.log(gen.next());    // { value: 1, done: false }
console.log(gen.next());    // { value: 2, done: false }
console.log(gen.next());    // { value: 'the end', done: true }
console.log(gen.next());    // { value: undefined, done: true }