const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  pickFolder: async () => await ipcRenderer.invoke('pick-folder')
});