<template>
  <div class="navigation-bar">
    <b-navbar type="dark" class="bg-amber" variant="info">
      <b-navbar-brand href="#" class="text-body">Electroni'V</b-navbar-brand>
      <router-link class="navigation-menu clickable" to="/">Home</router-link>
      <router-link class="navigation-menu clickable" to="/file-browser">File Browser</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <div class="border-right border-secondary">
            <b-button class="text-center text-body bg-transparent border-0 clickable" @click="developerConsole()">
              <b-icon icon="code-slash"></b-icon>
            </b-button>
          </div>
          <div>
            <b-button class="text-center text-body bg-transparent border-0 clickable" @click="minimizeWindow()">
              <b-icon icon="dash"></b-icon>
            </b-button>
            <b-button class="text-center text-body bg-transparent border-0 clickable" @click="fullscreenWindow()">
              <b-icon :icon="fullscreenicon"></b-icon>
            </b-button>
            <b-button class="text-center text-body bg-transparent border-0 clickable" @click="closeWindow()">
              <b-icon icon="x-circle"></b-icon>
            </b-button>
          </div>
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
      window.webContents.toggleDevTools();
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
  .navigation-menu {
    color: #343a40 !important;
    margin-right:10px;
    font-size:12px;
    cursor:pointer;
  }
  .router-link-exact-active,
  .navigation-menu:hover {
    text-decoration: none!important;
    color: #000;
    font-weight: bold;
  }
</style>
