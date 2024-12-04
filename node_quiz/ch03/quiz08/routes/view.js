const express = require('express')
const router = express.Router()

router.get('/:no', (req, res) => {
   res.send('게시물번호:' + req.params.no)
   console.log('검색어:' + req.query.search)
})

module.exports = router
