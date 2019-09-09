<template>
  <div class="container py-5">
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input type="text" v-model="newCatgoryName" class="form-control" placeholder="新增餐廳類別..." />
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="isProcessing"
            @click.stop.prevent="createCategory"
          >新增</button>
        </div>
      </div>
    </form>
    <Spinner v-if="isLoading" />
    <table v-else class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.id }}</th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">{{ category.name }}</div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
              @keyup.esc="handleCancel(category.id)"
              @keyup.enter="toggleIsEditing(category.id)"
            />
            <span v-show="category.isEditing" class="cancel" @click="handleCancel(category.id)">✕</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
            >Edit</button>
            <button
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
            >Save</button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategory(category.id)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Spinner from './../components/Spinner'
import AdminNav from './../components/AdminNav'
import uuid from 'uuid/v4'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminNav,
    Spinner
  },
  // 3. 定義 Vue 中使用的 data 資料
  data() {
    return {
      newCatgoryName: '',
      categories: [],
      isProcessing: false,
      isLoading: true
    }
  },
  // 5. 調用 `fetchCategories` 方法
  created() {
    this.fetchCategories()
  },
  methods: {
    // 4. 定義 `fetchCategories` 方法，把 `dummyData` 帶入 Vue 物件
    async fetchCategories() {
      try {
        const { data, statusText } = await adminAPI.categories.get()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false
        }))
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          type: 'error',
          title: '無法取得餐廳類別，請稍後再試'
        })
      }
    },
    async createCategory() {
      try {
        this.isProcessing = true

        if (!this.newCatgoryName) {
          Toast.fire({
            type: 'warning',
            title: '欄位不得為空，請填寫類別名稱'
          })
          this.isProcessing = false
          return
        }

        const { data, statusText } = await adminAPI.categories.create({
          name: this.newCatgoryName
        })

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        // 加入原始 categories 陣列
        this.categories.push({
          ...data,
          name: this.newCatgoryName,
          isEditing: false
        })

        this.isProcessing = false
        this.newCatgoryName = ''
        // 再次更新網頁內容，以便顯示 ID 內容
        this.fetchCategories()
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法新增餐廳類別，請稍後再試'
        })
      }
    },
    async updateCategory({ categoryId, name }) {
      try {
        if (!name) {
          Toast.fire({
            type: 'warning',
            title: '欄位不得為空，請填寫類別名稱'
          })
          this.isProcessing = false
          return
        }

        const { data, statusText } = await adminAPI.categories.update({
          categoryId,
          name
        })

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        this.toggleIsEditing(categoryId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法更新餐廳類別，請稍後再試'
        })
      }
    },
    async deleteCategory(categoryId) {
      try {
        const { data, statusText } = await adminAPI.categories.delete({
          categoryId
        })

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        this.categories = this.categories.filter(category => category.id !== categoryId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法刪除餐廳類別，請稍後再試'
        })
      }
    },

    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) return category

        return {
          ...category,
          nameCached: category.name,
          isEditing: !category.isEditing
        }
      })
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) return category

        return {
          ...category,
          name: category.nameCached
        }
      })
      this.toggleIsEditing(categoryId)
    }
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>