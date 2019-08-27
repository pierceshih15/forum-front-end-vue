import {
  apiHelper
} from './../utils/helpers';

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  get({
    userId
  }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  addFavorite({
    restaurantId
  }) {
    // POST 需加入 data 內容，若為空，則設為 null
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },
  deleteFavorite({
    restaurantId
  }) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  addLike({
    restaurantId
  }) {
    // POST 需加入 data 內容，若為空，則設為 null
    return apiHelper.post(`/like/${restaurantId}`, null)
  },
  deleteLike({
    restaurantId
  }) {
    return apiHelper.delete(`/like/${restaurantId}`)
  },
  addFollowing({
    userId
  }) {
    return apiHelper.post(`/following/${userId}`, null)
  },
  deleteFollowing({
    userId
  }) {
    return apiHelper.delete(`/following/${userId}`)
  }
}