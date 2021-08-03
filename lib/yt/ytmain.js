const chalk = require("chalk")
const writelog = require("../misc/writelog")
const path = require("path")
const utxo = require("../lbry/utxo")
let appDir = path.dirname(require.main.filename)
let configDir = appDir + "/config.json"

module.exports = async function(){

const config = require(configDir)
let ytChannelID = config.youtubeChannelID

    console.log(chalk.greenBright("Youtube Sync Mode Selected."))
    let utxoData = await utxo.checkUTXO();
    console.log(chalk.yellowBright("Checking UTXO amount..."))
    if(utxoData === "error"){
      return "error"
    }
    utxoData = utxoData - 2
    console.log(chalk.greenBright("You have " +utxoData+ " UTXOs"))

    console.log(chalk.yellowBright("Checking your YouTube Channel ID..."))
    try {

        1
        
    } catch (error) {
        
    }
    


}