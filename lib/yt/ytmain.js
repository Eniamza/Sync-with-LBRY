const chalk = require("chalk")
const utxo = require("../lbry/utxo")

module.exports = async function(){


    console.log(chalk.greenBright("Youtube Sync Mode Selected."))
    let utxoData = await utxo.checkUTXO();
    if(utxoData === "error"){
      return "error"
    }
    console.log("utxoDataOK")


}