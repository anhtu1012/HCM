import { CheckCircleOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Modal, Tag, Typography, Result } from "antd";
import React, { useState } from "react";

const { Title, Text } = Typography;

// interface PlanInfo {
//   id: string;
//   price: number;
//   planKey: string;
//   color: string;
//   title: string;
// }

interface PaymentReceiptModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedPlan: {
    id: string;
    price: number;
    userBalance: number;
    remainingAmount: number;
    hasSufficientFunds: boolean;
    planKey: string;
    color: string;
  } | null;
  planTitle: string;
}

const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  selectedPlan,
  planTitle,
}) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    if (selectedPlan?.hasSufficientFunds) {
      setPaymentSuccess(true);
    }
  };

  const receiptStyles = {
    container: {
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      overflow: "hidden",
    },
    header: {
      borderBottom: "1px dashed #e8e8e8",
      padding: "16px 20px",
      background: "#fafafa",
    },
    body: {
      padding: "20px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px solid #f0f0f0",
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 0",
      marginTop: "8px",
      borderTop: "2px dashed #e8e8e8",
      borderBottom: "2px dashed #e8e8e8",
      background: "#fafafa",
      fontWeight: 600,
      fontSize: "16px",
    },
    footer: {
      textAlign: "center",
      padding: "16px",
      borderTop: "1px dashed #e8e8e8",
      marginTop: "20px",
      background: "#fafafa",
    },
    logo: {
      textAlign: "center",
      marginBottom: "16px",
    },
    watermark: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(-45deg)",
      color: "rgba(0,0,0,0.03)",
      fontSize: "120px",
      fontWeight: "bold",
      pointerEvents: "none",
      zIndex: 1,
      width: "100%",
      textAlign: "center",
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (!selectedPlan) return null;

  if (paymentSuccess) {
    return (
      <Modal
        open={isVisible}
        onCancel={() => {
          setPaymentSuccess(false);
          onClose();
        }}
        footer={null}
        width={480}
        bodyStyle={{ padding: 0 }}
      >
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle={`Chúc mừng bạn đã đăng ký thành công gói ${planTitle}`}
          style={{ padding: "30px 20px" }}
          icon={<CheckCircleOutlined style={{ color: selectedPlan.color }} />}
          extra={[
            <div
              key="details"
              style={{
                textAlign: "left",
                margin: "20px auto",
                maxWidth: "320px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Gói dịch vụ:</Text>
                <Text strong>{planTitle}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Thời hạn:</Text>
                <Text>1 tháng</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Giá trị:</Text>
                <Text strong>{formatCurrency(selectedPlan.price)}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Số dư còn lại:</Text>
                <Text>
                  {formatCurrency(
                    selectedPlan.userBalance - selectedPlan.price
                  )}
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Ngày kích hoạt:</Text>
                <Text>{new Date().toLocaleDateString("vi-VN")}</Text>
              </div>
            </div>,
            <Button
              type="primary"
              key="console"
              style={{
                backgroundColor: selectedPlan.color,
                borderColor: selectedPlan.color,
              }}
              onClick={() => {
                setPaymentSuccess(false);
                onClose();
              }}
            >
              Tiếp tục sử dụng
            </Button>,
          ]}
        />
      </Modal>
    );
  }

  return (
    <Modal
      title={null}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={480}
      className="payment-modal receipt-modal"
      bodyStyle={{ padding: 0 }}
    >
      <div style={receiptStyles.container}>
        {/* Receipt Watermark */}
        <div style={receiptStyles.watermark as React.CSSProperties}>
          {selectedPlan.hasSufficientFunds ? "THANH TOÁN" : "CHỜ THANH TOÁN"}
        </div>

        {/* Receipt Header */}
        <div style={receiptStyles.header}>
          <div style={receiptStyles.logo as React.CSSProperties}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: selectedPlan.color,
                color: "#fff",
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              {selectedPlan.planKey.substring(4)}
            </div>
            <Title
              level={4}
              style={{ margin: "8px 0 0", color: selectedPlan.color }}
            >
              HÓA ĐƠN THANH TOÁN
            </Title>
          </div>
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <Text type="secondary">
              Mã hóa đơn: INV-{Date.now().toString().substring(5, 13)}
            </Text>
          </div>
          <div style={{ textAlign: "center" }}>
            <Text type="secondary">
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </div>
        </div>

        {/* Receipt Body */}
        <div style={receiptStyles.body}>
          {/* Plan Details */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <Tag
                color={selectedPlan.color}
                style={{
                  padding: "6px 12px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {planTitle}
              </Tag>
            </div>

            {/* Item details */}
            <div style={receiptStyles.row}>
              <Text>Dịch vụ</Text>
              <Text style={{ fontWeight: 500 }}>{planTitle}</Text>
            </div>

            <div style={receiptStyles.row}>
              <Text>Thời hạn</Text>
              <Text>1 tháng</Text>
            </div>

            <div style={receiptStyles.row}>
              <Text>Số lượng</Text>
              <Text>1</Text>
            </div>

            <div style={receiptStyles.row}>
              <Text>Đơn giá</Text>
              <Text style={{ fontWeight: 500 }}>
                {formatCurrency(selectedPlan.price)}
              </Text>
            </div>

            {/* Total Calculation */}
            <div style={{ marginTop: "16px" }}>
              <div style={receiptStyles.row}>
                <Text>Tổng tiền</Text>
                <Text>{formatCurrency(selectedPlan.price)}</Text>
              </div>

              <div style={receiptStyles.row}>
                <Text>Số dư tài khoản</Text>
                <Text>{formatCurrency(selectedPlan.userBalance)}</Text>
              </div>

              <div style={receiptStyles.totalRow}>
                <Text strong>Số tiền cần thanh toán</Text>
                {selectedPlan.remainingAmount > 0 ? (
                  <Text strong style={{ color: "#f5222d" }}>
                    {formatCurrency(selectedPlan.remainingAmount)}
                  </Text>
                ) : (
                  <Text strong style={{ color: "#52c41a" }}>
                    {formatCurrency(0)}
                  </Text>
                )}
              </div>
            </div>
          </div>

          {/* Status message */}
          {selectedPlan.remainingAmount > 0 ? (
            <div
              style={{
                background: "#fff2e8",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <WalletOutlined style={{ color: "#fa8c16" }} />
              <Text style={{ color: "#d4380d" }}>
                Số dư tài khoản của bạn không đủ để thanh toán. Vui lòng nạp
                thêm
                <strong> {formatCurrency(selectedPlan.remainingAmount)}</strong>
                .
              </Text>
            </div>
          ) : (
            <div
              style={{
                background: "#f6ffed",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleOutlined style={{ color: "#52c41a" }} />
              <Text style={{ color: "#389e0d" }}>
                Bạn có đủ số dư để thanh toán. Vui lòng xác nhận để hoàn tất.
              </Text>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <Button style={{ flex: 1 }} onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button
              type="primary"
              style={{
                flex: 2,
                backgroundColor: selectedPlan.color,
                borderColor: selectedPlan.color,
              }}
              onClick={handleConfirm}
              icon={
                selectedPlan.hasSufficientFunds ? (
                  <CheckCircleOutlined />
                ) : (
                  <WalletOutlined />
                )
              }
            >
              {selectedPlan.hasSufficientFunds
                ? "Xác nhận thanh toán"
                : "Nạp tiền và thanh toán"}
            </Button>
          </div>
        </div>

        {/* Receipt Footer */}
        <div style={receiptStyles.footer as React.CSSProperties}>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "50px",
              background: "#f0f0f0",
              display: "inline-block",
            }}
          >
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
            </Text>
          </div>
          <div style={{ marginTop: "8px" }}>
            <Text type="secondary" style={{ fontSize: "11px" }}>
              Bằng cách xác nhận thanh toán, bạn đồng ý với{" "}
              <a href="#" style={{ color: selectedPlan.color }}>
                điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" style={{ color: selectedPlan.color }}>
                chính sách bảo mật
              </a>{" "}
              của chúng tôi.
            </Text>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentReceiptModal;
