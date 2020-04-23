const UTILS = {
    USERSFILEPATH: 'userDetails/users.txt',
    UTF8: 'utf8',
    NEWLINE: '\n',
    COLON: ':',
    HASH: '#',
    GET: 'GET',
    JSON: 'json',
    INDIACODE: 'in',
    COMMA: ', '
    
}
const BOTREQUESTS = {
    START: '/start',
    WORLD: 'world',
    INDIA: 'india',
    INDIATOPTHREE: 'india-top-three'
}
const MESSAGES = {
    SUBSCRIPTIONERRORMESSAGE: "Sorry we couldn't add you now.  Check if you had already subscribed to the bot or try again after sometimes.",
    DATAERRORMESSAGE: 'Having issues in getting data, will update you soon...',
    COVIDUPDATE: "Covid-19 Update - ",
    CONFIRMED: "Confirmed : ",
    RECOVERED: "Recovered : ",
    CRITICAL: "Critical : ",
    DEATHS: "Deaths : ",
    CONFIRMEDTODAY: "Confirmed Today : ",
    RECOVEREDTODAY: "Recovered Today : ",
    DEATHSTODAY: "Deaths Today : ",
    WORLDSTATUS: "World Status",
    INDIASTATUS: "India Status",
    TOPTHREESTATESAFFECTEDININDIA: "Top 3 states affected in India",
    STATENAME: "State Name : ",
    TOTALCASES: "Total Cases : ",
    NODATAAVAILABLE: "Error...No data available",
    HELLO: "Hello",
    WELCOMEMESSAGE: "Thank you for subscribing to covid updater bot.\n",
    USERCONTROLS: "User Controls \n"+
                        "Hit a message with one of the following commands to get the data update.\n" + 
                        "1.  world : To get details of covid-19 all over the world.\n" +
                        "2.  india : To get details of covid-19 in India.\n" + 
                        "3.  india-top-three : To get the details of top three affected states in India.\n" + 
                        "You will be getting the details of covid-19 once in 8 hours.\n" +  
                        "Stay Home! Stay Safe!"
}

module.exports = {
    UTILS: UTILS,
    BOTREQUESTS: BOTREQUESTS,
    MESSAGES: MESSAGES
}