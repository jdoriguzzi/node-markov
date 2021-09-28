/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    let next = null;
  
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      if (this.words[i + 1]) next = this.words[i + 1] 
      else next = null;
         
      if (chains.has(word)) chains.get(word).push(next);
      else chains.set(word, [next]);
    }
  
    this.chains = chains;
  }


  
/** Return a random word */

 static getWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}


/** return random text from chains */

makeText(numWords = 100) {
  let keys = Array.from(this.chains.keys());
  let result = [];

  let key = keys[Math.floor(Math.random() * keys.length)];  // pick a starting key at random

  while (result.length < numWords && key !== null) {
    result.push(key);
    key = MarkovMachine.getWord(this.chains.get(key));  // get next random word
  }

  return result.join(" ");
}
}


module.exports = {
MarkovMachine,
};