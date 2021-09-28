/* create text from user input using MarkovMachine */

const fs = require("fs");
const process = require("process");
const axios = require("axios");

const markov = require("./markov");


/* create new Markov machine from user input and generate random text */

function generateText(text) {
  let markovMachine = new markov.MarkovMachine(text);
  console.log(markovMachine.makeText());
}


/* get text from a file */

function makeText(path) {
  fs.readFile(path, "utf8", function(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


/* get text from a URL */

async function makeURLText(url) {
  let response = null;

  try {
    response = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(response.data)
}


/* read the command line */ 

let [type, path] = process.argv.slice(2);

if (type === "file") {
  makeText(path);
}

else if (type === "url") {
  makeURLText(path);
}

else {
  console.error(`Invalid input type: ${type}`);
  process.exit(1);
}