const fs = require("fs");
const { normalize } = require("path");
const http = require("http");
const httpShutdown = require("http-shutdown");
const express = require("express");
const app = express();
const server = httpShutdown(http.createServer(app));
const { highlight: hljs } = require("highlight.js");

const data = require('./util/data.js');
const taskData = data.tasks();
const userData = data.users();
const taskPath = normalize(`${__dirname}/task/`);

const PORT = 3000;

function setupVariables(obj) {
  "scripts noscript home error userList scriptContent scriptType scriptName noEmbed subtitle"
    .split(" ")
    .forEach(key => {
      if (obj[key] === undefined) obj[key] = false;
    });
}

app.set("view engine", "ejs");
app.disable("view cache");
app.use(express.static(normalize(`${__dirname}/public`)));

app.get("/", function(req, res) {
  res.redirect("/home");
});

app.get("/task/:id/", function(req, res, next) {
  const id = req.params.id;
  return res.redirect(`/task/${id}/desc`);
});

app.get("/task/:id/:type", function(req, res, next) {
  let type = req.params.type,
      id = req.params.id,
      task = parseInt(id);

  let data = Object.assign({}, taskData[task - 1]);

  if (type === "user") {
    data.title = taskData[id - 1].title;
    data.tasks = [taskData[id - 1]];
    data.users = userData;
    data.userList=true;
  }

  data.relativePath = normalize(
    `${data.taskId}/${type}/`
  );

  data.path = normalize(`${taskPath}/${data.relativePath}`);

  if(!data.noscript) {
    try {
      data.scriptContent = fs.readFileSync(`${data.path}js/script.js`, { encoding: "utf8" });
      data.highlight = hljs;
    } catch(e) {
        data.scriptContent = false;
    }
  }



  setupVariables(data);

  res.render("pages/index", data, function(err, html) {
    if (err) {
      data.title = "Błąd renderowania szablonu";
      data.error = err.message;
      res.render("pages/index", data);
    } else {
      res.send(html);
    }
  });
});

app.get("/task/:id/user/:idUser", function(req, res) {

  let id = req.params.id,
      idUser = req.params.idUser;


  let data = {
    taskId : id,
    userId : idUser,
    userName : userData[idUser - 1].name,
    subtitle: `Uytkownik: ${userData[idUser - 1].name}`,
    title: `Zadanie: ${taskData[id - 1].title}`,
    tasks: taskData,
    users: userData,
  };


  data.relativePath = normalize(
    `${data.taskId}/user/${data.userName}/`
  );


  data.path = normalize(`${taskPath}/${data.relativePath}/`);

  if(!data.noscript) {
    try {
      data.scriptContent = fs.readFileSync(`${data.path}js/script.js`, { encoding: "utf8" });
      data.highlight = hljs;
    } catch(e) {
        data.scriptContent = false;
    }
  }

  setupVariables(data);

  res.render("pages/index", data, function(err, html) {
    if (err) {
      data.title = "Błąd renderowania szablonu";
      data.error = err.message;
      res.render("pages/index", data);
    } else {
      res.send(html);
    }
  });

});

app.get("/home", function(req, res) {
  let data = {
    title: "Wyniki wyszukiwania",
    home: true,
    tasks: taskData,
    users: userData,
    noscript: true,
  };

  setupVariables(data);

  res.render("pages/index", data);
});


app.use(express.static(taskPath));

server.listen(PORT, function() {
  console.log(
    `Aplikacja została uruchomiona pod adresem http://localhost:${PORT}\nAby ją zatrzymać, naciśnij CTRL+C`
  );
});

process.on("SIGINT", () => server.shutdown());
