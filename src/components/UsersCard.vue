<template>
  <div class="col-3 text-center">
    <router-link :to="{name:'user',params:{id:user.id}}">
      <img src="http://via.placeholder.com/300x300?text=No+Image" width="140px" height="140px" />
    </router-link>
    <h2>{{user.name}}</h2>
    <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
    <p class="mt-3">
      <button v-if="!Follow" type="button" class="btn btn-danger">取消追蹤</button>
      <button v-else type="button" class="btn btn-primary">追蹤</button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    Follow() {
      this.user = {
        ...this.user,
        isFollowed: true
      };
    },
    unFollow() {
      this.user = {
        ...this.user,
        isFollowed: false
      };
    }
  }
};
</script>