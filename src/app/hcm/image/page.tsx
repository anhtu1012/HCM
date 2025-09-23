/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Dither from "@/components/BG/Dither";
import DomeGallery from "@/components/DomeGallery/DomeGallery";
import {
  DownOutlined,
  SendOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography, message } from "antd";
import Image from "next/image";
import React from "react";
import "./styles.scss";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function Page() {
  const [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("second-section");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const onFinish = async (values: any) => {
    try {
      console.log("Form values:", values);
      message.success("Câu hỏi của bạn đã được gửi thành công!");
      form.resetFields();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.log("Error submitting form:", error);

      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <>
      {/* First Section - Gallery with Scroll Button */}
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
        <section
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <DomeGallery />

          {/* Scroll Down Button */}
          <div className="scroll-button-container">
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<DownOutlined />}
              onClick={scrollToNextSection}
              className="scroll-down-btn"
            />
            {/* <div className="scroll-text">Khám phá thêm</div> */}
          </div>
        </section>
      </div>

      {/* Second Section */}
      <div
        id="second-section"
        className="second-section"
        style={{ width: "100%", height: "100vh", position: "relative" }}
      >
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
        <section
          className="content-section"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            padding: "5px 20px",
            overflow: "auto",
          }}
        >
          <div className="container">
            <Row gutter={[40, 40]} align="middle">
              {/* Image Gallery Column */}
              <Col xs={24} lg={14}>
                <div className="image-gallery">
                  <div className="main-image-container">
                    <Image
                      src="/assets/image/bacho.jpg"
                      alt="Chủ tịch Hồ Chí Minh"
                      width={600}
                      height={400}
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "20px",
                      }}
                      className="main-image"
                    />
                    <div className="image-overlay">
                      <Title level={3} style={{ color: "white", margin: 0 }}>
                        Chủ tịch Hồ Chí Minh (1890-1969)
                      </Title>
                      <Paragraph
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          margin: "10px 0 0 0",
                        }}
                      >
                        Vị lãnh tụ vĩ đại của dân tộc Việt Nam
                      </Paragraph>
                    </div>
                  </div>

                  <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                    <Col xs={8}>
                      <div className="sub-image">
                        <Image
                          src="/assets/image/lanto.jpg"
                          alt="Lãnh tụ"
                          width={200}
                          height={150}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "15px",
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="sub-image">
                        <Image
                          src="/assets/image/tangcao.jpg"
                          alt="Tầng cao"
                          width={200}
                          height={150}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "15px",
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="sub-image">
                        <Image
                          src="/assets/image/vanhoa.jpg"
                          alt="Văn hóa"
                          width={200}
                          height={150}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "15px",
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Question Form Column */}
              <Col xs={24} lg={10}>
                <Card className="question-form-card">
                  {isSuccess && (
                    <div
                      className="success-overlay"
                      style={{ zIndex: "10000" }}
                    >
                      <div className="success-content">
                        <CheckCircleFilled className="success-icon" />
                        <div className="success-text">Đã gửi thành công!</div>
                      </div>
                    </div>
                  )}
                  <div className="form-header">
                    <Title level={3} className="form-title">
                      Đặt Câu Hỏi
                    </Title>
                    <Paragraph className="form-description">
                      Hãy đặt câu hỏi về cuộc đời và sự nghiệp của Chủ tịch Hồ
                      Chí Minh
                    </Paragraph>
                  </div>

                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="question-form"
                  >
                    <Form.Item
                      name="groupName"
                      label="Tên nhóm"
                      rules={[
                        { required: true, message: "Vui lòng nhập tên nhóm!" },
                        {
                          min: 2,
                          message: "Tên nhóm phải có ít nhất 2 ký tự!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập tên nhóm của bạn"
                        size="large"
                        className="form-input"
                      />
                    </Form.Item>

                    <Form.Item
                      name="category"
                      label="Chủ đề câu hỏi"
                      rules={[
                        { required: true, message: "Vui lòng nhập chủ đề!" },
                      ]}
                    >
                      <Input
                        placeholder="VD: Cuộc đời, Tư tưởng, Sự nghiệp..."
                        size="large"
                        className="form-input"
                      />
                    </Form.Item>

                    <Form.Item
                      name="question"
                      label="Câu hỏi của bạn"
                      rules={[
                        { required: true, message: "Vui lòng nhập câu hỏi!" },
                        {
                          min: 10,
                          message: "Câu hỏi phải có ít nhất 10 ký tự!",
                        },
                      ]}
                    >
                      <TextArea
                        rows={4}
                        placeholder="Đặt câu hỏi chi tiết về Chủ tịch Hồ Chí Minh..."
                        className="form-textarea"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        icon={<SendOutlined />}
                        className="submit-btn"
                        block
                      >
                        Gửi Câu Hỏi
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    </>
  );
}

export default Page;
