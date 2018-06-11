const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let frogs = [0];
let n = 0;
rl.question("n = ", n => {
  
  for (let i = 0; i < n; i++) {
    frogs = frogs.map( frog => {
      if(frog < 100) {
       return frog + 10;
      }
      return frog;
    })
    frogs.push(0);
  }

  let sum = frogs.reduce((sum, current) =>  sum + current, 0);
  
  console.log(frogs);
  console.log("sum of total weight: " + sum);
  console.log("average after n days: " + sum/frogs.length);

});