const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require("./markov");


function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }
  

function cat(path) {
    
        fs.readFile(path,'utf8',(err,data)=>{
            if(err){
                console.log("ERROR:", err.stack);
                
                process.exit(1)
            }
            
            let fileText = generateText(data);
            console.log(fileText);
        })
}
function webCat(webpath){
    
            axios.get(webpath).then(function(resp) {
                let urlText = generateText(resp.data.slice(0, 80), '...');
            console.log(urlText);
 });

}
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}
if(isValidUrl(process.argv[2]) && process.argv[2] == "url"){
    webCat(process.argv[3]);
}
else if(process.argv[2] == "file") {
    cat(process.argv[3]);
}
else {
    console.error(`Unknown method: ${process.argv[2]}`);
    process.exit(1);
  }
  
