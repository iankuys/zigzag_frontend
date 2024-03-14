<script setup>
import Menu from './components/Menu.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
</script>

<template>
  <header>
    <img alt="UCI MIND logo" class="logo" src="./assets/UCI16_MIND_Full_ctr_blue copy.png" width="278" height="58" style="float:right;"/>

  </header>

  <main>
    <Menu></Menu>
  </main>

</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header .logo {
  position: fixed;
  left:0;
  top:0;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
}
</style>
