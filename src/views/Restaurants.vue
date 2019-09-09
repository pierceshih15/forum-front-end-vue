<template>
  <div class="container py-5">
    <NavTabs />

    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />

    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 餐廳卡片 RestaurantsCard -->
      <div class="row">
        <RestaurantsCard
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :initial-restaurant="restaurant"
        />
      </div>

      <!-- 分頁標籤 RestaurantsPagination -->
      <RestaurantsPagination
        v-if="totalPage >1"
        :category-Id="categoryId"
        :current-page="currentPage"
        :total-page="totalPage"
      />

      <div v-if="restaurants.length < 1">此類別目前無餐廳資料</div>
    </template>
  </div>
</template>

<script>
import Spinner from './../components/Spinner.vue'
import NavTabs from './../components/NavTabs'
import RestaurantsCard from './../components/RestaurantsCard'
import RestaurantsNavPills from './../components/RestaurantsNavPills'
import RestaurantsPagination from './../components/RestaurantsPagination'

import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

export default {
  components: {
    NavTabs,
    RestaurantsCard,
    RestaurantsNavPills,
    RestaurantsPagination,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: '',
      currentPage: 1,
      totalPage: 0,
      isLoading: true
    }
  },
  created() {
    const { page, categoryId } = this.$route.query
    this.fetchRestaurants({
      page,
      categoryId
    })
  },
  beforeRouteUpdate(to, from, next) {
    const { page, categoryId } = to.query
    this.fetchRestaurants({ page, categoryId })
    next()
  },
  methods: {
    async fetchRestaurants({ page = 1, categoryId = '' }) {
      try {
        this.isLoading = true
        // STEP 1：串接 api 回傳資料
        const { data, statusText } = await restaurantsAPI.getRestaurants({
          page,
          categoryId
        })

        // STEP 2：如果 statusText 不是 OK 的話則進入錯誤處理
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // STEP 3：將從伺服器取得的 data 帶入 Vue 內
        this.restaurants = data.restaurants
        this.categories = data.categories
        this.categoryId = data.categoryId
        this.currentPage = data.page
        this.totalPage = data.totalPage.length
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          type: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  }
}
</script>