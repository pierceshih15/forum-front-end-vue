<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <div v-else class="row">
      <div class="col-md-12 mb-3">
        <h1>{{ restaurant.name }}</h1>
        <p class="badge badge-secondary mt-1 mb-3">{{ restaurant.categoryName }}</p>
      </div>
      <div class="col-md-12">
        <div class="contact-info-wrap">
          <ul>
            <li>有 {{ restaurant.commentsLength }} 筆評論</li>
            <li>有 {{ restaurant.favoritedUsersLength }} 人收藏這家餐廳</li>
          </ul>
        </div>
      </div>
      <div class="col-md-12">
        <a href="back">回上一頁</a>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from './../components/Spinner.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

export default {
  components: {
    Spinner
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        commentsLength: 0,
        favoritedUsersLength: 0,
        likedUsersLength: 0
      },
      isLoading: true
    }
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params
    this.fetchRestaurant(restaurantId)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true

        const {
          data: { restaurant },
          statusText
        } = await restaurantsAPI.getRestaurant({
          restaurantId
        })

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          commentsLength: restaurant.Comments.length,
          favoritedUsersLength: restaurant.FavoritedUsers.length,
          likedUsersLength: restaurant.LikedUsers.length
        }
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