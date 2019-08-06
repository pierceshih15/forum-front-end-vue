<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row">
      <UsersCard v-for="user in users" :user="user" :key="user.id" />
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import UsersCard from "./../components/UsersCard";

const dummyData = {
  users: [
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$oNyp9cr8jG7NulbUr56g6e3yvwnttFkoBAmtUYAeQuXkcdFz0Ko6y",
      isAdmin: false,
      image: null,
      createdAt: "2019-07-30T16:24:55.204Z",
      updatedAt: "2019-07-30T18:31:00.826Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    },
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$OJ3jR93XlEMrQtYMWOIQh.EINWgaRFTXkd0Xi5OC/Vz4maztUXEPe",
      isAdmin: true,
      image: null,
      createdAt: "2019-07-30T16:24:54.983Z",
      updatedAt: "2019-07-30T16:24:54.983Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$tsvcnSFsJvdvs2NLm9rW.uYbah93Xl5cTYcQnSeK3sjEopj.NGzk2",
      isAdmin: false,
      image: null,
      createdAt: "2019-07-30T16:24:55.422Z",
      updatedAt: "2019-07-30T18:31:02.046Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    }
  ]
};

export default {
  components: {
    NavTabs,
    UsersCard
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsersTop();
  },
  methods: {
    fetchUsersTop() {
      this.users = dummyData.users;
    }
  }
};
</script>