import http from "../utils/http-common";

class AuthService {
  async login(credentials) {
    try {
      const response = await http.post("/login", credentials); // <-- 🔥 Aquí está el error que salta
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
    return http.post("/user/register", user);
  }
}

export default new AuthService();
