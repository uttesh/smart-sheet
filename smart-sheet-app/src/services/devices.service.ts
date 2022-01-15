import { Device } from "./device.model";
export const requestOptions = <T>(request: T) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  };
};

export const addDevice = <Device>(device: Device) => {
  fetch("https://jsonplaceholder.typicode.com/users", requestOptions(device))
    .then((res) => res.json())
    .then((json) => {
      console.log("::::::json::::::", json);
    });
};

export const fetchAllDevices = <Device>(device: Device) => {
  fetch("https://jsonplaceholder.typicode.com/users", requestOptions(device))
    .then((res) => res.json())
    .then((json) => {
      console.log("::::::json::::::", json);
    });
};
