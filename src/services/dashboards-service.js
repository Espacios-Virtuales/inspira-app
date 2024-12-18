import http from "../http-common";
import authHeader from '@/services/auth-header';


class DashboardsService {
  
    productCount() {
        return http.get('/dashboard/products/count', { headers: authHeader() });
    }
  
    ingredientsCount() {
        return http.get('/dashboard/ingredients/count', { headers: authHeader() });
    }

    salesDayCount() {
        return http.get('/dashboard/sales-day/count', { headers: authHeader() });
    }
}
export default new DashboardsService();