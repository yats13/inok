<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>

  </div>
</template>

<style lang="scss">
  @import '@/scss/base.scss';
</style>
