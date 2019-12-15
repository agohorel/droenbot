const fs = require("fs");
const path = require("path");

const writeFile = (fileName, folderName, data) => {
  const filePath = path.join(__dirname, `data/${folderName}`, fileName);
  try {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      err
        ? console.error(`error saving file: ${err}`)
        : console.log(`successfully saved file to ${filePath}`);
    });
  } catch (err) {
    console.error(err);
  }
};

// @TODO add param for setting folder to search from
const readFile = fileName => {
  const filePath = path.join(__dirname, filename);
  try {
    fs.readFile(filePath, (err, data) => {
      return err ? console.error(err) : data;
    });
  } catch (err) {
    console.error(err);
  }
};

// @TODO needs to deal w/ nested folders
const readFolder = folderName => {
  const folderPath = path.join(__dirname, folderName);

  try {
    fs.readdir(folderPath, (err, files) => {
      return err ? console.error(`error reading folder ${folderPath}`) : files;
    });
  } catch (err) {
    console.error(err);
  }
};

const updateFile = () => {};

const deleteFile = () => {};

module.exports = { writeFile, readFile, readFolder, updateFile, deleteFile };
