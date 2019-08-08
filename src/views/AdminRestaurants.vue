<template>
  <div class="container py-5">
    <!-- 後台餐廳頁籤 AdminNav -->
    <AdminNav />

    <router-link to="/admin/restaurants/new" class="btn btn-primary mb-4">New Restaurant</router-link>

    <!-- 後台餐廳列表 AdminRestaurantTable -->
    <AdminRestaurantTable />
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav.vue";
import AdminRestaurantTable from "./../components/AdminRestaurantTable.vue";

export default {
  components: {
    AdminNav,
    AdminRestaurantTable
  },
  data() {
    return {};
  }
};
</script>
