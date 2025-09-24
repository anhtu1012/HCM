"use client";

import { Role } from "@/dtos/auth/auth.dto";
import { clearAuthData, setAuthData } from "@/lib/store/slices/loginSlice";
import AuthServices from "@/services/auth/api.service";
import "@/styles/clerk-buttons.scss";
import { setCookie } from "@/utils/client/getCookie";
import { MenuOutlined } from "@ant-design/icons";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/nextjs";
import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthButtons from "../auth/AuthButtons";
import "./index.scss";

const { Header } = Layout;

interface HeaderProps {
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

const HeaderComponent: React.FC<HeaderProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const dispatch = useDispatch();
  const fetchUserMe = useCallback(async () => {
    try {
      const res = await AuthServices.getUser();
      dispatch(clearAuthData());
      dispatch(setAuthData(res.data));
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }, [dispatch]);
  useEffect(() => {
    if (isSignedIn) {
      fetchUserMe();
    }
  }, [isSignedIn, fetchUserMe]);
  const menuItems = [
    { key: "about", label: <a href="#about">Tư tưởng Hồ Chí Minh</a> },
    { key: "timeline", label: <a href="#timeline">Dòng thời gian</a> },
    {
      key: "services",
      label: <a href="#services">So sánh & Giá trị thời đại</a>,
    },
    { key: "image", label: <a href="/hcm/image">Kho ảnh</a> },
    { key: "game", label: <a href="/hcm/game">Trò chơi</a> },
  ];

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuVisible(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Force light mode on component mount
  useEffect(() => {
    // Remove dark mode class if it exists
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    // Set light mode class if needed
    document.documentElement.classList.add("light");
    document.body.classList.add("light");

    // If using localStorage to track theme preference, update it
    localStorage.setItem("theme", "light");
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };
  const { getToken } = useAuth();

  const fetchUserData = useCallback(async () => {
    try {
      const clerkToken = await getToken({ template: "default" });
      setCookie("token", clerkToken, 9999);
    } catch (error) {
      console.error("Error fetching token and claims:", error);
    }
  }, [getToken]);

  useEffect(() => {
    if (isSignedIn) {
      fetchUserData();
    }
  }, [isSignedIn, fetchUserData]);

  return (
    <Header className={`site-header main-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-content">
        <div className="logo-container">
          <Link href="/">
            <Image
              src="/assets/image/logo.png"
              alt="Pathway Logo"
              width={70}
              height={70}
              priority
            />
          </Link>
        </div>

        <div className="desktop-menu">
          <Menu mode="horizontal" className="main-menu" items={menuItems} />
        </div>

        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleMobileMenu}
        />

        <div className="header-right">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-10 w-10",
                  userButtonTrigger: "cursor-pointer focus:shadow-none",
                },
              }}
              userProfileUrl="/profile"
              userProfileMode="navigation"
              showName={false}
            />
          </SignedIn>

          <SignedOut>
            <AuthButtons signUpRole={Role.Customer} />
          </SignedOut>
        </div>
      </div>

      {mobileMenuVisible && (
        <div className="mobile-menu">
          <Menu mode="vertical" items={menuItems} />
        </div>
      )}
    </Header>
  );
};

export default HeaderComponent;
