const chalk = require("chalk")
const writelog = require("../misc/writelog")
const path = require("path")
const utxo = require("../lbry/utxo")
const youtubedl = require("youtube-dl-exec")
const youtube = require("./youtube")
const { Console } = require("console")
let appDir = path.dirname(require.main.filename)
let configDir = appDir + "/config.json"

module.exports = async function(){

const config = require(configDir)
let ytChannelID = config.youtubeChannelID
let channelURL = `https://www.youtube.com/channel/${ytChannelID}`
let options = {
  dumpSingleJson: true,
  flatPlaylist: true
}
let channelName;
let videoCount;
let respData;

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

      respData = await youtubedl(channelURL, options)
      channelName = respData.title.split("-")[0].trim()
        
    } catch (error) {

      console.log(chalk.red.bold("There was an error while fetching your channel, Check your channel ID and try again!"))
      writelog.write(error);
      return
        
    }

    console.log(chalk.greenBright(`Hey ${channelName}, Good to see you there!`))
    
    try {

      console.log(chalk.yellowBright("Counting your videos..."))
      console.log(chalk.blueBright("[This may take a while based on your channel Size]"))
      videoCount = await youtube.countVideos(channelURL)


      
    } catch (error) {
 
      writelog.write(error)
      return;

    }
    
    console.log(chalk.greenBright(`You have ${videoCount} videos in your channel!`))
  


}