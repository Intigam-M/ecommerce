import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api' : 'http://127.0.0.1:8000/api',
});

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll(config) {
    return axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data);
  }

  get(id) {
    return axiosInstance
      .get(this.endpoint + '/' + id)
      .then((res) => res.data);
  }

    create(data) {
        return axiosInstance
        .post(this.endpoint, data)
        .then((res) => res.data);
    }
    
}

export default APIClient;
