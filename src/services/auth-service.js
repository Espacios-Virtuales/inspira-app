import http from "../utils/http-common";

class AuthService {
  async login(credentials) {
    try {
      const response = await http.post("/auth/login", credentials);
      if (response.data?.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Error during login:", error.response?.data);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(user) {
    return http.post("/auth/register", user);
  }
}

export default new AuthService();
