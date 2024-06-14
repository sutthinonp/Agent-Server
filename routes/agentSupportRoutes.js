const express = require('express');
const { insertAgentSupport, getAgentData, deleteAgentSupport } = require('../controllers/agentSupportController');

const router = express.Router();

router.post('/', insertAgentSupport);
router.get('/', getAgentData);
router.delete('/:id', deleteAgentSupport);

module.exports = router;
