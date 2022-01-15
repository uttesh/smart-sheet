export const BASE_API_URL = "http://localhost:3000";
export const API = {
  DEVICE: {
    ADD: (name: string) => {
      return `${BASE_API_URL}/devices/${name}/data`;
    },
    EDIT: "",
    DELETE: "",
    ALL: `${BASE_API_URL}/devices/`
  }
};
