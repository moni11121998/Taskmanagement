const fs =require("fs")

const logger = (req, res, next) => {
    const logs = `${req.method} ${req.url}`
    fs.appendFile('./log.txt',logs+"\n" , function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      
    next();
  };
  
  module.exports = logger;
  