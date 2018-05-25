const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/check-auth");

const ToolboxController = require ('../controllers/toolbox');

// Handle incoming GET requests to /toolbox
router.get("/", ToolboxController.get_all_toolbox);
// Handle incoming GET requests to /toolbox/:toolboxId
// router.get("/:toolboxId", toolboxController.get_toolbox);

// Handle incoming GET requests to /toolbox/:toolboxName
router.get("/:toolboxName", ToolboxController.get_toolboxName);
// Handle POST requests to /toolbox
router.post("/", ToolboxController.create_toolbox);

// Handle PATCH requests to /toolbox/:toolboxName
router.patch("/:toolboxName", ToolboxController.update_toolbox);

// Handle DELETE requests to /toolbox/:toolboxName
router.delete("/:toolboxName", ToolboxController.delete_toolbox);

module.exports = router;
