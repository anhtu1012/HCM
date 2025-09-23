"use client";

import UserInfo from "@/app/(customer)/profile/UserInfo";
import WalletTopupModal from "@/components/WalletTopupModalProps/WalletTopupModal";
import DepositServices from "@/services/profile/deposit.service";
import {
  CreditCardOutlined,
  HistoryOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Card, Col, Row, Tabs, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import BookingHistory from "./BookingHistory";
import "./profile.scss";
import WalletSection from "./WalletSection";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const t = useTranslations();
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("1");
  const [balance, setBalance] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalCancel = () => setIsModalVisible(false);

  const handleTopUp = async (value: number) => {
    setIsModalVisible(false);
    const data = {
      amount: value,
      gateway: "zalopay",
      returnUrl: "http://localhost:3000/thanh-toan-thanh-cong",
    };
    const res = await DepositServices.deposit(data);
    if (res) {
      setBalance((prevBalance) => prevBalance + value);
      window.location.href = res.data.paymentUrl;
    } else {
      console.error("Deposit failed");
    }
  };

  const tabItems = useMemo(
    () => [
      {
        key: "1",
        label: (
          <span>
            <UserOutlined /> {t("ProfilePage.tabs.info")}
          </span>
        ),
        children: user ? <UserInfo user={user} /> : null,
      },
      {
        key: "2",
        label: (
          <span>
            <HistoryOutlined /> {t("ProfilePage.tabs.history")}
          </span>
        ),
        children: <BookingHistory />,
      },
      {
        key: "3",
        label: (
          <span>
            <WalletOutlined /> {t("ProfilePage.tabs.wallet")}
          </span>
        ),
        children: <WalletSection />,
      },
    ],
    [user, balance, t]
  );

  if (!isLoaded) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner" />
        <Text>{t("ProfilePage.loading")}</Text>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="profile-error-card">
        <Title level={3}>{t("ProfilePage.notLoggedIn.title")}</Title>
        <Button type="primary" href="/sign-in">
          {t("ProfilePage.notLoggedIn.loginButton")}
        </Button>
      </Card>
    );
  }

  return (
    <div className="profile-container">
      <Title className="profile-title">{t("ProfilePage.title")}</Title>

      <Row gutter={[24, 24]} className="profile-header">
        <Col xs={24} md={6} className="profile-avatar-section">
          <Avatar
            size={120}
            src={user.imageUrl}
            icon={!user.imageUrl && <UserOutlined />}
          />
          <div className="profile-name-info">
            <Title level={3}>{user.fullName}</Title>
            <Text type="secondary">
              {user.primaryEmailAddress?.emailAddress}
            </Text>
          </div>
          <div className="profile-balance">
            <WalletOutlined className="balance-icon" />
            <div className="balance-info">
              <Text type="secondary">
                {t("ProfilePage.wallet.balanceLabel")}
              </Text>
              <Text strong className="balance-amount">
                0đ
                {/* {userData?.data.balance.toLocaleString()}đ */}
              </Text>
            </div>
          </div>
          <Button
            type="primary"
            icon={<CreditCardOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="topup-button"
          >
            {t("ProfilePage.wallet.topUp")}
          </Button>
        </Col>

        <Col xs={24} md={18}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="profile-tabs"
            items={tabItems}
          />
        </Col>
      </Row>

      <WalletTopupModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onTopUp={handleTopUp}
      />
    </div>
  );
}
