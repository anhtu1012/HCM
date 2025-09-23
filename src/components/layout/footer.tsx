/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  EnvironmentOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  message,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./index.scss";
import { useTranslations } from "next-intl"; // Đảm bảo import

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const FooterComponent: React.FC = () => {
  const t = useTranslations("Footer"); // Sử dụng namespace "Footer"
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    message.success(t("newsletter.submitSuccess"));
    form.resetFields();
  };

  const currentYear = new Date().getFullYear();

  return (
    <Footer className="site-footer pathway-footer">
      <div className="footer-main">
        <div className="container">
          <Row gutter={[48, 32]}>
            <Col xs={24} md={8} lg={7}>
              <div className="footer-about">
                <div className="footer-logo">
                  <Image
                    src="/assets/image/logo.png"
                    alt={t("logoAlt")}
                    width={200}
                    height={80}
                  />
                </div>
                <Paragraph className="about-text">
                  {t("aboutText")}
                </Paragraph>
                <div className="social-links">
                  <a
                    href="https://facebook.com" // Cập nhật link thật
                    aria-label={t("socialLabels.facebook")}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookOutlined />
                  </a>
                  <a
                    href="https://linkedin.com" // Cập nhật link thật
                    aria-label={t("socialLabels.linkedin")}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinOutlined />
                  </a>
                  <a
                    href="https://twitter.com" // Cập nhật link thật
                    aria-label={t("socialLabels.twitter")}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterOutlined />
                  </a>
                  <a
                    href="https://youtube.com" // Cập nhật link thật
                    aria-label={t("socialLabels.youtube")}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YoutubeOutlined />
                  </a>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} md={8} lg={5}>
              <div className="footer-links">
                <Title level={4}>{t("linksServicesTitle")}</Title>
                <ul>
                  <li>
                    <Link href="/dich_vu#cv-review">{t("serviceLinks.cvReview")}</Link>
                  </li>
                  <li>
                    <Link href="/dich_vu#interview">{t("serviceLinks.interviewCoaching")}</Link>
                  </li>
                  <li>
                    <Link href="/dich_vu#career">{t("serviceLinks.careerConsulting")}</Link>
                  </li>
                  <li>
                    <Link href="/dich_vu#linkedin">{t("serviceLinks.linkedinOptimization")}</Link>
                  </li>
                  <li>
                    <Link href="/dich_vu#training">{t("serviceLinks.softSkillsTraining")}</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={24} sm={12} md={8} lg={5}>
              <div className="footer-links">
                <Title level={4}>{t("linksInformationTitle")}</Title>
                <ul>
                  <li>
                    <Link href="/gioi_thieu">{t("informationLinks.aboutUs")}</Link>
                  </li>
                  <li>
                    <Link href="/lien_he">{t("informationLinks.contact")}</Link>
                  </li>
                  <li>
                    <Link href="/blog">{t("informationLinks.blog")}</Link> {/* Sửa lại link nếu cần */}
                  </li>
                  <li>
                    <Link href="/faq">{t("informationLinks.faq")}</Link>
                  </li>
                  <li>
                    <Link href="/chinh-sach-bao-mat">{t("informationLinks.privacyPolicy")}</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={24} lg={7}>
              <div className="footer-contact">
                <Title level={4}>{t("contactInfoTitle")}</Title>
                <div className="contact-info">
                  <div className="info-item">
                    <EnvironmentOutlined className="info-icon" />
                    <div>
                      <Text strong>{t("contactDetails.mainOfficeLabel")}</Text>
                      <Paragraph><a>{t("contactDetails.mainOfficeAddress")}</a></Paragraph>
                    </div>
                  </div>

                  <div className="info-item">
                    <PhoneOutlined className="info-icon" />
                    <div>
                      <Text strong>{t("contactDetails.hotlineLabel")}</Text>
                      <Paragraph>
                        <a href={`tel:${t("contactDetails.hotlineNumber")}`}>{t("contactDetails.hotlineNumber")}</a>
                      </Paragraph>
                    </div>
                  </div>

                  <div className="info-item">
                    <MailOutlined className="info-icon" />
                    <div>
                      <Text strong>{t("contactDetails.emailLabel")}</Text>
                      <Paragraph>
                        <a href={`mailto:${t("contactDetails.emailAddress")}`}>
                          {t("contactDetails.emailAddress")}
                        </a>
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="footer-newsletter">
        <div className="container">
          <Row align="middle" justify="space-between">
            <Col xs={24} md={12}>
              <Title level={4} className="newsletter-title">
                {t("newsletter.title")}
              </Title>
              <Paragraph className="newsletter-desc">
                {t("newsletter.description")}
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <Form
                form={form}
                onFinish={handleSubmit}
                layout="inline"
                className="newsletter-form"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: t("newsletter.validation.emailRequired") },
                    { type: "email", message: t("newsletter.validation.emailInvalid") },
                  ]}
                  className="newsletter-input-wrap"
                >
                  <Input
                    placeholder={t("newsletter.emailPlaceholder")}
                    className="newsletter-input"
                  />
                </Form.Item>
                <Form.Item className="newsletter-button-wrap">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="newsletter-button"
                    icon={<SendOutlined />}
                  >
                    {t("newsletter.subscribeButton")}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <Row align="middle" justify="space-between">
            <Col xs={24} md={12}>
              <div className="copyright">
                {t("bottom.copyright", { currentYear: currentYear })}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="footer-bottom-links">
                <a href="/terms">{t("bottom.terms")}</a>
                <a href="/privacy">{t("bottom.privacy")}</a>
                <a href="/cookies">{t("bottom.cookies")}</a>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="footer-social-vertical">
        <a
          href="https://zalo.me" // Cập nhật link Zalo thật
          target="_blank"
          rel="noopener noreferrer"
          className="zalo-icon social-vertical"
          aria-label={t("socialLabels.zalo")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
            alt="Zalo" // Có thể dịch alt này nếu muốn
            width={22}
            height={22}
          />
        </a>
        <a
          href={`tel:${t("contactDetails.hotlineNumber")}`} // Sử dụng số hotline đã dịch
          className="phone-icon social-vertical"
          aria-label={t("socialLabels.callNow")}
        >
          <PhoneOutlined />
        </a>
        <a
          href="https://facebook.com" // Cập nhật link thật
          target="_blank"
          rel="noopener noreferrer"
          className="fb-icon social-vertical"
          aria-label={t("socialLabels.facebook")}
        >
          <FacebookOutlined />
        </a>
      </div>
    </Footer>
  );
};

export default FooterComponent;