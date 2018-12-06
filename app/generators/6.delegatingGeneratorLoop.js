const anotherGenerator = function* (num) {
    if (num < 20) {
        num += 3;
        console.log(`anotherGenerator yields ${num} to generator.`);
        
        yield* generator(num);
    }
};

const generator = function* (num) {
    if (num < 20) {
        num++;
        console.log(`generator yields ${num} to anotherGenerator.`);
        
        yield* anotherGenerator(num);
    }
};

const gen = generator(5);

console.log(gen.next());    // only one call to .next()? 
                            // where would the execution stop? 
                            // what would be the final result? 