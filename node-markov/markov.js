/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    this.makeText();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    
    const wordObj = {};
   
    for(let i = 0; i < this.words.length ; i++){
       const wordKey = this.words[i];
       const wordVal = i == this.words.length - 1 ? null : this.words[i+1];  
       let arr = wordObj[wordKey] || [];
        arr.push(wordVal);
        wordObj[wordKey] = arr;
      }
       return wordObj;
      
  }
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  
  /** return random text from chains */

  makeText(numWords = 100) {
    let wordkeys = Object.keys(this.makeChains())
    let key = MarkovMachine.choice(wordkeys);
    let out = [];
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(wordkeys);
    }

    return out.join(" ");
  }
}
module.exports = {
  MarkovMachine,
};
// makeText
// let mm = new MarkovMachine("the cat in the hat");

