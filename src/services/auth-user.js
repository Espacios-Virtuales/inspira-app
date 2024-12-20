import http from "@/utils/http-common";
import authHeader from "@/services/auth-header";

class UserService {
  getPublicContent() {
    return http.get("/content/public");
  }

  getUserBoard() {
    return http.get("/content/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return http.get("/content/moderator", { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get("/content/admin", { headers: authHeader() });
  }
}

export default new UserService();
