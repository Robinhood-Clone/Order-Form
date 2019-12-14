const Sequelize = require('sequelize');

const sequelize = new Sequelize('robinhoodclone', 'root', 'young', {
  host: 'results',
  dialect: 'mysql',
  logging: false,
})

const Stock = sequelize.define('Stock', {
  stock_name: Sequelize.STRING,
  stock_symbol: Sequelize.STRING,
  owner: Sequelize.STRING,
  price: Sequelize.STRING
})

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  power: Sequelize.STRING,
})

User.sync();

Stock.sync();
const userData = [
  {"username":"wsdfre2","power":"$10000.00"}
]
const stockData = [
  {"stock_name":"3M","stock_symbol":"MMM","owner":"blarrie0","price":"$886.00"},
  {"stock_name":"Ford","stock_symbol":"F","owner":"abanasik1","price":"$849.58"},
  {"stock_name":"GE","stock_symbol":"GE","owner":"bbartaloni2","price":"$90.81"},
  {"stock_name":"Fitbit","stock_symbol":"FIT","owner":"ksutherby3","price":"$162.99"},
  {"stock_name":"GoPro","stock_symbol":"GPRO","owner":"lbenallack4","price":"$941.14"},
  {"stock_name":"Microsoft","stock_symbol":"MSFT","owner":"efontin5","price":"$917.38"},
  {"stock_name":"Apple","stock_symbol":"AAPL","owner":"vdabney6","price":"$769.85"},
  {"stock_name":"Disney","stock_symbol":"DIS","owner":"sgoldie7","price":"$67.58"},
  {"stock_name":"Cronos Group","stock_symbol":"CRON","owner":"rjoynson8","price":"$393.16"},
  {"stock_name":"Canopy Growth","stock_symbol":"CGC","owner":"cburnett9","price":"$815.34"},
  {"stock_name":"Snap","stock_symbol":"SNAP","owner":"wlassletta","price":"$153.89"},
  {"stock_name":"AMD","stock_symbol":"AMD","owner":"educkittb","price":"$903.95"},
  {"stock_name":"Plug Power","stock_symbol":"PLUG","owner":"lweakleyc","price":"$7.60"},
  {"stock_name":"Facebook","stock_symbol":"FB","owner":"gmoxomd","price":"$616.82"},
  {"stock_name":"Tesla","stock_symbol":"TSLA","owner":"ctwinbornee","price":"$983.76"},
  {"stock_name":"Zynga","stock_symbol":"ZNGA","owner":"psteinhammerf","price":"$465.22"},
  {"stock_name":"Twitter","stock_symbol":"TWTR","owner":"icorneckg","price":"$225.39"},
  {"stock_name":"Amazon","stock_symbol":"AMZN","owner":"jpettmanh","price":"$824.12"},
  {"stock_name":"Alibaba","stock_symbol":"BABA","owner":"ladani","price":"$372.42"},
  {"stock_name":"Chesapeake Energy","stock_symbol":"CHK","owner":"lhamperj","price":"$509.20"},
  {"stock_name":"Uber","stock_symbol":"UBER","owner":"rslitek","price":"$445.05"},
  {"stock_name":"Bank of America","stock_symbol":"BAC","owner":"begglestonl","price":"$51.17"},
  {"stock_name":"NIO","stock_symbol":"NIO","owner":"cengelbrechtm","price":"$377.98"},
  {"stock_name":"Netflix","stock_symbol":"NFLX","owner":"gneln","price":"$319.47"},
  {"stock_name":"AT&T","stock_symbol":"T","owner":"brilletto","price":"$472.53"},
  {"stock_name":"Starbucks","stock_symbol":"SBUX","owner":"lheughp","price":"$224.81"},
  {"stock_name":"NVIDIA","stock_symbol":"NVDA","owner":"crehorekq","price":"$155.24"},
  {"stock_name":"Aphria","stock_symbol":"APHA","owner":"pwestr","price":"$28.58"},
  {"stock_name":"Groupon","stock_symbol":"GRPN","owner":"ksigerts","price":"$193.41"},
  {"stock_name":"Square","stock_symbol":"SQ","owner":"bscandredt","price":"$121.69"},
  {"stock_name":"Sprint","stock_symbol":"S","owner":"agianiellou","price":"$470.20"},
  {"stock_name":"Sirius XM","stock_symbol":"SIRI","owner":"readmeadsv","price":"$187.68"},
  {"stock_name":"Coca-Cola","stock_symbol":"KO","owner":"lguisew","price":"$462.94"},
  {"stock_name":"Vanguard S&P 500 ETF","stock_symbol":"VOO","owner":"afalkinderx","price":"$954.85"},
  {"stock_name":"Beyond Meat","stock_symbol":"BYND","owner":"klittletony","price":"$37.08"},
  {"stock_name":"Corbus Pharmaceuticals","stock_symbol":"CRBP","owner":"hpellattz","price":"$830.04"},
  {"stock_name":"Slack","stock_symbol":"WORK","owner":"gstarcks10","price":"$491.08"},
  {"stock_name":"Activision Blizzard","stock_symbol":"ATVI","owner":"cfoskin11","price":"$170.23"},
  {"stock_name":"Nike","stock_symbol":"NKE","owner":"ktorry12","price":"$186.42"},
  {"stock_name":"Lyft","stock_symbol":"LYFT","owner":"rmccurlye13","price":"$611.99"},
  {"stock_name":"Micron Technology","stock_symbol":"MU","owner":"adureden14","price":"$320.50"},
  {"stock_name":"Visa","stock_symbol":"V","owner":"fwatmore15","price":"$326.07"},
  {"stock_name":"Vivint Solar","stock_symbol":"VSLR","owner":"akisbey16","price":"$986.66"},
  {"stock_name":"Intel","stock_symbol":"INTC","owner":"jrowatt17","price":"$94.96"},
  {"stock_name":"Nokia","stock_symbol":"NOK","owner":"eflight18","price":"$990.27"},
  {"stock_name":"PG&E","stock_symbol":"PCG","owner":"caloway19","price":"$900.50"},
  {"stock_name":"Cisco","stock_symbol":"CSCO","owner":"rgirkins1a","price":"$798.09"},
  {"stock_name":"SPDR S&P 500 ETF","stock_symbol":"SPY","owner":"bmacparlan1b","price":"$967.88"},
  {"stock_name":"J.C. Penny","stock_symbol":"JCP","owner":"mbockett1c","price":"$207.64"},
  {"stock_name":"Tilray","stock_symbol":"TLRY","owner":"aherkess1d","price":"$279.19"},
  {"stock_name":"Paypal","stock_symbol":"PYPL","owner":"mjager1e","price":"$612.03"},
  {"stock_name":"Tencent","stock_symbol":"TCEHY","owner":"bamthor1f","price":"$215.94"},
  {"stock_name":"ETFMG Alternative Harvest","stock_symbol":"MJ","owner":"dcomsty1g","price":"$737.61"},
  {"stock_name":"Glu Mobile","stock_symbol":"GLUU","owner":"tfluin1h","price":"$922.50"},
  {"stock_name":"Berkshire Hathaway","stock_symbol":"BRK.B","owner":"nwride1i","price":"$107.98"},
  {"stock_name":"New Residential Investment","stock_symbol":"NRZ","owner":"cstothart1j","price":"$553.93"},
  {"stock_name":"Yamana Gold","stock_symbol":"AUY","owner":"mtilliards1k","price":"$854.03"},
  {"stock_name":"iQIYI","stock_symbol":"IQ","owner":"pabrahim1l","price":"$497.04"},
  {"stock_name":"Roku","stock_symbol":"ROKU","owner":"amillyard1m","price":"$528.40"},
  {"stock_name":"Salesforce","stock_symbol":"CRM","owner":"jsouthon1n","price":"$594.62"},
  {"stock_name":"Walmart","stock_symbol":"WMT","owner":"aveelers1o","price":"$183.03"},
  {"stock_name":"Boeing","stock_symbol":"BA","owner":"vrennicks1p","price":"$212.89"},
  {"stock_name":"Geron","stock_symbol":"GERN","owner":"uscopes1q","price":"$481.97"},
  {"stock_name":"Denbury","stock_symbol":"DNR","owner":"gculross1r","price":"$163.70"},
  {"stock_name":"Viking Therapeutics","stock_symbol":"VKTX","owner":"abriddock1s","price":"$879.05"},
  {"stock_name":"Kodak","stock_symbol":"KODK","owner":"hneave1t","price":"$992.36"},
  {"stock_name":"Pfizer","stock_symbol":"PFE","owner":"ccayet1u","price":"$431.58"},
  {"stock_name":"Enphase Energy","stock_symbol":"ENPH","owner":"mwitcherley1v","price":"$167.66"},
  {"stock_name":"GM","stock_symbol":"GM","owner":"lstrasse1w","price":"$678.72"},
  {"stock_name":"Alphabet","stock_symbol":"GOOGL","owner":"abradley1x","price":"$966.96"},
  {"stock_name":"Twilio","stock_symbol":"TWLO","owner":"gsiemantel1y","price":"$175.41"},
  {"stock_name":"Shopify","stock_symbol":"SHOP","owner":"ccansdale1z","price":"$979.52"},
  {"stock_name":"JD.com","stock_symbol":"JD","owner":"smcnicol20","price":"$257.09"},
  {"stock_name":"Verizon","stock_symbol":"VZ","owner":"bludye21","price":"$17.46"},
  {"stock_name":"Dropbox","stock_symbol":"DBX","owner":"rdanilyak22","price":"$395.79"},
  {"stock_name":"Catalyst Pharmaceuticals","stock_symbol":"CPRX","owner":"eryall23","price":"$227.30"},
  {"stock_name":"Luckin Coffee","stock_symbol":"LK","owner":"rbenham24","price":"$956.95"},
  {"stock_name":"Costco","stock_symbol":"COST","owner":"dmccrone25","price":"$477.11"},
  {"stock_name":"Pinterest","stock_symbol":"PINS","owner":"fsilcocks26","price":"$748.36"},
  {"stock_name":"Sony","stock_symbol":"SNE","owner":"dlievesley27","price":"$645.81"},
  {"stock_name":"Bilibili","stock_symbol":"BILI","owner":"cburtonshaw28","price":"$348.39"},
  {"stock_name":"Cara Therapeutics","stock_symbol":"CARA","owner":"einnis29","price":"$877.97"},
  {"stock_name":"AK Steel","stock_symbol":"AKS","owner":"bsemour2a","price":"$787.40"},
  {"stock_name":"CRISPR","stock_symbol":"CRSP","owner":"cabbitt2b","price":"$392.20"},
  {"stock_name":"AbbVie","stock_symbol":"ABBV","owner":"tfindlow2c","price":"$685.32"},
  {"stock_name":"CVS","stock_symbol":"CVS","owner":"mshay2d","price":"$484.30"},
  {"stock_name":"SunPower","stock_symbol":"SPWR","owner":"esculpher2e","price":"$90.54"},
  {"stock_name":"YETI","stock_symbol":"YETI","owner":"cellesworth2f","price":"$176.01"},
  {"stock_name":"Target","stock_symbol":"TGT","owner":"rmarcoolyn2g","price":"$769.47"},
  {"stock_name":"Limelight Networks","stock_symbol":"LLNW","owner":"flenton2h","price":"$476.11"},
  {"stock_name":"Teva Pharmaceutical","stock_symbol":"TEVA","owner":"jmartynov2i","price":"$118.88"},
  {"stock_name":"McDonald’s","stock_symbol":"MCD","owner":"mleffek2j","price":"$474.00"},
  {"stock_name":"Under Armour","stock_symbol":"UAA","owner":"bhegdonne2k","price":"$278.64"},
  {"stock_name":"Stitch Fix","stock_symbol":"SFIX","owner":"agwinn2l","price":"$456.16"},
  {"stock_name":"Johnson & Johnson","stock_symbol":"JNJ","owner":"pmchirrie2m","price":"$592.20"},
  {"stock_name":"Zoom","stock_symbol":"ZM","owner":"vfort2n","price":"$515.72"},
  {"stock_name":"Kraft Foods","stock_symbol":"KHC","owner":"vlawden2o","price":"$498.50"},
  {"stock_name":"OmiseGO","stock_symbol":"OMG","owner":"bmaddra2p","price":"$339.03"},
  {"stock_name":"Dollar Tree","stock_symbol":"DLTR","owner":"tfettiplace2q","price":"$156.92"},
  {"stock_name":"Phillips 66","stock_symbol":"PSX","owner":"bivashnikov2r","price":"$118.19"}
]

//this is the seed function
const seedStockData = (data) => {
  promiseArr = [];
  for (let i = 0; i < data.length; i++) {
    promiseArr.push(Stock.create(data[i]))
  }
  Promise.all(promiseArr)
  .then(()=> console.log('finished seeding db'))
  .catch(()=> console.log('err seeding db'))
}
const seedUserData = (data) => {
  promiseArr = [];
  for (let i = 0; i < data.length; i++) {
    promiseArr.push(User.create(data[i]))
  }
  Promise.all(promiseArr)
  .then(()=> console.log('finished seeding db'))
  .catch(()=> console.log('err seeding db'))
}

seedStockData(stockData);
seedUserData(userData);
