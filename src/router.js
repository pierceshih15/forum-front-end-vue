import Vue from "vue";
import Router from "vue-router";
import SignIn from "./views/SignIn.vue";
import NotFound from "./views/NotFound.vue";
import Restaurants from './views/Restaurants.vue'

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [{
      path: '/',
      name: 'root',
      redirect: '/restaurants'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    },
    {
      path: '/restaurants/feeds',
      name: 'restaurants-feeds',
      component: () => import('./views/RestaurantsFeeds.vue')
    },
    {
      path: '/restaurants/top',
      name: 'restaurants-top',
      component: () => import('./views/RestaurantsTop.vue')
    },
    {
      path: '/users/top',
      name: 'users-top',
      component: () => import('./views/UsersTop.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
});