import {
  apiHelper
} from './../utils/helpers';

const getToken = () => localStorage.getItem('token');

export default {
  getTopUsers() {
    return apiHelper.get('/users/top', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  addFavorite({
    restaurantId
  }) {
    // POST 需加入 data 內容，若為空，則設為 null
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  deleteFavorite({
    restaurantId
  }) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  addLike({
    restaurantId
  }) {
    // POST 需加入 data 內容，若為空，則設為 null
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  deleteLike({
    restaurantId
  }) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  addFollowing({
    userId
  }) {
    return apiHelper.post(`/following/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  deleteFollowing({
    userId
  }) {
    return apiHelper.delete(`/following/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}