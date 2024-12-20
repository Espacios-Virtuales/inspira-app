import AuthService from "../../services/auth-service";
import { AUTH } from "../types.js";

const user = JSON.parse(localStorage.getItem("user"));
const tokenExpired = user?.tokenExpiration
  ? Date.now() > new Date(user.tokenExpiration).getTime()
  : true;

const initialState =
  user && !tokenExpired
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      try {
        const response = await AuthService.login(user);
        commit(AUTH.LOGIN_SUCCESS, response);
        return response;
      } catch (error) {
        commit(AUTH.AUTH_ERROR, error);
        throw error;
      }
    },
    logout({ commit }) {
      AuthService.logout();
      commit(AUTH.LOGOUT);
    },
    async register({ commit }, user) {
      try {
        const response = await AuthService.register(user);
        commit(AUTH.REGISTER_SUCCESS);
        return response;
      } catch (error) {
        commit(AUTH.AUTH_ERROR, error);
        throw error;
      }
    },
    async refreshToken({ commit }) {
      try {
        const response = await AuthService.refreshToken();
        commit(AUTH.LOGIN_SUCCESS, response);
      } catch (error) {
        commit(AUTH.AUTH_ERROR, error);
        throw error;
      }
    }    
  },
  getters: {
    isAuthenticated: (state) => state.status.loggedIn,
    getUser: (state) => state.user,

    getAuthError: (state) => state.error,
    isTokenValid: (state) => {
      const tokenExpiration = state.user?.tokenExpiration;
      return tokenExpiration
        ? Date.now() < new Date(tokenExpiration).getTime()
        : false;
    },
    userRoles(state) {
      return state.user?.user?.authorities || [];
    },
    isAdmin(state, getters) {
      return getters.userRoles.includes("ROLE_ADMIN");
    },
    isUser(state, getters) {
      return getters.userRoles.includes("ROLE_USER");
    },
    hasPermission: (state, getters) => (permission) => {
      return getters.userRoles.some((role) =>
        role.permissions.includes(permission)
      );
    },
  },
  mutations: {
    [AUTH.LOGIN_SUCCESS](state, user) {
      state.status.loggedIn = true;
      state.user = user;
      state.error = null;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          tokenExpiration: Date.now() + 60 * 60 * 1000, // 1 hora
        })
      );
    },
    [AUTH.AUTH_ERROR](state, error) {
      state.status.loggedIn = false;
      state.user = null;
      state.error = error;
    },
    [AUTH.LOGOUT](state) {
      state.status.loggedIn = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    [AUTH.REGISTER_SUCCESS](state) {
      state.status.loggedIn = false;
      state.error = null;
    },
  },
  watch: {
    isTokenValid(isValid) {
      if (!isValid) {
        this.$store.dispatch("auth/logout");
      }
    },
  },
};
