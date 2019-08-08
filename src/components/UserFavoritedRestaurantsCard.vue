<template>
  <div class="card">
    <div class="card-header">
      <strong>{{favoritedRestaurants.length}}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <router-link
        v-for="restaurant in favoritedRestaurants"
        :key="restaurant.id"
        :to="{name:'restaurant',params:{id:restaurant.id}}"
      >
        <img :src="restaurant.image | emptyImage" width="60" height="60" class="avatar mr-1" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../uilts/mixins";

export default {
  name: "UserFavoritedRestaurantsCard",
  mixins: [emptyImageFilter],
  props: {
    favoritedRestaurants: {
      type: Array,
      default: () => []
    }
  }
};
</script>