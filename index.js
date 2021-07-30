const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
const genConfig = require("./lib/misc/genConfig")
const readlineSync = require("readline-sync")
const utxo = require("./lib/lbry/utxo")


console.log(chalk.yellowBright("Welcome to Sync with LBRY!"))

let options = ["Sync from YouTube","Exit"]
let chosenOp 

let execEverything = async function(){


  await genConfig();
  chosenOp = readlineSync.keyInSelect(options, 'Select your Destiny!');

  if(chosenOp === 0){
    console.log(chalk.greenBright("Youtube Sync Mode Selected."))
    let utxoData = await utxo.checkUTXO();
    if(utxoData === "error"){
      return "error"
    }
    console.log("utxoDataOK")
  }


}


execEverything()