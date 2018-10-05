import { Module } from "vuex";

export const me: Module<any, any> = {
  state: {
    name: "",
    email: "",
    lastUpdated: undefined
  },
  mutations: {
    setMe(state: any, params: IMe) {
      state.email = params.email;
      state.name = params.name;
      state.lastUpdated = params.lastUpdated || new Date();
    }
  },
  getters: {
    me(state: any): IMe {
      return {
        name: state.name,
        email: state.email,
        lastUpdated: state.lastUpdated
      };
    }
  }
};

export interface IMe {
  name: string;
  email: string;
  lastUpdated?: Date;
}

export default me;
