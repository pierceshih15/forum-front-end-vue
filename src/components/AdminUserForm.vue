<template>
  <div>
    <form @submit.stop.prevent="handleSumbit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="user.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
const dummyData = {
  user: {
    id: 1,
    name: "管理者",
    image: "https://i.pravatar.cc/300"
  }
};

export default {
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        name: "",
        image: ""
      })
    }
  },
  data() {
    return {
      user: {
        name: "",
        image: ""
      }
    };
  },
  created() {
    this.user = {
      ...this.user,
      ...this.initialUser
    };
  },
  methods: {
    handleFileChange(e) {
      const files = e.target.files;

      if (!files.length) return;

      const imageURL = window.URL.createObjectURL(files[0]);
      this.user.image = imageURL;
    },
    handleSumbit(e) {
      const form = e.target;
      const formData = new FormData(form);

      this.$emit("after-submit", formData);
    }
  }
};
</script>
