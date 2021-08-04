const chalk = require("chalk")
const readlineSync = require("readline-sync")
const ytmain = require("./lib/yt/ytmain")
const precheck = require("./lib/misc/precheck")

console.log(chalk.yellowBright("Welcome to Sync with LBRY!"))

let options = ["Sync from YouTube"]
let chosenOp 

let execEverything = async function(){


 check = await precheck()
 if(check){

  readlineSync.keyInPause(chalk.red.bold("Error encountered, Exiting..."))
  return; 

 }
  chosenOp = readlineSync.keyInSelect(options, 'Select your Destiny!');

  if(chosenOp === 0){

    ytmain();
    
  }


}


execEverything()