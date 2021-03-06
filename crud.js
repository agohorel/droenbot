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
const readFile = async (folderName, fileName) => {
  const filePath = path.join(__dirname, "data", folderName, fileName);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

// @TODO needs to deal w/ nested folders
const readFolder = async folderName => {
  const folderPath = path.join(__dirname, "data", folderName);

  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      err ? reject(err) : resolve(files);
    });
  });
};

const updateFile = () => {};

const deleteFile = () => {};

module.exports = { writeFile, readFile, readFolder, updateFile, deleteFile };
