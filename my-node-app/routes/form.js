const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/submit", upload.single("image"), (req, res) => {
  console.log("Received data:", req.body);
  console.log("Received image:", req.file);  // ✅ should show file object

  const { name, email, phone } = req.body;
  const image = req.file ? req.file.filename : "";
  
  db.query(
    "INSERT INTO submissions (name, email, phone, image) VALUES (?, ?, ?, ?)",
    [name, email, phone, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Form submitted!" });
      console.log(res)
    }
  );
});

// Fetch all submissions
router.get("/submissions", (req, res) => {
  db.query("SELECT * FROM submissions", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    console.log("✅ Fetched submissions:", results); // ✅ This logs to terminal
    res.json(results); // returns array of submissions

  });
});

// 🗑️ Delete a submission by ID
router.delete("/submissions/:id", (req, res) => {
  const submissionId = req.params.id;

  db.query("DELETE FROM submissions WHERE id = ?", [submissionId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Submission deleted successfully" });
  });
});

module.exports = router;
