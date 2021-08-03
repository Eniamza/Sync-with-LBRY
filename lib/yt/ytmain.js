const chalk = require("chalk")
const writelog = require("../misc/writelog")
const path = require("path")
const utxo = require("../lbry/utxo")
const youtubedl = require("youtube-dl-exec")
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

        youtubedl('https://www.youtube.com/watch?v=fF0bG-4QFHg&pp=sAQA', {
  dumpJson: true,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true
})
  .then(output => console.log(output))
        
    } catch (error) {
        
    }
    


}