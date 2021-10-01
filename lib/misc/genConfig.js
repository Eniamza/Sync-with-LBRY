const chalk = require("chalk")
const path = require("path")
const fs = require("fs")
const writelog = require("./writelog")
const readlineSync = require("readline-sync")
let appDir = path.dirname(require.main.filename)



module.exports = async function(){


let configDir = appDir + "/config.json"

let config;

console.log(chalk.yellowBright("Initiating Configuration Checks..."))
        
if(fs.existsSync(configDir)=== true){
    
      console.log(chalk.greenBright("Config File Found! Loading..."))
      config = require(configDir)

      if(config.youtubeChannelID.length === 0 || config.lbryChannelName.length === 0){

         console.log(chalk.red.bold("Incorrect Configuration, Please check again!"))
         readlineSync.keyInPause(chalk.yellowBright("Exiting..."));
         let error = "Incorrect Configuration, Please check again!"
         writelog.write(error)
         return 1

      }
      
      return 0
          
   } 
else{

   console.log(chalk.red.bold("Config File not found!"))
   console.log(chalk.greenBright("Generate one, It's Easy :)"))
   let error = "Config File not found."
         writelog.write(error)
   return 1

}



}
