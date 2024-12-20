import http from "../utils/http-common";
import authHeader from "@/services/auth-header";

class AnalyticsService {
  getProductCount() {
    return http.get("/analytics/products/count", { headers: authHeader() });
  }

  getAudienceCount() {
    return http.get("/analytics/audience/count", { headers: authHeader() });
  }

  getSalesDayCount() {
    return http.get("/analytics/sales/day/count", { headers: authHeader() });
  }
}

export default new AnalyticsService();
