const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
const genConfig = require("./lib/misc/genConfig")


console.log(chalk.yellowBright("Welcome to Sync with LBRY!"))

let execEverything = async function(){


  await genConfig();


}


execEverything()