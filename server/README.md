# Server

This project was created with [NodeJS](https://nodejs.org/en/) version 8.11.3 and [TypeScript](https://www.typescriptlang.org/) version 3.0.3

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`.

## Running unit tests

Run `npm test` to execute the unit tests 
via: 
[Mocha](https://mochajs.org/).
[Chai](https://www.chaijs.com/).
[Chai HTTP](https://www.chaijs.com/plugins/chai-http/)


## How to build the 'stocks.csv' file

Located in the `./data` directory
the `stocks.csv` file is built from an Excel WorkSheet from the CBOE
* http://www.cboe.com/products/weeklys-options/available-weeklys
* click link --> Download Available Weeklys (xls)

** This mirco-service is not interested in any underlyings/stocks that don't have weekly options

Steps:
1. Copy all underlyings and paste into new WorkSheet. 
    * Skip all rows util after VIX or Cboe Volatility Index
2. Then save WorkSheet as `stocks.csv` (comma delimited file) 


## TODO

* Add a configuration manager for 'default', 'development', and 'production'
* Enhance testing:
    * Add more tests to cover all APIs
    * Remove the need to pull stock information from Yahoo Finance
    * Remove all logging