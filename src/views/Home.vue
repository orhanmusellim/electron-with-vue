<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4 bg-dark text-white pt-2 pb-2">
        Area
      </div>
      <div class="col-sm-8 bg-light pt-2 pb-2">Area</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      windowHeight : 100,
      windowWidth : 100
    }
  },
  created(){

  }
}
</script>
<style scoped>
  .row > div {
    height: windowHeight
  }
  body{
    border-radius: 10px;
    overflow: hidden;
  }
</style>
