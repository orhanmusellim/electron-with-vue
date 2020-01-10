<template>
  <div class="navigation-bar">
    <b-navbar toggleable="sm" type="dark" class="bg-amber" variant="info">
      <b-navbar-brand href="#" class="text-body">File Browser</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button class="text-center text-body bg-transparent border-0 clickable" @click="developerConsole()">
            <b-icon icon="gear"></b-icon>
          </b-button>
          <b-button class="text-center text-body bg-transparent border-0 clickable" @click="minimizeWindow()">
            <b-icon icon="dash"></b-icon>
          </b-button>
          <b-button class="text-center text-body bg-transparent border-0 clickable" @click="fullscreenWindow()">
            <b-icon :icon="fullscreenicon"></b-icon>
          </b-button>
          <b-button class="text-center text-body bg-transparent border-0 clickable" @click="closeWindow()">
            <b-icon icon="x-circle"></b-icon>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
const { remote, ipcRenderer } = require("electron")
const { Menu } = remote

export default {
  name: 'Navigation',
  data() {
    return {
      fullscreenicon :'arrows-fullscreen'
    }
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
      var window = remote.getCurrentWindow();
       window.close();
    },
    fullscreenWindow(){
      var window = remote.getCurrentWindow();
      if(window.isMaximized()){
        this.fullscreenicon = 'arrows-fullscreen';
        window.setSize(1000, 500);
        var x = remote.getCurrentWindow().getPosition()[0] + 200;
        var y = remote.getCurrentWindow().getPosition()[1] + 200;
        window.setPosition(x,y)
      }else{
        this.fullscreenicon = 'arrows-angle-contract';
        window.maximize();
      }
    },
    minimizeWindow(){
      var window = remote.getCurrentWindow();
      window.minimize();
    },
    developerConsole(){
      var window = remote.getCurrentWindow();
      window.webContents.openDevTools();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .b-button, button {
    outline: none!important;
    box-shadow: none!important;
  }
.navigation-bar {
  -webkit-app-region: drag;
}
.clickable {
  cursor:pointer;
  -webkit-app-region: no-drag;
}
</style>
