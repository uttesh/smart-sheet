import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../dashboard/Dashboard";
import { DevicesPage } from "../devices/Devices";
import { DeviceDetail } from "../devices/devices.details";
interface AppRoutesProps {}

export const AppRoutes: FC<AppRoutesProps> = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/devices/:deviceId" element={<DeviceDetail />}></Route>
        <Route path="/devices" element={<DevicesPage />}></Route>
        <Route path="/" element={<DashboardPage />}></Route>
      </Routes>
    </div>
  );
};
