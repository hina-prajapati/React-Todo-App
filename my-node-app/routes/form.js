const express = require("express");
const router = express.Router();
const db = require("../db");
// const multer = require("multer");
// const path = require("path");

router.post("/submitForm", (req, res) => {
  // console.log("🧾 Raw body received:", req.body); // <-- check what you get here

  console.log("Received data:", req.body);

  const { name, email, phone } = req.body;
//  if (!name || !email || !phone) {
//     return res.status(400).json({ message: "All fields are required." });
//   }
  db.query(
    "INSERT INTO tests (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Form submitted!" });
      console.log(res);
    }
  );
});

// // Fetch all submissions
router.get("/getData", (req, res) => {
  db.query("SELECT * FROM tests", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    console.log("✅ Fetched submissions:", results); // ✅ This logs to terminal
    res.json(results); // returns array of submissions
  });
});

// // 🗑️ Delete a submission by ID
// router.delete("/submissions/:id", (req, res) => {
//   const submissionId = req.params.id;

//   db.query("DELETE FROM submissions WHERE id = ?", [submissionId], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: "Submission deleted successfully" });
//   });
// });

module.exports = router;
