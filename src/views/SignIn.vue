<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            type: "warning",
            title: "請填入 email 和 password"
          });
          return;
        }

        this.isProcessing = true;

        // 驗證使用者登入資訊是否合法
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        });

        console.log("response", response);

        // 取得 API 請求後的資料
        const { data, statusText } = response;

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 將資料傳到 Vuex 中，前者參數為驅動之函式，後者為相關之參數
        this.$store.commit("setCurrentUser", data.user);

        // 成功登入後轉址到餐廳首頁
        this.$router.push("/restaurants");
      } catch (error) {
        // 清空密碼
        this.password = "";
        this.isProcessing = false;

        // 顯示錯誤提示
        Toast.fire({
          type: "warning",
          title: "請再次確認，您輸入的帳號密碼有誤"
        });
      }
    }
  }
};
</script>