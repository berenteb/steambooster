require("dotenv").config();
const http = require("http");
const SteamUser = require("steam-user");
const user = new SteamUser();

const Actions = {
  LOGIN: "login",
  GUARD: "guard",
  STOP: "stop",
  STATUS: "status",
};

class UserSession {
  isActive;
  games;
  username;
  password;
  constructor() {
    this.isActive = false;
    this.username = "";
    this.password = "";
    this.games = [];
  }
  saveUsernameAndPassword(username, password) {
    this.username = username;
    this.password = password;
  }
  setIsActive(isActive) {
    this.isActive = isActive;
  }
  setGames(games) {
    this.games = games;
  }
}

class RequestSession {
  isActive;
  serverResponse;
  constructor() {
    this.isActive = false;
  }
  sendResponse(message) {
    if (this.isActive && this.serverResponse) {
      try {
        this.serverResponse.writeHead(200, headers);
        this.serverResponse.write(JSON.stringify(message));
        this.serverResponse.end();
      } catch (e) {
        console.error("RequestSession error", e);
      }
      this.isActive = false;
      this.serverResponse = undefined;
    }
  }
  setServerResponse(res) {
    this.isActive = true;
    this.serverResponse = res;
  }
}

function login(steamGuard) {
  if (!currentSession.isActive) {
    if (currentSession.username !== "" && currentSession.password !== "") {
      if (steamGuard) {
        if (steamGuard === "") {
          requestSession.sendResponse({
            error: "SteamGuard kód üres!",
          });
          return;
        }
        user.logOn({
          accountName: currentSession.username,
          password: currentSession.password,
          twoFactorCode: steamGuard,
        });
      } else {
        user.logOn({
          accountName: currentSession.username,
          password: currentSession.password,
        });
      }
    } else {
      requestSession.sendResponse({
        error: "Felhasználónév vagy jelszó üres!",
      });
    }
  } else {
    requestSession.sendResponse({ error: "Már be vagy jelentkezve!" });
  }
}

function logOut() {
  user.logOff();
}

function sendStatus() {
  requestSession.sendResponse({
    running: currentSession.isActive,
  });
}

const currentSession = new UserSession();
const requestSession = new RequestSession();

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Max-Age": 2592000,
  "Access-Control-Allow-Headers": "*",
};

http
  .createServer((req, res) => {
    requestSession.setServerResponse(res);
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      handleRequest(data);
    });
  })
  .listen(process.env.BACKEND_PORT);

console.log("Server listening on " + process.env.BACKEND_PORT);

function handleRequest(data) {
  let dataJson;
  try {
    dataJson = JSON.parse(data);
  } catch (e) {
    requestSession.sendResponse({ error: "Rossz formátum a lekérdezésben!" });
    return;
  }
  if (!dataJson.action) {
    requestSession.sendResponse({ error: "Nincs parancs!" });
    return;
  }
  switch (dataJson.action) {
    case Actions.LOGIN:
      currentSession.username = dataJson.username || "";
      currentSession.password = dataJson.password || "";
      login();
      break;
    case Actions.GUARD:
      login(dataJson.steamGuard || "");
      break;
    case Actions.STATUS:
      sendStatus();
      break;
    case Actions.STOP:
      logOut();
      break;
    default:
      requestSession.sendResponse({ error: "Nincs ilyen parancs!" });
      break;
  }
}

//Event handlers
user.on("loggedOn", function () {
  console.log("Logged in (loggedOn)");
  user.setPersona(SteamUser.EPersonaState.Snooze);
  user.gamesPlayed(currentSession.games);
  currentSession.isActive = true;
  requestSession.sendResponse({
    running: currentSession.isActive,
    statusMsg: "Sikeres bejelentkezés!",
  });
});
user.on("webSession", function () {
  console.log("Logged in (webSession)");
  user.setPersona(SteamUser.EPersonaState.Online);
  user.gamesPlayed(currentSession.games);
  currentSession.isActive = true;
  requestSession.sendResponse({
    running: currentSession.isActive,
    statusMsg: "Sikeres bejelentkezés!",
  });
});
user.on("steamGuard", function () {
  console.log("SteamGuard event");
  currentSession.isActive = false;
  requestSession.sendResponse({
    running: currentSession.isActive,
    steamGuardRequired: true,
    statusMsg: "SteamGuard szükséges!",
  });
});
user.on("disconnected", function (eresult, msg) {
  console.log("Disconnected: " + msg);
  currentSession.isActive = false;
  requestSession.sendResponse({
    running: currentSession.isActive,
    statusMsg: "Kijelentkeztél, vagy ki lettél léptetve!",
  });
});
user.on("error", function (err) {
  // console.log(err);
  currentSession.isActive = false;
  requestSession.sendResponse({
    error: err.toString(),
  });
});
