const CONSTANTS = require('../const/constants');
const UserModel = require('../models/user');

/**
 * removes all the users from the collection
 */
function removeAllUser(){
    UserModel.remove({}, (err)=>{
        
    })
}
/***
 * adds the user to the collection if the user is not present in it previously
 */
 async function addUser(userId, userName){
    let result;
    try{
        await UserModel.find({id: userId}).then( async ( users)=>{
            if(users.length === 0){
                const user = new UserModel({
                    id: userId, 
                    name: userName
                });
                try{
                    await user.save();
                }
                catch(e){
                    result = false;
                }
                result = true;
            }    
            else{
                //user exists
                result = false;
            }
            return result;
        });
    }
    catch(e){
        result = false;
    }
    return result;
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
 * sends the messages to all the users in the collection
 */
function sendMessageToUsers(telegram){
    let userIds = [];
    UserModel.find({}, async (err, users)=>{
        if(err){
            console.log('error here', error);
        }
        let worldStats = await getWorldStatsBot();
        let indiaStats = await getIndiaStatsBot();
        let indiaTopThreeStats = await getTopThreeIndiaBot();
        for(user of users){
            telegram.sendMessage(user.id, worldStats);
            telegram.sendMessage(user.id, indiaStats);
            telegram.sendMessage(user.id, indiaTopThreeStats);
        }
    })
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
    addUser: addUser,
    getUserControls: getUserControls,
    sendMessageToUsers: sendMessageToUsers,
    sendMessageToUser: sendMessageToUser
}