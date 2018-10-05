import { Module } from "vuex";

export const snackbar: Module<any, any> = {
  state: {
    message: "",
    color: "primary",
    position: "top",
    timeout: 1000,
    show: false
  },
  mutations: {
    setMessage: (state: any, message: string) => (state.message = message),
    setColor: (state: any, color: string) => (state.color = color),
    setPosition: (state: any, position: string) => (state.position = position),
    setTimeout: (state: any, timeout: number) => (state.timeout = timeout),
    setShow: (state: any, show: boolean) => (state.show = show),
    showSnackbar: (state: any, params: ISnackbarArgs) => {
      state.message = params.message;
      state.color = params.color;
      state.position = params.position;
      state.timeout = params.timeout;
      state.show = true;
    }
  },
  getters: {
    timeout(state: any) {
      return Number(state.timeout);
    },
    color: (state: any) => state.color,
    message: (state: any) => state.message,
    position: (state: any) => state.position,
    show: (state: any) => state.show
  }
};

export interface ISnackbarArgs {
  message: string;
  color: string;
  position: "top" | "bottom";
  timeout: number;
}

export default snackbar;
