const axios = require("axios")
const account = require("./account")
const writelog = require("../misc/writelog")
const chalk = require("chalk")
const sdkURL = "http://localhost:5279"


module.exports = {


checkUTXO: async function(){
    

let accountID = await account.getID()
let utxoData
if(accountID === "error"){
    return "error"
}
let params = {"method": "utxo_list", "params": {"account_id": `${accountID}`, "page_size":100}}
try{

    utxoData = await axios.post(sdkURL,params);
    utxoData = utxoData.data

}catch(error){

    console.log(chalk.red.bold("Oppsy! Error occured: "+error))
    writelog.write(error);
    return "error"

}

let total_items = utxoData.result.total_items
//console.log(total_items)
    



return total_items

} 


}