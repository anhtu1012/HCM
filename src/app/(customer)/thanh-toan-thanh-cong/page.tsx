"use client";

import {
  CheckCircleFilled,
  HomeOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Divider, Result, Row, Typography } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./styles.scss";

const { Title, Text, Paragraph } = Typography;

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState({
    amount: 0,
    orderId: "",
    transactionId: "",
    paymentMethod: "",
    date: new Date().toLocaleString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you might want to verify the payment on the server side
    // and fetch the transaction details based on the query parameters

    const amount = searchParams?.get("amount") || "0";
    const orderId =
      searchParams?.get("orderId") || `ORD${Math.floor(Math.random() * 10000)}`;
    const transactionId =
      searchParams?.get("transactionId") ||
      `TXN${Math.floor(Math.random() * 100000)}`;
    const paymentMethod = searchParams?.get("gateway") || "ZaloPay";

    // Simulate loading transaction details
    setTimeout(() => {
      setTransactionDetails({
        amount: parseInt(amount, 10),
        orderId,
        transactionId,
        paymentMethod,
        date: new Date().toLocaleString("vi-VN"),
      });
      setIsLoading(false);
    }, 1000);

    // Confetti effect on successful payment
    const showConfetti = () => {
      import("canvas-confetti")
        .then((confetti) => {
          const myConfetti = confetti.default;

          myConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#1677ff", "#52c41a", "#fadb14"],
          });

          // Fire again after a delay for a more impressive effect
          setTimeout(() => {
            myConfetti({
              particleCount: 50,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
            });
          }, 250);

          setTimeout(() => {
            myConfetti({
              particleCount: 50,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
            });
          }, 400);
        })
        .catch((error) => console.error("Failed to load confetti:", error));
    };

    if (!isLoading) {
      showConfetti();
    }
  }, [searchParams, isLoading]);

  if (isLoading) {
    return (
      <div className="payment-success-loading">
        <div className="loading-spinner"></div>
        <Text>Đang xác nhận thanh toán...</Text>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <Card className="payment-success-card">
        <Result
          icon={<CheckCircleFilled className="success-icon" />}
          title="Thanh toán thành công!"
          subTitle="Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi"
          extra={[
            <Link href="/profile" key="profile">
              <Button type="primary" icon={<WalletOutlined />} size="large">
                Quay lại ví
              </Button>
            </Link>,
            <Link href="/" key="home">
              <Button icon={<HomeOutlined />} size="large">
                Trang chủ
              </Button>
            </Link>,
          ]}
        />

        <Divider />

        <div className="transaction-details">
          <Title level={4}>Chi tiết giao dịch</Title>

          <Row gutter={[16, 16]} className="details-row">
            <Col xs={24} md={12}>
              <div className="detail-item">
                <Text type="secondary">Mã giao dịch</Text>
                <Paragraph
                  copyable={{ text: transactionDetails.transactionId }}
                >
                  <Text strong>{transactionDetails.transactionId}</Text>
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="detail-item">
                <Text type="secondary">Số tiền</Text>
                <Text strong className="amount">
                  {transactionDetails.amount.toLocaleString()}đ
                </Text>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="detail-item">
                <Text type="secondary">Phương thức thanh toán</Text>
                <Text strong>{transactionDetails.paymentMethod}</Text>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="detail-item">
                <Text type="secondary">Thời gian</Text>
                <Text strong>{transactionDetails.date}</Text>
              </div>
            </Col>
          </Row>

          <div className="notice">
            <Text type="secondary" italic>
              * Thông tin giao dịch đã được ghi nhận vào hệ thống
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
