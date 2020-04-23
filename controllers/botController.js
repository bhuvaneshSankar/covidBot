const covidController = require('./covidController');
const botService = require('../services/botService');
const CONSTANTS = require('../const/constants');

/***
 * controller for adding the user to the collection
 */
async function addUserBot(userId, userName){
    let result;
    try{
        result = await botService.addUser(userId, userName);
    }
    catch(e){
        result = false;
    }
    return result;
}
/**
 * controller for getting the usercontrolls data 
 * @param {*} userName 
 */
function getUserControlsBot(userName){
    return botService.getUserControls(userName);
}
/***
 * controller for sending message to all the users in the collection
 */
function sendMessageToUsersBot(telegram){
    return botService.sendMessageToUsers(telegram);
}
/***
 * controller for sending message to the specified user
 */
function sendMessageToUserBot(telegram, userId){
    return botService.sendMessageToUser(telegram, userId);
}
/***
 * controller for getting covid data all over the world
 */
getWorldStatsBot = async () => {
    let worldStats;
    try{  
        let worldData = await covidController.getWorldStats();
        let worldDataToday = await covidController.getWorldStatsDiff();
        if(worldData.isSuccess === true && worldDataToday.isSuccess === true){
            worldStats = getMessageBoilerPlate(CONSTANTS.MESSAGES.WORLDSTATUS, worldData, worldDataToday);
        }
        else{
            worldStats = CONSTANTS.MESSAGES.DATAERRORMESSAGE;
        }
    }
    catch(e){
        worldStats = CONSTANTS.MESSAGES.DATAERRORMESSAGE;
    }
    return worldStats;
}
/***
 * controller for getting covid data in india
 */
getIndiaStatsBot = async () => {
    let indiaStats;
    try{  
        let indiaData = await covidController.getLatestIndiaStats();
        let indiaDataToday = await covidController.getIndianStatsDiff();
        if(indiaData.isSuccess === true && indiaDataToday.isSuccess === true){
            indiaStats = getMessageBoilerPlate(CONSTANTS.MESSAGES.INDIASTATUS, indiaData, indiaDataToday);
        }
        else{
            indiaStats = CONSTANTS.MESSAGES.DATAERRORMESSAGE;
        }
    }
    catch(e){
        indiaStats = CONSTANTS.MESSAGES.DATAERRORMESSAGE;
    }
    return indiaStats;
}
/***
 * controller for getting top three affected states in india
 */
getTopThreeIndiaBot = async () => {
    let topThreeIndiaStats;
    try{
        let responseData = await covidController.getTopThreeIndiaStats();
        if(responseData.isSuccess === true){
            for(let i=0; i<3; i++){
                let stateStats = "";
                stateStats = CONSTANTS.UTILS.HASH + (i+1) + CONSTANTS.UTILS.NEWLINE + 
                              CONSTANTS.MESSAGES.STATENAME + responseData.data[i].name + CONSTANTS.UTILS.NEWLINE + 
                              CONSTANTS.MESSAGES.TOTALCASES + responseData.data[i].cases + CONSTANTS.UTILS.NEWLINE + 
                              CONSTANTS.MESSAGES.RECOVERED + responseData.data[i].recovered + CONSTANTS.UTILS.NEWLINE + 
                              CONSTANTS.MESSAGES.DEATHS + responseData.data[i].deaths + CONSTANTS.UTILS.NEWLINE;
                topThreeIndiaStats === undefined ? topThreeIndiaStats = CONSTANTS.MESSAGES.COVIDUPDATE + 
                    CONSTANTS.MESSAGES.TOPTHREESTATESAFFECTEDININDIA + CONSTANTS.UTILS.NEWLINE + stateStats : topThreeIndiaStats += stateStats;
            }
        }
    }
    catch(e){
        topThreeIndiaStats = CONSTANTS.MESSAGES.DATAERRORMESSAGE;
    }
    return topThreeIndiaStats;
}
/***
 * constructs the message to be displayed to the user with the overall data and newly affected data
 * params headerData - data to be displayed in the message header eg. world data
 * dataLatest - overall latest affected data
 * dataToday - affected data for the current day
 */
function getMessageBoilerPlate(headerData, dataLatest, dataToday){
    let info = {
        confirmed: dataLatest.data[0].confirmed,
        recovered: dataLatest.data[0].recovered,
        critical: dataLatest.data[0].critical,
        deaths: dataLatest.data[0].deaths,
        confirmedToday: dataToday.data["Confirmed cases today : "],
        recoveredToday: dataToday.data["Recovered cases today : "],
        deathsToday: dataToday.data["Deaths today : "] 
    }
    let text = CONSTANTS.MESSAGES.COVIDUPDATE + headerData +  CONSTANTS.UTILS.NEWLINE +  
                CONSTANTS.MESSAGES.CONFIRMED + info.confirmed + CONSTANTS.UTILS.NEWLINE + 
                CONSTANTS.MESSAGES.RECOVERED +  info.recovered + CONSTANTS.UTILS.NEWLINE + 
                CONSTANTS.MESSAGES.CRITICAL + info.critical + CONSTANTS.UTILS.NEWLINE + 
                CONSTANTS.MESSAGES.DEATHS + info.deaths + CONSTANTS.UTILS.NEWLINE + 
                CONSTANTS.MESSAGES.CONFIRMEDTODAY + info.confirmedToday + CONSTANTS.UTILS.NEWLINE + 
                CONSTANTS.MESSAGES.RECOVEREDTODAY + info.recoveredToday + CONSTANTS.UTILS.NEWLINE + 
                CONSTANTS.MESSAGES.DEATHSTODAY + info.deathsToday + CONSTANTS.UTILS.NEWLINE; 
    return text;
}

module.exports = {
    getWorldStatsBot: getWorldStatsBot,
    getIndiaStatsBot: getIndiaStatsBot,
    getTopThreeIndiaBot: getTopThreeIndiaBot,
    addUserBot: addUserBot,
    getUserControlsBot: getUserControlsBot,
    sendMessageToUsersBot: sendMessageToUsersBot,
    sendMessageToUserBot: sendMessageToUserBot
}