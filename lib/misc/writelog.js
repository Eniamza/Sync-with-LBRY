const fs = require("fs")
const path = require("path")
let appDir = path.dirname(require.main.filename)

module.exports = {

write: async function(output){
    let date = new Date()

    fs.appendFile(`${appDir}/log.txt`, `${date.toLocaleString()}: ${output}\n`, function (err) {
        if (err) throw err;
        //console.log('Saved!');
      });

}


}