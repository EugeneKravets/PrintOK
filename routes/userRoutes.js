const express = require('express');
const router = express.Router();
const userController = require(`./../controllers/userController`);
const authController = require(`./../controllers/authController`);
//
// USER routes
router.post(`/signup`, authController.signup);
router.post(`/login`, authController.login);
router.get(`/logout`, authController.logout);
//
router
    .route(`/`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`),
        userController.getAllUsers
    )
    .post(userController.createUser);
router
    .route(`/:id`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`),
        userController.getUser
    )
    .patch(
        authController.protect,
        authController.restrictTo(`admin`),
        userController.updateUser
    )
    .delete(
        authController.protect,
        authController.restrictTo(`admin`),
        userController.deleteUser
    );

module.exports = router;
