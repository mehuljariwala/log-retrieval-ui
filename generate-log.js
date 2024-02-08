const fs = require("fs");

const LOG_FILE_PATH = "./var/log/dummy.log";
const NUM_LOG_LINES = 100;

// Generate 100 log lines with "error" included
const generateDummyLogs = () => {
  let logContent = "";
  for (let i = 1; i <= NUM_LOG_LINES; i++) {
    const logLevel = i % 10 === 0 ? "[ERROR]" : "[INFO]";
    const logMessage =
      logLevel === "[ERROR]"
        ? "This is an error message"
        : "This is an info message";
    logContent += `${new Date().toISOString()} ${logLevel} ${logMessage}\n`;
  }
  return logContent;
};

// Write dummy logs to file
fs.writeFile(LOG_FILE_PATH, generateDummyLogs(), (err) => {
  if (err) {
    console.error("Error generating dummy logs:", err);
  } else {
    console.log(`Dummy log file generated: ${LOG_FILE_PATH}`);
  }
});
