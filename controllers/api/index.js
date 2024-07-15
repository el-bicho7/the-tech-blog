const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./user-routes');
const transactionRoutes = require('./transaction-routes');

// When a request is made to the /users or /transaction path, it will be directed to the index.js in the /users or /transaction folder.
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
