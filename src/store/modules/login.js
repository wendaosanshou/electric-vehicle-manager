import { $apis } from "@/helper";

const Login = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    diapatchLogin({ commit }, data) {
      const result = $apis.login(data);
      console.log(result);
    }
  },
  getters: {}
};

export default Login;
