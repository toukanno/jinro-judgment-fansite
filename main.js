const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: '人狼ジャッジメント ファンサイト',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const menu = Menu.buildFromTemplate([
    {
      label: 'ファイル',
      submenu: [
        { label: '終了', accelerator: 'CmdOrCtrl+Q', role: 'quit' }
      ]
    },
    {
      label: '表示',
      submenu: [
        { label: '拡大', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
        { label: '縮小', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: 'リセット', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { type: 'separator' },
        { label: '全画面', accelerator: 'F11', role: 'togglefullscreen' },
        { type: 'separator' },
        { label: '開発者ツール', accelerator: 'F12', role: 'toggleDevTools' }
      ]
    },
    {
      label: 'ナビゲーション',
      submenu: [
        { label: '戻る', accelerator: 'Alt+Left', click: () => win.webContents.goBack() },
        { label: '進む', accelerator: 'Alt+Right', click: () => win.webContents.goForward() },
        { label: '再読み込み', accelerator: 'CmdOrCtrl+R', role: 'reload' }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
