/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  message,
} from "antd";
import Image from "next/image";
import AOS from "aos";
import { useTranslations } from "next-intl";
// import "./BookingReviewSection.scss"; // Ensure this SCSS file exists if uncommented

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const BookingReviewSection = () => {
  const t = useTranslations("BookingReviewSection");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log("Form submitted:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success(t("toast.submitSuccess"));
      form.resetFields();
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      message.error(t("toast.submitError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking-section">
      <div className="section-content">
        <div className="booking-logo" data-aos="fade-up" data-aos-delay="100">
          <Image
            src="/assets/image/logo.png"
            alt={t("logoAlt")}
            width={150}
            height={60}
          />
        </div>
        <Title
          level={2}
          className="section-title"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {t("title")}
        </Title>
        <Paragraph
          className="booking-description"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {t("description")}
        </Paragraph>

        <div className="booking-form" data-aos="fade-up" data-aos-delay="400">
          {submitted ? (
            <div className="success-message" data-aos="fade-in">
              <Title level={4}>{t("successMessage.title")}</Title>
              <Paragraph>
                {t("successMessage.paragraph")}
              </Paragraph>
              <Button type="primary" onClick={() => setSubmitted(false)}>
                {t("successMessage.button")}
              </Button>
            </div>
          ) : (
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <div className="form-row">
                <Form.Item
                  name="fullName"
                  rules={[
                    { required: true, message: t("form.validation.fullNameRequired") },
                  ]}
                >
                  <Input className="form-input" placeholder={t("form.placeholders.fullName")} />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: t("form.validation.emailRequired") },
                    { type: "email", message: t("form.validation.emailInvalid") },
                  ]}
                >
                  <Input className="form-input" placeholder={t("form.placeholders.email")} />
                </Form.Item>
              </div>
              <div className="form-row">
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: t("form.validation.phoneRequired") },
                  ]}
                >
                  <Input className="form-input" placeholder={t("form.placeholders.phone")} />
                </Form.Item>
                <Form.Item
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: t("form.validation.positionRequired"),
                    },
                  ]}
                >
                  <Input className="form-input" placeholder={t("form.placeholders.position")} />
                </Form.Item>
              </div>
              <Form.Item
                name="description"
                rules={[{ required: true, message: t("form.validation.descriptionRequired") }]}
              >
                <TextArea
                  className="form-input ant-input-textarea"
                  placeholder={t("form.placeholders.description")}
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-btn"
                  loading={loading}
                >
                  {loading ? t("form.submittingButton") : t("form.submitButton")}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </section>
  );
};

export default BookingReviewSection;