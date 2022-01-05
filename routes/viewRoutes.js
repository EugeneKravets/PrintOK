const express = require(`express`);
const router = express.Router();
const viewsController = require(`./../controllers/viewsController`);
const authController = require(`./../controllers/authController`);
// Render pages
router.get(`/`, viewsController.login);

router.use(authController.isLoggedIn);

router.get(`/inventory`, authController.protect, viewsController.inventory);
router.get(`/diagrams`, authController.protect, viewsController.diagrams);
router.get(`/monitoring`, authController.protect, viewsController.monitoring);
router.get(`/returns`, authController.protect, viewsController.returns);
router.get(`/add`, authController.protect, viewsController.add);

router.get(`/addprinter`, authController.protect, viewsController.addPrinter);
router.get(`/addnewyear`, authController.protect, viewsController.addnewYear);
router.get(`/editcounters`, authController.protect, viewsController.editCounters);
router.get(`/inventory/:id`, authController.protect, viewsController.editPrinter);

module.exports = router;
