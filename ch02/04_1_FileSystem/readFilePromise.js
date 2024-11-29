const fs = require('fs').promises

fs.readFile('./readme.txt')
   .then((data) => {
      console.log(data.toLocaleString())
   })
   .catch((err) => {
      console.log(err)
   })
