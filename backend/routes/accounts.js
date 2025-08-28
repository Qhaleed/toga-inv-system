const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.get("/", (req, res) => {
  db.db.all("SELECT * FROM accounts", [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Can't fetch accounts data");
    }
    res.json(rows);
  });
});

// Update account status using account_id
router.patch("/:account_id", (req, res) => {
  const { account_id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  db.db.run(
    "UPDATE accounts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?",
    [status, account_id],
    function (err) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to update account status" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.json({ message: "Account status updated successfully" });
    }
  );
});

// Delete account using account_id
router.delete("/:account_id", (req, res) => {
  const { account_id } = req.params;

  db.db.run(
    "DELETE FROM accounts WHERE account_id = ?",
    [account_id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete account" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.json({
        message: "Account deleted successfully",
        deletedId: account_id,
      });
    }
  );
});

module.exports = router;
