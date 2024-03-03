<script setup>
import { useStore } from "./store";
const store = useStore();
store.addMenu();
</script>

<template>
  <router-view />
</template>

<style>
#app {
  height: 100%;
}
</style>
