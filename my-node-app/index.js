const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🔌 Routes
app.use(require("./routes/form"));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
