const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Route for form submission
router.post("/submit", upload.single("image"), (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !image) {
    return res.status(400).json({ message: "Name and image are required." });
  }

  console.log("Received Name:", name);
  console.log("Received Image:", image);

  // You can save this to DB if needed
  return res.json({ message: "Form submitted successfully!" });
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
