let fs = require('fs');
const CONSTANTS = require('../const/constants');

/***
 * checks whether the userid is already present in the userlist file
 */
function isIdPresent(userId){
    let contents = fs.readFileSync(CONSTANTS.UTILS.USERSFILEPATH, CONSTANTS.UTILS.UTF8);
    let users = contents.split(CONSTANTS.UTILS.NEWLINE);
    userId = userId.toString();
    for(user of users){
        let localUserId = user.split(CONSTANTS.UTILS.COLON)[0];
        if(userId === localUserId){
            return true;
        }
    }
    return false;
}
/***
 * adds the user to the userlist file if the user is not present in it previously
 */
function addUser(userId, userName){
    if(isIdPresent(userId)===true){
        return false;
    }
    let userDetails = userId + CONSTANTS.UTILS.COLON + userName + CONSTANTS.UTILS.NEWLINE;
    fs.appendFile(CONSTANTS.UTILS.USERSFILEPATH, userDetails, function (err) {
        if (err) return false;
    });
    return true;
}
/***
 * returns the message to be displayed for user controls
 */
function getUserControls(userName){
    let welcomeUser = CONSTANTS.MESSAGES.HELLO + ' ' + userName + ' ' +  CONSTANTS.UTILS.COMMA + CONSTANTS.MESSAGES.WELCOMEMESSAGE + CONSTANTS.UTILS.NEWLINE;
    let userControls = CONSTANTS.MESSAGES.USERCONTROLS;
    return welcomeUser+userControls; 
}
/***
 * sends the messages to all the users in the userslist
 */
function sendMessageToUsers(telegram){
    let userIds = [];
    fs.readFile(CONSTANTS.UTILS.USERSFILEPATH, CONSTANTS.UTILS.UTF8, async function(err, contents) {
        if(err){
        }
        let users = contents.split(CONSTANTS.UTILS.NEWLINE);
        for(let i=0; i<users.length; i++){
            let user = users[i].split(CONSTANTS.UTILS.COLON);
            userIds.push(user[0]);
        }
        let worldStats = await getWorldStatsBot();
        let indiaStats = await getIndiaStatsBot();
        let indiaTopThreeStats = await getTopThreeIndiaBot();
        for(let i=0; i<userIds.length; i++){
            let userId = userIds[i];
            if(userId != undefined && userId != ''){
                telegram.sendMessage(userId, worldStats);
                telegram.sendMessage(userId, indiaStats);
                telegram.sendMessage(userId, indiaTopThreeStats);
            }
        }  
    });    
}
/***
 * sends the messages to the specified user
 */
async function sendMessageToUser(telegram, userId){
    let worldStats = await getWorldStatsBot();
    let indiaStats = await getIndiaStatsBot();
    let indiaTopThreeStats = await getTopThreeIndiaBot();
    telegram.sendMessage(userId, worldStats);
    telegram.sendMessage(userId, indiaStats);
    telegram.sendMessage(userId, indiaTopThreeStats);
}
module.exports = {
    isIdPresent: isIdPresent,
    addUser: addUser,
    getUserControls: getUserControls,
    sendMessageToUsers: sendMessageToUsers,
    sendMessageToUser: sendMessageToUser
}