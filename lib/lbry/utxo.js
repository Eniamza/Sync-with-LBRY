const axios = require("axios")
const sdkURL = "http://localhost:5279"
let params = {"method": "claim_search", "params": {"claim_ids": ["f99c3699dadcefa2956c4503553011df1b511227"]}}

module.exports = {


checkUTXO: async function(){

let statusresp = await axios.post(sdkURL,params)
console.log(statusresp.data.result.items)

} 


}