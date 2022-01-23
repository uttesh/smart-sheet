export const BASE_API_URL = "http://localhost:3000";
export const API = {
  DEVICE: {
    ADD: `${BASE_API_URL}/devices`,
    ADD_DATA: (name: string) => {
      return `${BASE_API_URL}/devices/${name}/data`;
    },
    EDIT: "",
    DELETE: (id: string) => {
      return `${BASE_API_URL}/devices/${id}`;
    },
    ALL: `${BASE_API_URL}/devices/`,
    FIND_BY_ID: (id: string) => {
      return `${BASE_API_URL}/devices/${id}`;
    }
  }
};

export const MESSAGES = {
  DELETE_DEVICE_CONFIRMATION:
    "Please confirm to delete device and its related data?"
};

export const ACTION = {
  EDIT: "edit",
  ADD: "add"
};
