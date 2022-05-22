const router = require('express').Router();
const users = require('../controllers/userController');
const authorize = require('../middlewares/authorize');
// Signup
router.post('/', users.signUp);
// Login
router.post('/login', users.logIn);
// Logout
router.post('/logout', users.logoutUser);
// Update user
router.patch('/:id', users.updateUser);
// Delete user
router.delete('/:id', users.deleteUser);
// Validate user
router.get('/user', authorize, users.validateUser);

module.exports = router;