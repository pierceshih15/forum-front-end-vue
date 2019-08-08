<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image | emptyImage" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{user.name}}</h5>
          <p class="card-text">{{user.email}}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{user.commentsLength}}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{user.favoritedRestaurantsLength}}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{user.followingsLength}}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{user.followersLength}}</strong> followers (追隨者)
            </li>
          </ul>

          <!-- 本人 -->
          <template v-if="isCurrentUser">
            <a href="/users/1/edit">
              <button type="submit" class="btn btn-primary">edit</button>
            </a>
          </template>

          <!-- 非本人 -->
          <template v-else>
            <button
              v-if="isFollowed"
              type="button"
              class="btn btn-danger"
              @click.stop.prevent="removeFollowing()"
            >取消追蹤</button>

            <button
              v-else
              type="button"
              class="btn btn-danger"
              @click.stop.prevent="addFollowing()"
            >追蹤</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../uilts/mixins";

export default {
  name: "UserProfileCard",
  mixins: [emptyImageFilter],
  props: {
    user: {
      type: Object,
      required: true
    },
    isCurrentUser: {
      type: Object,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed
    };
  },
  methods: {
    addFollowing() {
      this.isFollowed = true;
    },
    removeFollowing() {
      this.isFollowed = false;
    }
  }
};
</script>