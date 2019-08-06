<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 回到上一頁 previousPage -->
      <li v-show="previouspage" class="page-item">
        <router-link
          class="page-link"
          :to="{ name:'restaurants', query:{categoryId,page:previouspage}}"
          aria-lable="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <!-- 頁碼 -->
      <li
        v-for="page in totalPage"
        :key="page"
        class="page-item"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link
          class="page-link"
          :to="{name: 'restaurants', query: { categoryId, page }}"
        >{{ page }}</router-link>
      </li>

      <!-- 前往下一頁 nextPage -->

      <li v-show="nextpage" class="page-item">
        <router-link
          class="page-link"
          :to="{ name:'restaurants', query:{categoryId,page:nextpage}}"
          aria-lable="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    categoryId: {
      type: Number,
      default: -1
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    };
  },
  computed: {
    previouspage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextpage() {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    }
  }
};
</script>