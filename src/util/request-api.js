import { useAuthStore } from "../store/auth";
import axios from "axios";
export const request = async (url, method = "GET", data = {}) => {
  const { token } = useAuthStore();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token,
  };
  let response = null;
  try {
    switch (method) {
      case "POST":
        response = await axios.post(url, data, { headers });
        break;
      case "PUT":
        response = await axios.put(url, data, { headers });
        break;
      case "DELETE":
        response = await axios.delete(url, { headers });
        break;
      default:
        response = await axios.get(url, { headers });
    }
    return { data: response.data };
  } catch (e) {
    if (e.response?.status === 401) {
      location.href = "/auth/signin";
    }
    if (e.response?.status === 422) {
      console.log(e);
    }

    return { error: e.response.data.error };
  }
};
