const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const wallet = require("../controllers/walletController");

router.post("/", wallet.createWallet);

module.exports = router;
