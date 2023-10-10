/** Command-line tool to generate Markov text. */
const fs = require('fs')
const axios = require('axios')
const {MarkovMachine} = require('./markov')
const path = process.argv[2]

function cat(){
    fs.readFile(path,'utf8', (err,data) =>{
        if (err) {
            console.error('Error: ',err);
            process.exit(1);
          }
        const mm = new MarkovMachine(data);
        const text = mm.makeText()
        console.log(text)
        return  text
    })
}

async function webCat(path){
    const {data} = await axios.get(path)
    
    const mm = new MarkovMachine(data);
    const text = mm.makeText()
    console.log(text)
    return  text
}

try{
    new URL(path)
    webCat(path)

}catch{
    cat(path)
    console.log('CAUGHT!')
}
