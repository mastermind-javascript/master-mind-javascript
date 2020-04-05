const fs = require("fs");
const { normalize } = require("path");
const ncp = require("ncp").ncp;
ncp.limit = 16;
const data = require("./data.js");
const taskData = data.tasks();
const mainTaskFolder = normalize(`${__dirname}/../taskContent/`);
const flagConsoleLog = false;

function logInformation(error, filePath, type = "create") {
  if (error) {
    if (error.code === "EEXIST") {
      flagConsoleLog ? console.log(`⚠️: Katalog już istnieje ${filePath}`) : "";
      return;
    }
    console.log(`❌: Nieudało się utworzyć katalogu. Powód: ${error.message}`);
    throw error;
  }

  let positiveMessage = `✅`;

  switch (type) {
    case "create":
      positiveMessage = `✅: Utworzono plik: ${filePath}`;
      break;
    case "coppy":
      positiveMessage = `✅: Skopiowano pliki: ${filePath}`;
      break;
    case "checkExist":
      positiveMessage = `✅: Plik: ${filePath} istnieje`;
      break;
    case "checkReadFile":
      positiveMessage = `✅: Plik: ${filePath} otwarty`;
      break;
    default:
      break;
  }

  flagConsoleLog ? console.log(positiveMessage) : "";
}

function createFolder(path) {
  if (!fs.existsSync(path)) {
    try {
      fs.mkdirSync(path, function (error) {
        logInformation(error, path);
      });
    } catch (error) {
      logInformation(error, path);
    }
  }
}
function createFile(path, content = "") {
  if (!fs.existsSync(path)) {
    try {
      fs.writeFileSync(path, content, function (error) {
        logInformation(error, path);
      });
    } catch (error) {
      logInformation(error, path);
    }
  }
}

function copyFile(source, destination) {
  ncp(source, destination, function (error) {
    logInformation(error, destination, "coppy");
  });
}

function checkFileEmpty(pathFile) {
  let fileIsEmpty = false;
  const fileExist = fs.readFileSync(pathFile);
  if (fileExist.toString().length === 0) {
    fileIsEmpty = true;
  }
  return fileIsEmpty;
}

class FileStructureContent {
  constructor(taskId) {
    this.pathTaskFolder = normalize(`${mainTaskFolder}/${taskId}`);
    this.pathStartJSfile = normalize(`${this.pathTaskFolder}/script.js`);
  }
}

class TaskContent extends FileStructureContent {
  constructor(taskData) {
    const taskNumber = taskData.taskId;
    super(taskNumber);
    this.taskNumber = taskNumber;
    createFolder(this.pathTaskFolder);
    createFile(this.pathStartJSfile);
  }
}

taskData.forEach((taskData) => {
  createFolder(mainTaskFolder);
  new TaskContent(taskData);
});
