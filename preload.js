const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('appInfo', {
  platform: process.platform,
  version: require('./package.json').version
});
