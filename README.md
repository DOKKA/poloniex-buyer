# poloniex-buyer  
Use a percentage of your Bitcoin to buy Altcoins at the lowest available price, and optionally set a limit sell order!  

## Requirements  

Have Node.js installed  
```
git clone https://github.com/DOKKA/poloniex-buyer
cd poloniex-buyer
```

## Configuration 

### Windows 
```
SET API_KEY="insertkeyhere"
SET API_SECRET="insertsecrethere"
```

### Linux/Mac
```
export API_KEY=insertkeyhere
export API_SECRET=insertsecrethere
```

## Startup
```
node index.js -c BTC_ETH -p 10 -l 30
node index.js -h #get a list of options and examples
```

## Notes
There have been plenty of times when I wanted to buy some coins but 
I was unable to devote the time to decide how much I want to invest in an altcoin,
how high to set the sell limit, and I want to get a fair price too. Especially when I'm at work.
 This gives you the ability to buy a percentage of your reserves and quickly set a sell limit.
