var zzz = require('poloniex.js');
var Promise = require("bluebird");

var poloniex = {};

module.exports = function(apiKey,secret){

    poloniex = new zzz(apiKey,secret);

    return {
        returnTicker: returnTicker,
        returnBalances: returnBalances,
        sell: sell,
        buy: buy,
    }
}




function returnTicker(){
   return new Promise(function(resolve,reject){
      return poloniex.returnTicker(function(err,data){
         if(err){
            reject(err)
         } else {
            resolve(data);
         }
      });
   });
}

function returnBalances(){
   return new Promise(function(resolve,reject){
      return poloniex.returnBalances(function(err,data){
         if(err){
            reject(err)
         } else {
            resolve(data);
         }
      });
   });
}

function sell(currencyA, currencyB, rate, amount){
   return new Promise(function(resolve,reject){
      return poloniex.sell(currencyA, currencyB, rate, amount, function(err,data){
         if(err){
            reject(err)
         } else {
            resolve(data);
         }
      });
   });
}

function buy(currencyA, currencyB, rate, amount){
   return new Promise(function(resolve,reject){
      return poloniex.buy(currencyA, currencyB, rate, amount, function(err,data){
         if(err){
            reject(err)
         } else {
            resolve(data);
         }
      });
   });
}