# poloniex-buyer
use a percentage of your bitcoin to buy altcoins at the lowest available price and optionally set a limit sell order
Usage index.js -c <currencyPair> -p <percentage> [options]

Options:
  -c, --currencyPair         the currency pair to trade on            [required]
  -p, --baseBuyPercentage    the percentage of your base currency you want to
                             use for purchasing                       [required]
  -l, --sellLimitPercentage  the percentage higher you want to sell your
                             currency for
  --key                      your poloniex api key
  --secret                   your poloniex secret
  -h, --help                 Show help                                 [boolean]

Examples:
  index.js -c BTC_ETH -p 10        buy 10% of your bitcoin reserves in ethereum
                                   at the lowest asking price
  index.js -c BTC_ETH -p 10 -l 30  buy 10% of your bitcoin reserves in ethereum
                                   at the lowest asking price and set a limit to
                                   sell it at a price 30% higher
