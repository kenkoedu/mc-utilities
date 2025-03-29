import { createRouter, createWebHistory } from "vue-router"
import ByTopic from '@/pages/ByTopic.vue'; // Updated import
import ExerciseSelector from '@/pages/ExerciseSelector.vue'; // Updated import
import ByYear from '@/pages/ByYear.vue'; // Updated import

const Home = { template: '<div>Home</div>' }

const routes = [
  { path: '/', component: Home },
  {
    path: '/mc-utilities',
    component: Home,
    children: [
      { path: '/by-topic', component: ByTopic },
      { path: '/ex-editor', component: ExerciseSelector },
      { path: '/by-year', component: ByYear }
    ]
  },
  { path: '/:pathMatch(.*)', component: Home }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export { router }