const express = require(`express`);
const printerController = require(`./../controllers/printerController`);
const router = express.Router();
const authController = require(`./../controllers/authController`);
// Param Middleware
// Middleware for certain parameter for ex ID. this param has 4 parameters req, res, next, val
// router.param(`id`, printerController.checkId);

router
    .route(`/`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`, `user`),
        printerController.getAllPrinters
    )
    .post(
        authController.protect,
        authController.restrictTo(`admin`),
        printerController.createPrinter
    );
router
    .route(`/:id`)
    .get(
        authController.protect,
        authController.restrictTo(`admin`, `user`),
        printerController.getPrinter
    )
    .patch(
        authController.protect,
        authController.restrictTo(`admin`),
        printerController.updatePrinter
    )
    .delete(
        authController.protect,
        authController.restrictTo(`admin`),
        printerController.deletePrinter
    );

module.exports = router;
