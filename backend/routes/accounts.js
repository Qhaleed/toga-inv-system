const express = require("express");
const router = express.Router();

const db = require("../database/db");
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.pool.query("SELECT * FROM accounts");
    res.json(rows);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send("Cant fetch accounts data");
  }
});

//updater to siya for status using account_id
router.patch("/:account_id", async (req, res) => {
  const { account_id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }
  try {
    const [result] = await db.pool.query(
      "UPDATE accounts SET status = ? WHERE account_id = ?",
      [status, account_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json({ message: "Account status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update account status" });
  }
});

module.exports = router;
