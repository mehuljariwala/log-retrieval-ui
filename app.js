const express = require("express");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Set Referrer-Policy header
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Endpoint for retrieving log lines from a given file
app.get("/logs", (req, res) => {
  const { filename, lines, filter } = req.query;

  // Check if filename is provided
  if (!filename) {
    return res.status(400).json({
      error: "Filename is required",
    });
  }

  const filePath = path.join("var/log", `${filename}.log`);
  console.log("filePath", filePath);
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({
        error: "File not found",
      });
    }

    // Create read stream for the file
    const fileStream = fs.createReadStream(filePath, {
      encoding: "utf8",
    });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let resultLines = [];
    let lineCount = 0;

    // Read lines from the file
    rl.on("line", (line) => {
      // Filter lines based on keyword
      if (!filter || line.includes(filter)) {
        resultLines.push(line); // Push lines to the array
        lineCount++;
      }

      // If the requested number of lines is reached, close the stream
      if (lines && lineCount >= lines) {
        rl.close();
      }
    });

    rl.on("close", () => {
      // Reverse the array to present newest log events first
      resultLines.reverse();

      // Retrieve requested number of lines
      if (lines) {
        resultLines = resultLines.slice(0, lines);
      }

      res.json({
        filename,
        lines: resultLines,
      });
    });

    rl.on("error", (err) => {
      console.error("Error reading file:", err);
      res.status(500).json({
        error: "Internal server error",
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
