const axios = require("axios")
const chalk = require("chalk")
const writelog = require("./writelog")
const genConfig = require("./genConfig")
const { write } = require("./writelog")
const sdkURL = "http://localhost:5279"
module.exports = async function(){

let params
let respData
let error
    try {
        console.log(chalk.yellowBright("Checking if SDK is running..."))
        params = {"method": "status", "params": {}}
       respData = await axios.post(sdkURL,params)

        
    } catch (error) {
        writelog.write(error)
        console.log(chalk.red.bold("Seems like your LBRY app is not running. Launch it and Try again"))
        return 1;
    }
    try {

        respData = await genConfig()
        if(respData) throw "error"
        
    } catch (error) {

        return 1
        
    }


}