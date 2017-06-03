var zzz = require('poloniex.js');
var Promise = require("bluebird");
var argv = require('yargs')
    .usage('Usage $0 -c <currencyPair> -p <percentage> [options]')
    .example('$0 -c BTC_ETH -p 10', 'buy 10% of your bitcoin reserves in ethereum at the lowest asking price')
    .example('$0 -c BTC_ETH -p 10 -l 30', 'buy 10% of your bitcoin reserves in ethereum at the lowest asking price and set a limit to sell it at a price 30% higher')
    .alias('c', 'currencyPair')
    .alias('p', 'baseBuyPercentage')
    .alias('l', 'sellLimitPercentage')
    .describe('c', 'the currency pair to trade on')
    .describe('p', 'the percentage of your base currency you want to use for purcasing')
    .describe('l', 'the percentage higher you want to sell your currency for')
    .demand(['c','p'])
    .help('h')
    .alias('h', 'help')
    .argv;

var apiKey = process.env.API_KEY;
var secret = process.env.API_SECRET;
var poloniex = new zzz(apiKey,secret);


console.log(argv)


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


function calculateLimits(obj){
   var currencyPair = obj.currencyPair;
   var tradeCurrency = obj.tradeCurrency;

   var coinTicker = obj.ticker[currencyPair];
   var coinBalance = parseFloat(obj.balances[tradeCurrency]);
   var last = parseFloat(coinTicker.last);
   var upperPercentage = last * obj.sellLimitHighPercentage;
   var lowerPercentage = last * obj.sellLimitLowPercentage;
   var lowerLimit = last - lowerPercentage;
   var upperLimit = last + upperPercentage;

   obj.limits = {};
   obj.limits[currencyPair] = {
      amount: coinBalance.toFixed(8),
      lower: lowerLimit.toFixed(8),
      upper: upperLimit.toFixed(8)
   };

   return obj;
}

function calculateBuy(obj){
   var currencyPair = obj.currencyPair;
   var tradeCurrency = obj.tradeCurrency;
   var baseCurrency = obj.baseCurrency;

   //get your balance
   var baseBalance = parseFloat(obj.balances[baseCurrency]);
   //use a percentage of it to buy the trade currency
   var baseAmount = baseBalance * obj.baseBuyPercentage;

   var coinTicker = obj.ticker[currencyPair];
   var rate = parseFloat(coinTicker.lowestAsk);

   //you must specify amount as tradeCurrency not baseCurrency
   var amount = baseAmount/rate;

   obj.buys={};
   obj.buys[currencyPair] = {
      baseAmount: baseAmount.toFixed(8),
      amount: amount.toFixed(8),
      rate: rate.toFixed(8)
   };

   return obj;

}

function setSellLimit(obj){
   var currencyPair = obj.currencyPair;
   var tradeCurrency = obj.tradeCurrency;
   var baseCurrency = obj.baseCurrency;

   console.log(obj.limits);
   var limitObj = obj.limits[currencyPair];
   return sell(baseCurrency, tradeCurrency,limitObj.upper, limitObj.amount).then(function(data){
      console.log(data);
      return obj;
   });
}

function placeBuy(obj){
   var currencyPair = obj.currencyPair;
   var tradeCurrency = obj.tradeCurrency;
   var baseCurrency = obj.baseCurrency;
   var buyObj = obj.buys[currencyPair];
   return buy(baseCurrency, tradeCurrency, buyObj.rate, buyObj.amount).then(function(data){
      console.log(data);
      return obj;
   });
}

function setParameters(){
   return Promise.all([returnBalances(),returnTicker()]).then(function(data){
      var obj = {};
      obj.baseCurrency = 'BTC';
      obj.tradeCurrency = 'ETH';
      obj.currencyPair = obj.baseCurrency +'_'+obj.tradeCurrency;
      obj.baseBuyPercentage = 0.01;
      obj.sellLimitHighPercentage = 0.30;
      //this doesn't work yet.
      obj.sellLimitLowPercentage = 0.20;

      obj.balances = data[0];
      obj.ticker = data[1];
      return obj;
   });
}



/*

poloniex-easy --currencyPair=BTC_ETH --baseBuyPercentage=1 --sellLimitPercentage=30

poloniex-buyer -c BTC_ETH -p 5 -s 30

setParameters()
    .then(calculateBuy)
    .then(placeBuy)
    .then(calculateLimits)
    .then(setSellLimit)
    .then(function(data){
      console.log('done')
    });


*/