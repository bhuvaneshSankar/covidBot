const express = require('express');
const mongoose = require('mongoose');

var TelegramBot = require('node-telegram-bot-api');
const CONSTANTS = require('./const/constants');
let botController = require('./controllers/botController');


require('dotenv').config()
const app = express();
const telegram = new TelegramBot(process.env.TELEGRAMKEY, { polling: true });
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true
})

/***
 * bot responds according to the user messages
 */
telegram.on("text", async (message) => {
    if(message.text.toLowerCase().indexOf(CONSTANTS.BOTREQUESTS.START)===0){
        let userId = message.from.id;
        let userName = message.from.first_name;
        if(message.from.last_name != undefined){
            userName += ' ' + message.from.last_name;
        }
        try{
            if(await botController.addUserBot(userId, userName)===true){
                let userControls = botController.getUserControlsBot(userName);
                telegram.sendMessage(message.chat.id, userControls); 
                botController.sendMessageToUserBot(telegram, userId);
            }
            else{
                telegram.sendMessage(message.chat.id, CONSTANTS.MESSAGES.SUBSCRIPTIONERRORMESSAGE);
            }
        }
        catch(e){
            telegram.sendMessage(message.chat.id, CONSTANTS.MESSAGES.SUBSCRIPTIONERRORMESSAGE);
        }
    }
    else if(message.text.toLowerCase().indexOf(CONSTANTS.BOTREQUESTS.WORLD)===0){

        let replyData = await botController.getWorldStatsBot();

        telegram.sendMessage(message.chat.id, replyData); 
        
  }
  else if(message.text.toLowerCase().indexOf(CONSTANTS.BOTREQUESTS.INDIATOPTHREE)===0){
    let replyData = await botController.getTopThreeIndiaBot();
    telegram.sendMessage(message.chat.id, replyData);
  }
  else if(message.text.toLowerCase().indexOf(CONSTANTS.BOTREQUESTS.INDIA)===0){
    let replyData = await botController.getIndiaStatsBot();
    telegram.sendMessage(message.chat.id, replyData); 
  }
  
  else{
      telegram.sendMessage(message.chat.id, CONSTANTS.MESSAGES.USERCONTROLS);
  }
});

setInterval(sendMesageToUsers, 3600000);
function sendMesageToUsers(){
    botController.sendMessageToUsersBot(telegram);
}

app.listen(process.env.PORT || 3000);