<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="180">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{user.id}}</th>
          <td>{{user.email}}</td>
          <td>{{ user.isAdmin ? 'admin' : 'user' }}</td>
          <td>
            <button
              v-if="currentUser.id !== user.id"
              type="button"
              class="btn btn-link"
              @click.stop.prevent="toggleUserRole(user.id)"
            >{{ user.isAdmin ? 'set as user':'set as admin'}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root test",
      email: "root@example.com",
      password: "$2a$10$OJ3jR93XlEMrQtYMWOIQh.EINWgaRFTXkd0Xi5OC/Vz4maztUXEPe",
      isAdmin: true,
      image: "https://i.imgur.com/58ImzMM.png",
      createdAt: "2019-07-30T16:24:54.983Z",
      updatedAt: "2019-08-07T04:09:56.622Z"
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$oNyp9cr8jG7NulbUr56g6e3yvwnttFkoBAmtUYAeQuXkcdFz0Ko6y",
      isAdmin: false,
      image: "https://i.imgur.com/Q14p2le.jpg",
      createdAt: "2019-07-30T16:24:55.204Z",
      updatedAt: "2019-08-07T06:16:00.171Z"
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$tsvcnSFsJvdvs2NLm9rW.uYbah93Xl5cTYcQnSeK3sjEopj.NGzk2",
      isAdmin: false,
      image: "https://i.imgur.com/OezkRwO.jpg",
      createdAt: "2019-07-30T16:24:55.422Z",
      updatedAt: "2019-08-07T06:16:40.100Z"
    }
  ]
};

const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true
  },
  isAuthenticated: true
};

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: [],
      currentUser: []
    };
  },
  created() {
    this.fetchUsers();
    this.fetchCurrentUser();
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    },
    fetchCurrentUser() {
      this.currentUser = dummyUser.currentUser;
    },
    toggleUserRole(userId) {
      this.users = this.users.map(user => {
        if (user.id !== userId) return user;

        return {
          ...user,
          isAdmin: !user.isAdmin
        };
      });
    }
  }
};
</script>