import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = import.meta.env.VITE_API_URL;

const express = require("express");
const path = require("path");

const app = express();
const port = API_BASE_URL || 3000;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "build")));

// Handle requests to the root URL
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
