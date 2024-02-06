import { createRouter, createWebHistory } from "vue-router"
import ByTopic from "./pages/ByTopic.vue"
import ExerciseSelector from "./pages/ExerciseSelector.vue"

const Home = { template: '<div>Home</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/mc-utilities/by-topic', component: ByTopic },
  { path: '/mc-utilities/ex-editor', component: ExerciseSelector }
  // { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }