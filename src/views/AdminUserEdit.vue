<template>
  <div class="container py-5">
    <!-- 使用者表單 -->
    <AdminUserForm :initial-user="user" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminUserForm from "./../components/AdminUserForm";

const dummyData = {
  user: {
    id: 1,
    name: "管理者",
    image: "https://i.pravatar.cc/300"
  }
};

export default {
  components: {
    AdminUserForm
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        image: ""
      }
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser(userId) {
      const { user } = dummyData;
      this.user = {
        ...this.user,
        id: user.id,
        name: user.name,
        image: user.image
      };
    },
    handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    }
  }
};
</script>