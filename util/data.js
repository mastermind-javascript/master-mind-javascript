const fs = require('fs');

function getTaskData() {
  try {
    return JSON.parse(fs.readFileSync("taskData.json"));
  } catch (e) {
    console.log("Wystąpił błąd w pliku taskData.json");
    return process.exit(1);
  }
}

function getUserData() {
  try {
    return JSON.parse(fs.readFileSync("userData.json"));
  } catch (e) {
    console.log("Wystąpił błąd w pliku userData.json");
    return process.exit(1);
  }
}

exports.tasks = getTaskData;
exports.users = getUserData;
