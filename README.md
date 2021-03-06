# Stock Put Option Analyzer

A client/server application using Angular 7 and NodeJS 8 technologies that will analyze stock put options for underlings in the watchlist.  This can help the trader to find premium rich underlings.  [Yahoo Finance](http://finance.yahoo.com) is used to retrieve the option data

## How-To

1. When viewing the application, click on the `Stocks` button to goto the `Stocks` view
2. Once the `Stocks` view is present you can click on the `+` (plus) button to add underlyings to the watchlist.
3. Once you have all the underlyings in the watchlist you wish to analize, click on the `Report` button 
4. From the `Report` view click on the `Run` button


## Watchlist

The `Trash-can` button will remove all the underlyings from the watchlist.
Each underlying has a `-` (minus) button that will remove that underlyings from the watchlist.


## Stocks View

There are 3 secondary buttons.
* Refresh - Will refresh the list of underlyings with the current stock price.
* Number Sort - Will sort the underlyings by stock price in decending order, a second click will sort in acending order.
* Alpha Sort - Will sort the underlyings by stock symbol in decending order, a second click will sort in acending order.


## Report View

The `Run` button will generate a report from the stock option infromation.
All of the headers on the table will sort their column's data, a second click will be the reverse order
