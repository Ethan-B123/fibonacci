
"use strict";

const cmdLineArgs = [];

for (let i = 2; i < process.argv.length; i++) {
  cmdLineArgs.push(process.argv[i]);
}

const recursively = (n, store = { [0]: 0, [1]: 1 }) => {
  if(n < 0){
    throw "n below zero";
  }
  if(store[n] !== undefined){
    return store[n];
  }
  store[n] = recursively(n - 1, store) + recursively(n - 2, store);
  return store[n];
}

const iteratively = n => {
  if(n < 0){
    throw "n below zero";
  }
  if (n < 2) {
    return n;
  }
  let beforeLast = 0;
  let last = 1;
  let current;
  for (let i = 2; i <= n; i++) {
    current = last + beforeLast;
    beforeLast = last;
    last = current;
  }
  return current;
}

if (cmdLineArgs.length === 0) {
  for (let i = 0; i <= 1000; i += i || 1) {
    console.log(`recursively (n = ${i}):`, recursively(i));
    console.log(`iteratively (n = ${i}):`, iteratively(i));
  }
} else {
  for (let i = 0; i < cmdLineArgs.length; i++) {
    let n = cmdLineArgs[i]
    // exceeds call stack around n = 6300
    console.log(`recursively (n = ${n}):`, recursively(n));
    console.log(`iteratively (n = ${n}):`, iteratively(n));
  }
}
