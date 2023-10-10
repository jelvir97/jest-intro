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
    // TODO
    const chains = {}
    for(let x = 0; x<this.words.length; x++){
      if(this.words[x+1]){

        if(chains[this.words[x].toLowerCase()]){
          chains[this.words[x].toLowerCase()].push(this.words[x+1].toLowerCase())
        }else{
          chains[this.words[x].toLowerCase()] = [this.words[x+1].toLowerCase()]
        }

      }else{
        if(chains[this.words[x].toLowerCase()]){
          chains[this.words[x].toLowerCase()].push(null)
        }else{
          chains[this.words[x].toLowerCase()] = [null]
        }
      }
      
    }
    return chains;
  }

  randProp(obj){
    const objKeys = Object.keys(obj)
    const randIndex = Math.floor(Math.random() * objKeys.length)
    return objKeys[randIndex]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const chains = this.makeChains();
    let word = this.randProp(chains)

    const arr = [word]
    for(let x=1; x<numWords;x++){
      const choiceList = chains[word]
      const len = choiceList.length

      if(!len) break;
      const newWord = choiceList[Math.floor(Math.random() * len)]
      if(!newWord) break;
      arr.push(newWord)

      word = newWord
    }
    return arr.join(' ')
  }
}

module.exports = { MarkovMachine }
