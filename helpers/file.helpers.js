const fs = require("fs");

function checkFileContent(filePath, encoding) {
  try {
    const content = fs.readFileSync(filePath, {
      encoding,
    });
    return content;
  } catch (error) {
    return error;
  }
}

function writeFile(filePath, content) {
  try {
    const formattedContent = JSON.stringify(content);
    fs.writeFileSync(filePath, formattedContent);
    return content;
  } catch (error) {
    return error;
  }
}

function getFileContent(filePath, encoding) {
  try {
    const content = checkFileContent(filePath, encoding);
    if (!content) {
      writeFile(filePath, []);
    }
    const parsedContent = JSON.parse(content);
    return parsedContent;
  } catch (error) {
    return error;
  }
}

module.exports = { getFileContent, writeFile };
