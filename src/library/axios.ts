import axios from "axios";
// import { useAuthStore } from "./store/authStore";

// const { token } = useAuthStore.getState();

const instance = axios.create({
  baseURL: "http://localhost:3005/api",
});

// instance.defaults.headers.common["Authorization"] = token
//   ? `Bearer ${token}`
//   : null;

instance.interceptors.response.use(
  (response) => response, // Pass the response through if it's successful
  (error) => {
    // Check if the error response is a 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error); // Continue to propagate the error
  }
);

export default instance;
