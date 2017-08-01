// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/js/common.js'

Vue.config.productionTip = false

// 注册 css 自定义标签
if(document.registerElement) {
    [
    'form-group', 
    ].forEach(tagName=>document.registerElement(tagName))
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
