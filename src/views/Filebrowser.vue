<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4 bg-dark text-white pt-2 pb-2">
        <ul>
          <li v-for="folder in this.pathItems.folders">{{folder}}</li>
        </ul>
      </div>
      <div class="col-sm-8 bg-light pt-2 pb-2">
        {{this.pathItems.files}}
      </div>
    </div>
  </div>
</template>

<script>
  import fs from 'fs'
export default {
  name: 'Filebrowser',
  data() {
    return {
      basePath : 'G://',
      path: 'G://',
      pathItems: {
        folders : [],
        files: []
      }
    }
  },
  created(){
    fs.readdir(this.basePath, (e, items) => {
      console.log(items)
      items.forEach(value => {
        if(fs.statSync(this.basePath + value).isDirectory()){
          this.pathItems.folders.push(this.basePath + value)
        }
        if(fs.statSync(this.basePath + value).isFile()){
          this.pathItems.files.push(this.basePath + value)
        }
      })
    })

  }
}
</script>
<style scoped>
  body{
    border-radius: 10px;
    overflow: hidden;
  }
</style>
