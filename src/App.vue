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
:root {
  --color-1: #283227;
  --color-2: #575b44;
  --color-3: #f4f6f5;
  --color-4: #449e2f;
  --color-5: #8c603a;
  --color-6: #cc9b66;
}

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
