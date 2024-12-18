import http from "../http-common";

class AuthService {
   login(user) {
      return http
         .post('/login', {
            email: user.email,
            password: user.password
         })
         .then(response => {
         if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
         }
         console.log(response.data)
         return response.data;
         });
   }
   logout() {
      localStorage.removeItem('user');
   }
   register(user) {
      return http.post('/users', {
         username: user.username,
         email: user.email,
         password: user.password
      });
   }
}
export default new AuthService();