import API_ENDPOINT from '../global/api-endpoint';
import Notification from '../utils/notification';

class RestaurantSource {
  static async restaurant_list () {
    try {
      const response = await fetch(API_ENDPOINT.LIST_OF_RESTAURANT);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (e) {
      Notification.showNotification({
        title: 'Error',
        text: 'Gagal Memuat!, coba periksa koneksi internet anda',
        icon: 'error'
      });
    }
  }

  static async detail_restaurant (id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (e) {
      Notification.showNotification({
        title: 'Error',
        text: 'Gagal Memuat!, coba periksa koneksi internet anda',
        icon: 'error'
      });
    }
  }

  static async search_restaurant (query) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(query));
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (e) {
      Notification.showNotification({
        title: 'Error',
        text: 'Gagal Memuat!, coba periksa koneksi internet anda',
        icon: 'error'
      });
    }
  }

  static async add_review (review) {
    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (e) {
      Notification.showNotification({
        title: 'Error',
        text: 'Gagal Memuat!, coba periksa koneksi internet anda',
        icon: 'error'
      });
    }
  }
}

export default RestaurantSource;
