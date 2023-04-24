const fs = require("fs");

const visualizeWhitespace = (str) => {
  return str
    .replace(/ /g, "[SPACE]")
    .replace(/\t/g, "[TAB]")
    .replace(/\n/g, "[NEWLINE]\n");
};

/**
 * only window
 */

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const result = data
    .replace(/\r\n/g, " ")
    .replace(//g, "fi")
    .replace(//g, "ff");

  fs.writeFile("output.txt", result, (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }

    console.log("Result has been writing to output.txt");
  });
});
