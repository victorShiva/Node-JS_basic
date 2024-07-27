const express = require('express');
const router = express.Router();



//Index 
router.get('/', (req, res) => {
    res.send('Get for Users');
})
//Show 
router.get('/:id', (req, res) => {
    res.send('Get for Users id');
})
//create 
router.post('/', (req, res) => {
    res.send('Post for user');
})

//Post 
router.put('/:id', (req, res) => {
    res.send('Update for user');
})

// delete 
router.delete('/:id', (req, res) => {
    res.send('Delete for user');
})


module.exports = router;