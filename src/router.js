import Vue from "vue";
import Router from "vue-router";
import SignIn from "./views/SignIn.vue";
import NotFound from "./views/NotFound.vue";
import Restaurants from './views/Restaurants.vue'
import store from './store'

Vue.use(Router);

const authorizeIsAdmin = (to, from, next) => {
  // 從 vuex 中取出 currentUser
  const currentUser = store.state.currentUser
  // 若 currentUser 存在，且不具 admin 權限時，則導向至 404 頁面
  if (currentUser && !currentUser.isAdmin) {
    next('/404')
    return
  }
  next()
}


const router = new Router({
  linkExactActiveClass: 'active',
  routes: [{
      path: '/',
      name: 'root',
      redirect: '/signin'
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
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('./views/Restaurant.vue')
    },
    {
      path: '/restaurants/:id/dashboard',
      name: 'restaurant-dashboard',
      component: () => import('./views/RestaurantDashboard.vue')
    },
    {
      path: '/users/top',
      name: 'users-top',
      component: () => import('./views/UsersTop.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('./views/User.vue')
    },
    {
      path: '/admin',
      exact: true,
      redirect: 'admin/restaurants'
    },
    {
      path: '/admin/restaurants',
      name: 'admin-restaurants',
      component: () => import('./views/AdminRestaurants.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/restaurants/new',
      name: 'admin-restaurant-new',
      component: () => import('./views/AdminRestaurantNew.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/restaurants/:id/edit',
      name: 'admin-restaurant-edit',
      component: () => import('./views/AdminRestaurantEdit.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/restaurants/:id',
      name: 'admin-restaurant',
      component: () => import('./views/AdminRestaurant.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/users/:id/edit',
      name: 'admin-user-edit',
      component: () => import('./views/AdminUserEdit.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('./views/AdminCategories.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('./views/AdminUsers.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    },
  ]
});

// 路由切換會先進入 beforeEach 這個方法
router.beforeEach(async (to, from, next) => {
  // 從 localStorage 取出 token
  const tokenInLocalStorage = localStorage.getItem('token')
  // 從 vuex state 取出 token
  const tokenInStorage = store.state.token;
  // 預設為既有 vuex state 的 isAuthenticated 狀態
  let isAuthenticated = store.state.isAuthenticated;

  // 如果有 token 的話，且兩者不相同時，則驗證
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStorage) {
    // 取得驗證成功與否
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 無需驗證的頁面
  const pathsWithoutAuthentication = ['sign-up'];
  if (pathsWithoutAuthentication.includes(to.name)) {
    next()
    return
  }

  // 如果 token 無效且前往頁面不為登入頁時，則轉址到登入頁
  if (!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }

  // 如果 token 有效則轉址到餐聽首頁
  if (isAuthenticated && to.name === 'sign-in') {
    next('/restaurants')
    return
  }

  next()
})

export default router