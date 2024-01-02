import axios from 'axios'

const apiUrl = 'https://jsonplaceholder.typicode.com'

export default {
  getUsers: async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserPost: async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};




