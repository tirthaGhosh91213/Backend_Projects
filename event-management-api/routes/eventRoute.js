const express = require('express');  
const router = express.Router();  
const eventController = require('../controllers/eventController');  

router.post('/', eventController.createEvent);  
router.get('/:id', eventController.getEventDetails);  
router.post('/:id/register', eventController.register);  
router.delete('/:eventId/cancel/:userId', eventController.cancel);  
router.get('/upcoming/list', eventController.listUpcoming);  
router.get('/:id/stats', eventController.stats);  
router.get('/:id/last30days', eventController.participateinLast30days);  
module.exports = router;  