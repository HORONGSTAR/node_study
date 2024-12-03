const fs = require('fs').promises

function readFileAndUppercase(filePath) {
   fs.readFile(filePath)
      .then((data) => {
         console.log(data.toString().toUpperCase())
      })
      .catch((err) => {
         console.error(err)
      })
}

readFileAndUppercase('input.txt')
