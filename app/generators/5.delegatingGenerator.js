const firstGenerator = function* (num) {
    yield num + 10;
    return 5;
    yield num + 30;
};

const delegatingGenerator = function* (num) {
    yield ++num;
    yield* firstGenerator(num); // using yield* delegates to another generator function
    yield num + 2;
};

const gen = delegatingGenerator(10);

console.log(gen.next());  // { value: 11, done: false }
console.log(gen.next());  // { value: ???, done: false }
console.log(gen.next());  // { value: ???, done: false }
console.log(gen.next());  // { value: ???, done: false }
console.log(gen.next());  // { value: ???, done: false }
console.log(gen.next());  // { value: undefined, done: true }