//dependencies
const fs = require("fs");
const path = require("path");

//module scafolding
const lib = {};
//base directory of the data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir + dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);

      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback("Error: Failed to close file");
            }
          });
        } else {
          callback("Error: Failed to write file");
        }
      });
    } else {
      callback("Error: File may already exists.");
    }
  });
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};

// update existing file
// lib.update = (dir, file, data, callback) => {
//   const filePath = `${lib.baseDir + dir}/${file}.json`;

//   fs.open(filePath, 'r+', (err, fileDescriptor) => {
//     if (err || !fileDescriptor) {
//       return callback('Error: Unable to update! File may not exist.');
//     }

//     const stringData = JSON.stringify(data);

//     // truncate file using ftruncate (correct)
//     fs.ftruncate(fileDescriptor, 0, (err) => {
//       if (err) {
//         fs.close(fileDescriptor, () => {});
//         return callback('Error: Failed to truncate file');
//       }

//       fs.writeFile(fileDescriptor, stringData, (err) => {
//         if (err) {
//           fs.close(fileDescriptor, () => {});
//           return callback('Error: Failed to write file');
//         }

//         fs.close(fileDescriptor, (err) => {
//           if (err) {
//             return callback('Error: Failed to close file');
//           }
//           callback(false);
//         });
//       });
//     });
//   });
// };

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);

      //Truncate the file
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          fs.writeFile(
            `${lib.baseDir + dir}/${file}.json`,
            stringData,
            (err) => {
              if (!err) {
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error: Closing File.");
                  }
                });
              } else {
                callback("Error: Writing to file.");
              }
            },
          );
        } else {
          callback("Error: Truncating File.");
        }
      });
    } else {
      callback("Error: File may not exist.");
    }
  });
};

module.exports = lib;
