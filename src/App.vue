<script setup>
import Menu from './components/Menu.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

</script>

<template>
  <header>
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
