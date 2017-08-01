<template>
  <div id="app">
    <div class="panel">
      <div class="panel-left">
        <h1 class="header">VUE-2.0</h1>
        <ul class="menu">
          <li class="menu-item">
            <a href="#/select">Select</a>
          </li>
          <li class="menu-item">
            <a href="#/viewer">Viewer</a>
          </li>
        </ul>
      </div>
      <div class="panel-right">
        <transition name="fade" mode="out-in">
          <keep-alive :include="/keep-alive$/">
            <router-view></router-view>
          </keep-alive>
        </transition> 
      </div>
    </div>
    <div class="footer">copyright © 2002-2017 JSNU-Bighead</div>
  </div>
</template>

<script>
  import './common/css/common.css'
  export default {
    name: 'app',
   
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
      transition: opacity .2s
  }
  .fade-enter,
  .fade-leave-to
  {
      opacity: 0
  }
</style>
