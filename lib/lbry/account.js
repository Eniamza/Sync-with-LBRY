const axios = require("axios")
const SdkURL = "http://localhost:5279"
const chalk = require("chalk")
const writelog = require("../misc/writelog")
const fs = require("fs")
module.exports = {

getID: async function(){

    console.log(chalk.yellowBright("Fetching your account ID..."))
    let params = {"method": "account_list", "params": {"include_claims": false, "show_seed": false}}
    let responseData
    try {

        responseData = await axios.post(SdkURL,params)
        responseData = responseData.data
        
    } catch (error) {

        console.log(chalk.red.bold("Oppsy! Error occured: "+error))
        writelog.write(error);
        return "error";
        
    }
    
    let account_id = responseData.result.items[0].id
    
    console.log(chalk.greenBright("Successfully fetched your account ID"))
    return account_id;
    
    }

}