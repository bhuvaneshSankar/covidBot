var request = require("request");
const CONSTANTS = require('../const/constants');
const URLS = require('../const/url');

/**
 * returns the latest covid data of india as a promise
 */
getLatestIndiaStatsService = () => {
    let requestWrapper = {
        method: CONSTANTS.UTILS.GET,
        url: URLS.GETDATABYCOUNTRYCODE,
        qs: {format: CONSTANTS.UTILS.JSON, code: CONSTANTS.UTILS.INDIACODE},
        headers: {
          'x-rapidapi-host': URLS.HOSTURL,
          'x-rapidapi-key': process.env.RAPIDAPIKEY
        }
    };
    return new Promise((resolve, reject) => {
        request.get(requestWrapper, function (error, response, body) {
            if(error){
                reject(error);
            }
            else{
                resolve(body);
            }
        });
     });
}
/**
 * returns the covid data of india for a specific date as a promise
 */
getIndiaStatsByDateService = (specificDate) =>{
    let requestWrapper = {
        method: CONSTANTS.UTILS.GET,
        url: URLS.GETREPORTBYCOUNTRYCODE,
        qs: {format: CONSTANTS.UTILS.JSON, 'date-format': 'YYYY-MM-DD', date: specificDate, code: CONSTANTS.UTILS.INDIACODE},
        headers: {
          'x-rapidapi-host': URLS.HOSTURL,
          'x-rapidapi-key': process.env.RAPIDAPIKEY
        }
    };
    return new Promise((resolve, reject) => {
        request.get(requestWrapper, function (error, response, body) {
            if(error){
                reject(error);
            }
            else{
                resolve(body);
            }
        });
    });
}
/**
 * used to get the newly affected cases for the present day in india
 */
getIndianStatsDifferenceService = async () => {
    let dateFormatYesterday = getYesterdayDate();
    try{
        let todayResp = await getLatestIndiaStatsService();
        let yesterdayResp = await getIndiaStatsByDateService(dateFormatYesterday);
        let dataDiff =  getDataDifference(JSON.parse(yesterdayResp)[0].provinces[0], JSON.parse(todayResp)[0]);
        return dataDiff;    
    }
    catch(e){
        //error
    }
}
/**
 * returns the top three affected states in india as a promise
 */
getTopThreeIndiaStatsService =  () => {
    let requestWrapper = {
        method: CONSTANTS.UTILS.GET,
        url: URLS.GETINDIASTATESDATASORTED,
        headers: {
          'x-rapidapi-host': URLS.INDIAHOSTURL,
          'x-rapidapi-key': process.env.RAPIDAPIKEY
        }
      };
    return new Promise((resolve, reject) => {
        request.get(requestWrapper, function (error, response, body) {
            if(error){
                reject(error);
            }
            else{
                let data = [];
                body = JSON.parse(body);
                data.push(body[0]);
                data.push(body[1]);
                data.push(body[2]);
                resolve(data);
            }
        });
    });
}
/***
 * returns the all over world data of covid-19 as a promise
 */
getWorldStatsService = () => {
    let requestWrapper = {
      method: CONSTANTS.UTILS.GET,
      url: URLS.GETTOTALDATA,
      qs: {format: CONSTANTS.UTILS.JSON},
      headers: {
        'x-rapidapi-host': URLS.HOSTURL,
        'x-rapidapi-key': process.env.RAPIDAPIKEY
      }
    };
    return new Promise((resolve, reject) => {
        request.get(requestWrapper, function (error, response, body) {
            if(error){
                reject(error);
            }
            else{
                resolve(body);
            }
        });
    });
}
/**
 * used to get the covid data all over the world upto a specific date
 */
getWorldStatsByDateService = (specificDate) => {
    var requestWrapper = {
        method: CONSTANTS.UTILS.GET,
        url: URLS.GETTOTALDATABYDATE,
        qs: {'date-format': 'YYYY-MM-DD', format: CONSTANTS.UTILS.JSON, date: specificDate},
        headers: {
          'x-rapidapi-host': URLS.HOSTURL,
          'x-rapidapi-key': process.env.RAPIDAPIKEY
        }
    };
    return new Promise((resolve, reject) => {
        request.get(requestWrapper, function (error, response, body) {
            if(error){
                reject(error);
            }
            else{
                resolve(body);
            }
        });
    });
}
/**
 * returns the data difference between two given dates
 * @param {*} dayOne 
 * @param {*} dayTwo 
 */
function getDataDifference(dayOne, dayTwo){
    let data = {
        "Confirmed cases today : " : '-',
        "Recovered cases today : " : '-',
        "Deaths today : " : '-'
    }
    if(dayOne.confirmed != undefined && dayTwo.confirmed != undefined){
        data["Confirmed cases today : "] = parseInt(dayTwo.confirmed)-parseInt(dayOne.confirmed);
    }
    if(dayOne.recovered != undefined &&  dayTwo.recovered != undefined){
        data["Recovered cases today : "] = parseInt(dayTwo.recovered)-parseInt(dayOne.recovered);
    }
    if(dayOne.deaths != undefined && dayTwo.deaths !=undefined){
        data["Deaths today : "] = parseInt(dayTwo.deaths)-parseInt(dayOne.deaths);
    }
    return data;
}
/***
 * used to get the date of previous day
 */
function getYesterdayDate() {
    let d = new Date(); 
    d.setDate(d.getDate() - 1);
    let month = d.getMonth()+1;
    let monthString = "";
    monthString = month < 10 ? "0"+month : month.toString();
    let dateFormatYesterday = d.getFullYear() + "-" + monthString + "-" + d.getDate();
    return dateFormatYesterday;
}
/**
 * returns the  newly affected cases for the present day all over the world
 */
getWorldStatsDiffService = async () => {
    let dateFormatYesterday = getYesterdayDate();
    try{
        let todayResp = await getWorldStatsService();
        let yesterdayResp = await getWorldStatsByDateService(dateFormatYesterday);
        let dataDiff =  getDataDifference(JSON.parse(yesterdayResp)[0], JSON.parse(todayResp)[0]);
        return dataDiff;    
    }
    catch(e){
        //error
    }
}

module.exports = {
    getLatestIndiaStatsService: getLatestIndiaStatsService,
    getTopThreeIndiaStatsService: getTopThreeIndiaStatsService,
    getWorldStatsService: getWorldStatsService,
    getWorldStatsDiffService: getWorldStatsDiffService,
    getIndianStatsDifferenceService: getIndianStatsDifferenceService
}