const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUserRole, deleteUser } = require('../controllers/userController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// All routes require admin
router.get('/', authMiddleware, authorizeRoles('admin'), getUsers);
router.get('/:id', authMiddleware, authorizeRoles('admin'), getUserById);
router.put('/:id/role', authMiddleware, authorizeRoles('admin'), updateUserRole);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteUser);

module.exports = router;