/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  Row,
  Col,
  Typography,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";


const { Title } = Typography;

interface UserInfoProps {
  user: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const  t  = useTranslations();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    if (!isEditing) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        phone: user.phoneNumbers?.[0]?.phoneNumber || "",
        address: user.unsafeMetadata?.address || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = (values: any) => {
    console.log("Updated user info:", values);
    message.success(t("UserInfo.success"));
    setIsEditing(false);
  };

  return (
    <div className="user-info-section">
      <div className="section-header">
        <Title level={4}>{t("UserInfo.title")}</Title>
        <Button
          type={isEditing ? "primary" : "default"}
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
          onClick={toggleEdit}
        >
          {isEditing ? t("UserInfo.save") : t("UserInfo.edit")}
        </Button>
      </div>

      <Divider />

      {isEditing ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="edit-form"
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label={t("UserInfo.fullName")}
                rules={[{ required: true, message: t("UserInfo.requiredFullName") }]}
              >
                <Input prefix={<UserOutlined />} placeholder={t("UserInfo.fullName")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label={t("UserInfo.email")}
                rules={[
                  { required: true, message: t("UserInfo.requiredEmail") },
                  { type: "email", message: t("UserInfo.invalidEmail") },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder={t("UserInfo.email")} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label={t("UserInfo.phone")}
                rules={[{ required: true, message: t("UserInfo.requiredPhone") }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder={t("UserInfo.phone")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="address" label={t("UserInfo.address")}>
                <Input placeholder={t("UserInfo.address")} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("UserInfo.submit")}
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => setIsEditing(false)}
            >
              {t("UserInfo.cancel")}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="user-info-display">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div className="info-item">
                <span className="info-label">{t("UserInfo.fullName")}: </span>
                <span className="info-value">{user.fullName}</span>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="info-item">
                <span className="info-label">{t("UserInfo.email")}: </span>
                <span className="info-value">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="info-item">
                <span className="info-label">{t("UserInfo.phone")}: </span>
                <span className="info-value">
                  {user.phoneNumbers?.[0]?.phoneNumber || t("UserInfo.notUpdated")}
                </span>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="info-item">
                <span className="info-label">{t("UserInfo.address")}: </span>
                <span className="info-value">
                  {user.unsafeMetadata?.address || t("UserInfo.notUpdated")}
                </span>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
