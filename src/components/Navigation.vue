<template>
  <div class="navigation-bar">
    <span>Navigation</span>
    <button v-on:click="closeWindow()">xy</button>
  </div>
</template>

<script>
const { remote, ipcRenderer } = require("electron")
const { Menu } = remote

export default {
  name: 'Navigation',
  props: {
    msg: String
  },
  data() {
    return {}
  },
  created() {
    this.initMenu();
  },
  methods: {
    initMenu() {
      const menu = Menu.buildFromTemplate([
        {
          label: "File",
          submenu: [
            { label: "New Window" },
            {
              label: "Settings",
              accelerator: "CmdOrCtrl+,",
              click: () => {
                ipcRenderer.send("toggle-settings");
              }
            },
            { type: "separator" },
            {
              label: "Quit",
              accelerator: "CmdOrCtrl+Q"
            }
          ]
        },
        {
          label: "Console",
          click: () => {
            console.log('>>>>>>>');
              // window.webContents.openDevTools()
          }
        },
        {
          label: "Edit",
          submenu: [
            { label: "Menu Item 1" },
            { label: "Menu Item 2" },
            { label: "Menu Item 3" }
          ]
        }
      ]);
      Menu.setApplicationMenu(menu);
    },
    closeWindow(){
      console.log('Kapat');
      var window = remote.getCurrentWindow();
       window.close();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigation-bar {
  -webkit-app-region: drag;
  height:50px;
  background:#dede00;
  color:#dd00;
  display:flex;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding:10px 10px;
}
.navigation-bar > button {
  -webkit-app-region: no-drag;
}
</style>
