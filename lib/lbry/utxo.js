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
let params = {"method": "utxo_list", "params": {"account_id": `${accountID}`}}
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

},

reqUtxo: async function(videoCount,currUTXO){

    try {

    let reqUTXO = (videoCount - currUTXO) + 1 
    return reqUTXO
        
    } catch (error) {

        writelog.write("Error when fetching Required UTXO")
        return "error"
    }

    

},

create: async function(reqUTXO,amountLBC){

    let balance = await account.getBalance()
    let accountID = await account.getID()
    

    let totalLBC = reqUTXO*amountLBC
    if(balance<amountLBC){

        console.log(chalk.red.bold("You don't have enough balance to create UTXOs. Send some LBC to your wallet and try again!"))
        writelog.write("Not enough LBC for UTXOs")
        return "error"
    }
    console.log(totalLBC)
    let params = {"method": "account_fund", "params": {"from_account":`${accountID}`,"to_account": `${accountID}`, "amount": `${amountLBC}`, "outputs":`${reqUTXO}`, "broadcast": true}}

    //lbrynet account fund --from_account="+id+" --to_account="+id+" --amount \""+Double.valueOf(jtfUTXOsTotalLBC.getText())+"\" --outputs="+jtfUTXOsTotalUTXOs.getText()+" --broadcast

}

}