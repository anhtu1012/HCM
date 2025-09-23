"use client";

import { useAppSelector } from "@/lib/hooks";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Space, theme } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocaleSwitcher from "../changeLanguage";
import "./index.scss";
import { useRouter } from "next/navigation";
import { useBroadcastChannel } from "@/hook/useBroadcastChannel";
import { toggleDarkMode } from "@/utils/theme-utils";
import { selectAuthLogin } from "@/lib/store/slices/loginSlice";

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const { token } = theme.useToken();
  const router = useRouter();
  const { data } = useAppSelector(selectAuthLogin);
  const [mounted, setMounted] = useState(false);

  const { sendMessage } = useBroadcastChannel<{ action: string }>(
    "theme-channel"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = [
    {
      key: "1",
      label: <Link href="/profile">Thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: (
        <Button
          type="link"
          onClick={() => {
            toggleDarkMode();
            sendMessage({ action: "toggle-theme" });
          }}
        >
          Chuyển chế độ tối/sáng
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          type="link"
          onClick={() => {
            // Logout logic
            router.push("/login");
          }}
        >
          Đăng xuất
        </Button>
      ),
    },
  ];

  // Prevent SSR/Client mismatch by returning simplified header during server render
  if (!mounted) {
    return (
      <Header
        className="site-layout-header"
        style={{
          padding: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          height: "64px",
        }}
      />
    );
  }

  return (
    <Header
      className="site-layout-header"
      style={{
        padding: 0,
        background: token.colorBgContainer,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="toggle-btn"
        />
        <Link href="/" className="logo-container">
          <div className="logo">
            <svg viewBox="0 0 90 20" focusable="false" className="youtube-logo">
              <svg viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet">
                <g>
                  <path
                    d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                    fill="#FF0000"
                  ></path>
                  <path
                    d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
                    fill="white"
                  ></path>
                </g>
                <g id="youtube-paths">{/* ...existing code... */}</g>
              </svg>
            </svg>
          </div>
        </Link>
      </div>

      <div className="header-center">
        <div className="search-container">
          <input type="text" placeholder="Tìm kiếm" className="search-input" />
          <Button type="primary" className="search-button">
            <svg viewBox="0 0 24 24" focusable="false" className="search-icon">
              <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
            </svg>
          </Button>
        </div>
      </div>

      <div className="header-right">
        <Space>
          <LocaleSwitcher />
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar
              style={{ cursor: "pointer", backgroundColor: token.colorPrimary }}
            >
              {data?.account.lastName?.charAt(0) || "U"}{" "}
              {data?.account.firstName?.charAt(0) || "U"}
            </Avatar>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;
