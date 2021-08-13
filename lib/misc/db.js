const fs = require("fs")
const chalk = require("chalk")
const readlineSync = require("readline-sync")

module.exports = {


    exists : async function(appdir){
 
        let dbdir = `${appdir}/db.json`
        return fs.existsSync(dbdir)

    },
    compare : async function(appDir,videoCount){

    dbData = require(`${appDir}/db.json`)

    if(videoCount===dbData.length){
      console.log(chalk.blueBright("All video IDs seems to be already stored, skipping"))
      return false;
    }
    console.log(chalk.yellow.bold("A DB ALREADY EXISTS. CONTINUING WILL OVERWRITE THE CURRENT DB"))
    if(readlineSync.keyInYNStrict(chalk.red.bold("DO YOU WANT TO CONTINUE?")) === false){

      return "abort";

    }

    return true

    }


}