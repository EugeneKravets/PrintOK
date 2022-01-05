const express = require(`express`);
const router = express.Router();
const viewsController = require(`./../controllers/viewsController`);
const authController = require(`./../controllers/authController`);
const addController = require(`./../controllers/addController`);
// Render pages
router
    .route(`/`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`, `user`),
        addController.getAllLocations
    )
    .post(
        authController.protect,
        authController.restrictTo(`admin`),
        addController.createLocation
    );
router
    .route(`/:id`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`),
        addController.getLocation
    )
    .patch(
        authController.protect,
        authController.restrictTo(`admin`),
        addController.updateLocation
    )
    .delete(
        authController.protect,
        authController.restrictTo(`admin`),
        addController.deleteLocation
    );
module.exports = router;
