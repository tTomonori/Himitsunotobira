const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ipc=electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mMainWindow

function createWindow () {
  // Create the browser window.
  mMainWindow = new BrowserWindow({
    width: 1000,
    maxWidth: 1000,
    minWidth: 1000,
    height: 700,
    maxHeight: 700,
    minHeight: 700,
    // scrollable: false,g
  })

  // and load the index.html of the app.
  // mMainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'title/title.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  //テスト用
  // mMainWindow.loadURL("file://"+__dirname+'/setting/setting.html?member='+"0");
  // mMainWindow.loadURL("file://"+__dirname+'/battle/battle.html?chara='+[0,'T',2,'T',0,'F',1,'F']+'&num='+(1));
  // mMainWindow.loadURL("file://"+__dirname+'/battle/battle.html?chara='+[0,'T',1,'T']+'&num='+(-1));

  // スタート画面
  mMainWindow.loadURL("file://"+__dirname+'/map/mapFeild.html');
  // mMainWindow.loadURL("file://"+__dirname+'/menu/menu.html');


  // Open the DevTools.
  mMainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mMainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mMainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
  app.quit();
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mMainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipc.on("start",function(e,aNum){//スタート画面でプレイヤーの人数を選択後、キャラ選択画面へ
    mMainWindow.loadURL("file://"+__dirname+'/setting/setting.html?member='+aNum);
  // mMainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'setting/setting.html/?member='+aNum),
  //   protocol: 'file:',
  //   slashes: true
  // }))
})
ipc.on("quest",function(e,aNum){
  mMainWindow.loadURL("file://"+__dirname+'/setting/setting.html?quest='+aNum)
})
ipc.on("selected",function(e,aChara,aPlayerNum){//キャラ選択画面でキャラを選択後、バトル画面へ
  mMainWindow.loadURL("file://"+__dirname+'/battle/battle.html?chara='+aChara+'&num='+aPlayerNum);

})
ipc.on("questCharaSelected",function(e,aChara,aQuestNum){//キャラ選択画面でキャラを選択後、バトル画面へ
  mMainWindow.loadURL("file://"+__dirname+'/battle/battle.html?chara='+aChara+'&quest='+aQuestNum);
})
