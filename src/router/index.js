import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/select',
      name: 'Select',
      component: require('@/views/Select.vue')
    },
    {
      path: '/viewer',
      name: 'Viewer',
      component: require('@/views/Viewer.vue')
    },
  ]
})
