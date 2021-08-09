const fs = require("fs")

module.exports = {


    exists : async function(appdir){
 
        let dbdir = `${appdir}/db.json`
        return fs.existsSync(dbdir)

    }


}