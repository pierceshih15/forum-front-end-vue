<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <div v-else class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <p>[{{ restaurant.categoryName }}]</p>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        />
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{ restaurant.openingHours }}
            </li>
            <li>
              <strong>Tel:</strong>
              {{ restaurant.tel }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ restaurant.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr />
    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script>
import Spinner from './../components/Spinner'
import { emptyImageFilter } from './../utils/mixins'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  name: 'AdminRestaurant',
  mixins: [emptyImageFilter],
  components: {
    Spinner
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: ''
      },
      isLoading: false
    }
  },
  mounted() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      this.isLoading = true
      try {
        const {
          data: { restaurant },
          statusText
        } = await adminAPI.restaurants.getDetail({
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
          image: restaurant.image,
          openingHours: restaurant.opening_hours,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        if (!this.id) {
          Toast.fire({
            type: 'warning',
            title: '該餐廳不存在，請選擇其他資料'
          })
          this.$router.push({
            name: 'admin-restaurants'
          })
        } else {
          Toast.fire({
            type: 'error',
            title: '無法取得餐廳資料，請稍後再試'
          })
        }
      }
    }
  }
}
</script>