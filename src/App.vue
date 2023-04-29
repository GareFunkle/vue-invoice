<template>
  <Menu />
  <router-view>

  </router-view>
</template>

<script>
import Menu from './components/Menu/Menu.vue';

export default {
  name: "App",
  components: {
    Menu
  }
}
</script>


<style lang="scss" >
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

main {
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
