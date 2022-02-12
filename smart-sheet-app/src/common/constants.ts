export const BASE_API_URL = "http://localhost/api";
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
    },
    FETCH_DEVICE_DATA_BY_ID: (id: string) => {
      return `${BASE_API_URL}/devices/data/${id}`;
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

export const APP_CONFIG = {
  REFRESH_INTERVAL: 30
};
