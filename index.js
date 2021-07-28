const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
let appDir = path.dirname(require.main.filename)

console.log(chalk.yellowBright("Welcome to Sync with LBRY!"))
console.log(chalk.yellowBright("Initiating Configuration Checks..."))

let configDir = appDir + "/config.json"

console.log();

if(fs.existsSync(configDir)=== false){

 console.log(chalk.red.bold("Config File not found!"))
 console.log(chalk.yellowBright("Redirecting to Configuration Generation Module..."))

}