"use client";

import { Layout } from "antd";
import React from "react";
import "./index.scss";

interface AdminLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return <Layout style={{ minHeight: "100vh" }}>{children}</Layout>;
};

export default AdminLayout;
