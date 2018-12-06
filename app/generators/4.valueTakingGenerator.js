const generator = function* logGenerator() {
  let one = yield 1;
  let two = yield 2;
  let three = yield 3;

  console.log(`Final values of variables: ${one}, ${two}, ${three}`);
};

const gen = generator();

// calling the .next() method with an argument will resume the generator function execution, 
// replacing the yield expression, where execution was paused, with the argument from next()

console.log(gen.next());        // { value: a, done: false }
console.log(gen.next('a'));     // { value: b, done: false }
console.log(gen.next('b'));     // { value: 3, done: false }
console.log(gen.next('3'));     // Final values of variables: a, b, 3
                                // { value: undefined, done: true }