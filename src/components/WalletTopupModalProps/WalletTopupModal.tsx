import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Space,
  InputNumber,
  Radio,
  Divider,
  Row,
  Col,
  message,
} from "antd";
import { CreditCardOutlined, BankOutlined } from "@ant-design/icons";
import "./WalletTopupModal.scss";

interface WalletTopupModalProps {
  visible: boolean;
  onCancel: () => void;
  onTopUp: (amount: number, paymentMethod: string) => void;
}

const quickAmounts = [
  { value: 100000, label: "100,000đ" },
  { value: 200000, label: "200,000đ" },
  { value: 500000, label: "500,000đ" },
  { value: 1000000, label: "1,000,000đ" },
];

const WalletTopupModal: React.FC<WalletTopupModalProps> = ({
  visible,
  onCancel,
  onTopUp,
}) => {
  const [topUpAmount, setTopUpAmount] = useState<number>(100000);
  const [paymentMethod, setPaymentMethod] = useState<string>("creditcard");

  const handleTopUp = () => {
    if (!topUpAmount || topUpAmount < 100000) {
      message.error("Vui lòng nhập số tiền tối thiểu 100.000đ");
      return;
    }

    onTopUp(topUpAmount, paymentMethod);
  };

  return (
    <Modal
      title="Nạp tiền vào tài khoản"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      className="wallet-topup-modal"
    >
      <Form layout="vertical" className="topup-form">
        <Form.Item label="Chọn số tiền:" className="quick-amount-section">
          <Space wrap className="quick-amount-buttons">
            {quickAmounts.map((amount) => (
              <Button
                key={amount.value}
                type={topUpAmount === amount.value ? "primary" : "default"}
                onClick={() => setTopUpAmount(amount.value)}
                className="amount-button"
              >
                {amount.label}
              </Button>
            ))}
          </Space>
        </Form.Item>

        <Form.Item label="Hoặc nhập số tiền:" className="custom-amount-section">
          <InputNumber
            style={{ width: "100%" }}
            min={100000}
            step={50000}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => Number(`${value}`.replace(/\$\s?|(,*)/g, ""))}
            value={topUpAmount}
            onChange={(value) => setTopUpAmount(value as number)}
            className="amount-input"
          />
        </Form.Item>

        <Form.Item
          label="Phương thức thanh toán:"
          className="payment-method-section"
        >
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="payment-methods"
          >
            <Space direction="vertical" className="payment-options">
              <Radio value="creditcard" className="payment-option">
                <Space>
                  <CreditCardOutlined className="payment-icon" /> Thẻ tín
                  dụng/Ghi nợ
                </Space>
              </Radio>
              <Radio value="bank" className="payment-option">
                <Space>
                  <BankOutlined className="payment-icon" /> Chuyển khoản ngân
                  hàng
                </Space>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Divider className="topup-divider" />

        <Form.Item className="action-buttons">
          <Row justify="end" gutter={16}>
            <Col>
              <Button onClick={onCancel} className="cancel-button">
                Hủy
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={handleTopUp}
                className="confirm-button"
              >
                Xác nhận nạp tiền
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WalletTopupModal;
