const electron = require("electron");
var { app, BrowserWindow, Tray, Menu } = electron;
var path = require("path");
var url = require("url");

var iconpath = path.join(__dirname, "./assets/images/open-door.png");

let tray = null;

app.on("ready", function () {
  var win = new BrowserWindow({
    width: 600,
    height: 600,
    icon: iconpath,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "view/login.html"));
  win.on("minimize", () => {
    if (tray) {
      return win.hide();
    }
    tray = new Tray(iconpath);

    const template = [
      {
        label: "Show App",
        click: function () {
          win.show();
        },
      },
      {
        label: "Full Screen",
        click: function () {
          win.maximize();
        },
      },
      {
        label: "Quit",
        click: function () {
          win.close();
        },
      },
    ];

    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    tray.setToolTip("Bee Portal");
    win.hide();
  });
});
