const chalk = require("chalk");
const youtubedl = require("youtube-dl-exec");
const writelog = require("../misc/writelog");
module.exports = {

    countVideos: async function(channelURL){

       let videosURL = `${channelURL}/videos`
       let responseData;
       let options = {
        dumpSingleJson: true,
        flatPlaylist: true
      }

      try {

        responseData = await youtubedl(videosURL,options)
          
      } catch (error) {

        console.log(chalk.red.bold("Oppsy! There was an error while counting your videos"))
        writelog.write(error)
          
      }

      
      return responseData.entries.length

    }


}