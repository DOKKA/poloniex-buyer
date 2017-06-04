var yargs = require('yargs');

    module.exports = function setupYargs(){
        var argv=yargs.usage('Usage $0 -c <currencyPair> -p <percentage> [options]')
            .example('$0 -c BTC_ETH -p 10', 'buy 10% of your bitcoin reserves in ethereum at the lowest asking price')
            .example('$0 -c BTC_ETH -p 10 -l 30', 'buy 10% of your bitcoin reserves in ethereum at the lowest asking price and set a limit to sell it at a price 30% higher')
            .alias('c', 'currencyPair')
            .alias('p', 'baseBuyPercentage')
            .alias('l', 'sellLimitPercentage')
            .describe('c', 'the currency pair to trade on')
            .describe('p', 'the percentage of your base currency you want to use for purcasing')
            .describe('l', 'the percentage higher you want to sell your currency for')
            .describe('key', 'your poloniex api key')
            .describe('secret', 'your poloniex secret')
            .demand(['c','p'])
            .help('h')
            .alias('h', 'help')
            .argv;

        return argv;
    };