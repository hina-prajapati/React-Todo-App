const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db"); // ✅ Import your DB connection

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/submit", upload.single("image"), (req, res) => {
  // console.log(req, res);
  const { name, email, phone, gender, education } = req.body;
  const image = req.file ? req.file.filename : null;

  // Validation check
  if (!name || !email || !phone || !image || !gender || !education) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // ✅ Insert into MySQL
  db.query(
    "INSERT INTO submissions (name, email, phone, image, gender, education) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, phone, image, gender, education],
    (err, result) => {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ message: "DB error" });
      }
      return res.json({ message: "Form submitted and saved!" });
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

  db.query(
    "DELETE FROM submissions WHERE id = ?",
    [submissionId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Submission deleted successfully" });
    }
  );
});

module.exports = router;
