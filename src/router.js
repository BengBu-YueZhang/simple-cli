import VueRouter from 'vue-router'
import Vue from 'vue'

const Page1 = () => import('./views/PageOne.vue')
const Page2 = () => import('./views/PageTwo.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/page1', component: Page1 },
  { path: '/page2', component: Page2 }
]

const router = new VueRouter({
  routes
})

export default router