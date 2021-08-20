const chalk = require("chalk")
const fs = require("fs")
const writelog = require("../misc/writelog")
const path = require("path")
const utxo = require("../lbry/utxo")
const youtubedl = require("youtube-dl-exec")
const youtube = require("./youtube")
const readlineSync = require("readline-sync")
const db = require("../misc/db")
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
let reqUTXO;
let amountLBC;
let dbData;

    console.log(chalk.greenBright("Youtube Sync Mode Selected."))
let currUTXO = await utxo.checkUTXO();
    console.log(chalk.yellowBright("Checking UTXO amount..."))
    if(currUTXO === "error"){
      return "error"
    }
    currUTXO = currUTXO - 2
    console.log(chalk.greenBright("You have " +currUTXO+ " UTXOs"))

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
  
    if(videoCount<=0){

      console.log(chalk.red.bold("It seems you do not have any video in your channel yet. Upload some to get the game stated ;)"))

    }
    if(videoCount>1200){

      console.log(chalk.blue.bold("Currently the Sync with LBRY is limited to 1200 videos for efficiency, but support for larger channel will be available \nin a future release.\nMeanwhile, Check here to get your videos synced by LBRY Inc without any cost!\n"+chalk.green.bold("https://lbry.com/youtube")))
      writelog.write("Video count is greater than 1200")
      return;
      
    }

    try {

      reqUTXO = await utxo.reqUtxo(videoCount,currUTXO)
      if(reqUTXO === "error"){
        throw "error"
      }
      
    } catch (error) {

      return;
      
    }

    console.log(chalk.greenBright.bold("You have: ")+ chalk.greenBright(`${currUTXO} UTXOs`))
    console.log(chalk.greenBright.bold("You need: ")+ chalk.greenBright(`${reqUTXO} UTXOs`))
    let isLongName = config.longClaimNames
    if(reqUTXO > 0){

      console.log(chalk.yellowBright("It seems you need some more! Initiating UTXO Generation!"))
      if(isLongName){

        amountLBC = 0.2
        reqLBC = Math.ceil(reqUTXO*amountLBC)
        console.log(chalk.greenBright("So you have chosen for the top-notch!\nWe'll continue with Full Title Claim URLs!"))
        
        if(!readlineSync.keyInYNStrict(chalk`{blueBright You need to have {inverse ${ reqLBC }} LBC in your account. Do you want to continue?}`)){
          console.log(chalk.red.bold("Gotcha! Aborting..."))
          return
        }

        respData = await utxo.create(reqUTXO,amountLBC)
        if(respData === "error"){
          return;
        }
      }
      else{
        amountLBC = 0.05
        reqLBC = Math.ceil(reqUTXO*amountLBC)
        console.log(chalk.greenBright("LBC is precious indeed! We'll continue with Shorter claim urls!"))

        if(!readlineSync.keyInYNStrict(chalk`{blueBright Please make sure you have {inverse ${reqLBC} LBC} in your account. Do you want to continue?}`)){
          console.log(chalk.red.bold("Gotcha! Aborting..."))
          return
        }

        respData = await utxo.create(reqUTXO,amountLBC)
        if(respData === "error"){
          return;
        }

      }

    }

  console.log(chalk.greenBright("Created UTXOs, Woohoo!"))  
 
  
  if(await db.exists(appDir)=== false){

    console.log(chalk.yellowBright("Creating Database for your neat videos!"))
    try {

      fs.open(`${appDir}/db.json`, 'w', function (err, f) {
        if (err) throw err
      });
      
    } catch (error) {

      console.log(chalk.red.bold("Failed to create DB, aborting..."))
      return;
      
    }

  }

  //VIDEO LIST FETCHING AND DATABASE LISTING

  let dbStatus = await db.compare(appDir,videoCount)

  if(dbStatus === "abort"){

    return;

  }
  else if(dbStatus){
  console.log(chalk.yellowBright("Storing your videos in the DB..."))
  let arrVideos = await youtube.arrVideos(channelURL)
  let videoObjArr = []
  let videoObj
  let ytid;
  let ytidArr=[];
  let claimid="";

  for(let count=0;count<videoCount;count++){

    ytid = arrVideos[count].id
    videoObj = {
        "ytid":`${ytid}`,
        "claimid":""
    }
    ytidArr.push(ytid)
    videoObjArr.push(videoObj)
  }

  try {
    
    console.log(videoObjArr)
    console.log(chalk.yellowBright("Finalizing the writes..."))
    fs.writeFileSync(`${appDir}/db.json`, JSON.stringify(videoObjArr,null,2) , function (err) {
      
      if (err){
        throw err
      }
      
    });
    console.log(chalk.greenBright("Video IDs have been stored!"))

  } catch (error) {
    console.log(chalk.red.bold("Error: "+error))
    writelog.write(error)
    return;
    
  }

}

  console.log(chalk.yellowBright("Checking if Download directoriy exists..."))

  try {

    if(fs.existsSync(`${appDir}/downloads`) === false){

      console.log(chalk.blueBright("Directory not found, creating one for you!"))
      fs.mkdirSync(`${appDir}/downloads`,function(err) {
        if (err) {
           throw err;
        }
        
     })

     console.log(chalk.greenBright("Directory created successfully!"));

    }
    else {
      console.log(chalk.greenBright("Directory exists!"))
    }
    
  } catch (error) {
    
    console.log(error)

  }
  
let tempData;
let DLindex;

  try {

    if(fs.existsSync(`${appDir}/tempData.json`)){

      tempData = require(`${appDir}/tempData.json`)
      console.log(chalk.yellowBright("It seems you had a Hiccup. Continuing from last saved state..."))
      DLindex = tempData.lastUp;
      DLindex++

    }
    else{

      DLindex = 0
      fs.writeFileSync(`${appDir}/tempData.json`, '{"lastUp":0}', function (err) {
        if (err) throw err
      });

    }
    
  } catch (error) {
    
    console.log(chalk.red.bold(error));
    writelog.write(error)
    return;

  }

//YOUTUBE DOWNLOAD AND LBRY PUBLISH PART!!!!!!!!!!!!!!!!!!!!!!!!!!
dbData = require(`${appDir}/db.json`)
  while(DLindex<videoCount){

    console.log(dbData[DLindex].ytid)
    try {
      
      fs.writeFileSync(`${appDir}/tempData.json`, `{"lastUp":${DLindex}}`, function (err) {
        if (err) throw err
      });

    } catch (error) {

      console.log(chalk.red.bold(error))
      writelog.write(error)
      
    }
    DLindex++

  }

    console.log(chalk.greenBright("Yay! You're all set for syncing!"))

  
    
    

}