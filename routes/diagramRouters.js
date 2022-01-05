const express = require(`express`);
const router = express.Router();
const diagramController = require(`./../controllers/diagramsController`);
const authController = require(`./../controllers/authController`);
router
    .route(`/`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`, `user`),
        diagramController.getAllRecords
    )
    .post(
        authController.protect,
        authController.restrictTo(`admin`),
        diagramController.createRecord
    )
    .delete(
        authController.protect,
        authController.restrictTo(`admin`),
        diagramController.deleteRecords
    );
router
    .route(`/:id`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`),
        diagramController.getRecord
    )
    .patch(
        authController.protect,
        authController.restrictTo(`admin`),
        diagramController.updateRecord
    )
    .delete(
        authController.protect,
        authController.restrictTo(`admin`),
        diagramController.deleteRecord
    );

module.exports = router;
