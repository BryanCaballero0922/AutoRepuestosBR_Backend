const express = require('express');
const {
  getAllClub,
  createClub,
  updateClub,
  deleteClub
} = require('../controllers/clubControllers');

const router = express.Router();

router.get('/allClub', getAllClub);
router.post('/newClub', createClub);
router.put('/updateClub/:taller', updateClub);
router.delete('/deleteClub/:taller', deleteClub);

module.exports = router;