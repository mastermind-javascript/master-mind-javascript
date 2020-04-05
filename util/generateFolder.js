const fs = require("fs");
const { normalize } = require("path");
const ncp = require("ncp").ncp;
ncp.limit = 16;
const data = require("./data.js");
const taskData = data.tasks();
const userData = data.users();
const mainTaskFolder = normalize(`${__dirname}/../task/`);
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

class FileStructure {
  constructor(taskId) {
    this.pathTaskFolder = normalize(`${mainTaskFolder}/${taskId}`);
    this.pathTaskDesc = normalize(`${this.pathTaskFolder}/desc`);
    this.pathTaskJs = normalize(`${this.pathTaskFolder}/desc/js`);
    this.pathUserFolder = normalize(`${this.pathTaskFolder}/user`);

    this.pathStartIndexfile = normalize(`${this.pathTaskDesc}/index.html`);
    this.pathStartJSfile = normalize(`${this.pathTaskJs}/script.js`);
    this.pathScriptContent = normalize(`${__dirname}/../taskContent/${taskId}/script.js`);
  }
}

class Task extends FileStructure {
  constructor(taskData) {
    const taskNumber = taskData.taskId;
    super(taskNumber);
    this.taskName = taskData.title;
    this.taskNumber = taskNumber;

    this.createTaskCatalog();
    this.createTaskStructure();
    this.createFolderForUser();
  }

  createTaskCatalog() {
    createFolder(this.pathTaskFolder);
    createFolder(this.pathUserFolder);
    createFolder(this.pathTaskDesc);
    createFolder(this.pathTaskJs);
  }

  createTaskStructure() {
    createFile(this.pathStartIndexfile);
    createFile(this.pathStartJSfile);
    const scriptContent = fs.readFileSync(this.pathScriptContent, { encoding: "utf8" });

    fs.writeFile(this.pathStartJSfile, scriptContent, function (err) {
      if (err) return console.log(err);
    });

  }

  createFolderForUser() {
    const source = this.pathTaskDesc;

    userData.forEach((user) => {
      const destination = normalize(`${this.pathUserFolder}/${user.name}`);
      const destinationFileIndex = normalize(`${destination}/index.html`);
      const destinationFileScript = normalize(`${destination}/js/script.js`);

      if (!fs.existsSync(destination)) {
        copyFile(source, destination);
      } else if (
        checkFileEmpty(destinationFileIndex) &&
        checkFileEmpty(destinationFileScript)
      ) {
        copyFile(source, destination);
      } else {
        flagConsoleLog
          ? console.log(
              `⚠️:${
                user.name
              } ma dane w plikach ⚠️:${destinationFileIndex}:${checkFileEmpty(
                destinationFileIndex
              )} ⚠️:${destinationFileScript}:${checkFileEmpty(
                destinationFileScript
              )}`
            )
          : "";
      }
    });
  }
}

taskData.forEach((taskData) => {
  createFolder(mainTaskFolder);
  new Task(taskData);
});
