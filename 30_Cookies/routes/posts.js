const express = require('express');
const router = express.Router();



//Index 
router.get('/', (req, res) => {
    res.send('Get for Posts');
})
//Show 
router.get('/:id', (req, res) => {
    res.send('Get for Posts id');
})
//create 
router.post('/', (req, res) => {
    res.send('Post for Posts');
})

//Post 
router.put('/:id', (req, res) => {
    res.send('Update for Posts');
})

// delete 
router.delete('/:id', (req, res) => {
    res.send('Delete for Posts');
})

module.exports = router;