<script setup>
import Menu from './components/Menu.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
</script>

<template>
  <header>
    <img alt="UCI MIND logo" class="logo" src="./assets/UCI16_MIND_Full_ctr_blue copy.png" width="278" height="58"/>

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

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
