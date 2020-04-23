const covidService = require('../services/covidService');
const CONSTANTS = require('../const/constants');

/***
 * controller for getting latest data of india
 */
getLatestIndiaStats = async () => {
    let response = {
        isSuccess: false,
        data : CONSTANTS.MESSAGES.NODATAAVAILABLE
    }
    try{
        let res = await covidService.getLatestIndiaStatsService();
        response.isSuccess = true;
        response.data = JSON.parse(res);
    }
    catch(e){
        //error
    }
    return response;
}
/**
 * controller for getting top three affected states in india
 */
getTopThreeIndiaStats = async () => {
    let response = {
        isSuccess: true,
        data : CONSTANTS.MESSAGES.NODATAAVAILABLE
    }
    try{
        let res = await covidService.getTopThreeIndiaStatsService();
        response.isSuccess = true;
        response.data = res;
    }
    catch(e){
        //error
    }
    return response;
}
/***
 * controller for getting the covid data all over the world
 */
getWorldStats = async () => {
    let response = {
        isSuccess: false,
        data : CONSTANTS.MESSAGES.NODATAAVAILABLE
    }
    try{
        let res = await covidService.getWorldStatsService();
        response.isSuccess = true;
        response.data = JSON.parse(res);
    }
    catch(e){
        //error
    }
    return response;
}
/***
 * controller for getting the newly affected data for the current day all over the world
 */
getWorldStatsDiff = async () => {
    let response = {
        isSuccess: false,
        data : CONSTANTS.MESSAGES.NODATAAVAILABLE
    }
    try{
        let res = await covidService.getWorldStatsDiffService();
        response.isSuccess = true;
        response.data = res;
    }
    catch(e){
        //error
    }
    return response;
}
/***
 * controller for getting the newly affected data for the current day in india
 */
getIndianStatsDiff = async() => {
    let response = {
        isSuccess: false,
        data : CONSTANTS.MESSAGES.NODATAAVAILABLE
    }
    try{
        let res = await covidService.getIndianStatsDifferenceService();
        response.isSuccess = true;
        response.data = res;
    }
    catch(e){
        //error
    }
    return response;
}
module.exports = {
    getLatestIndiaStats: getLatestIndiaStats,
    getTopThreeIndiaStats: getTopThreeIndiaStats,
    getWorldStats: getWorldStats,
    getWorldStatsDiff: getWorldStatsDiff,
    getIndianStatsDiff: getIndianStatsDiff
}