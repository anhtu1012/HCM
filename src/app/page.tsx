"use client";

import CircularGallery from "@/components/CircularGallery/CircularGallery";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FireOutlined,
  FlagOutlined,
  GlobalOutlined,
  HeartOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Timeline, Typography } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import "./page.scss";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const t = useTranslations("HomePage");
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  const services = [
    {
      key: "service1",
      image: "/assets/image/lanto.jpg",
      delay: 0,
      icon: <FlagOutlined />,
    },
    {
      key: "service2",
      image: "/assets/image/tangcao.jpg",
      delay: 200,
      icon: <HeartOutlined />,
    },
    {
      key: "service3",
      image: "/assets/image/vanhoa.jpg",
      delay: 400,
      icon: <GlobalOutlined />,
    },
  ];
  return (
    <div className="home-page">
      <section className="hero-section" id="home">
        <div
          className="hero-background"
          style={{
            background:
              "url('/assets/image/banner3.jpg') center/cover no-repeat",
            height: "100vh",
          }}
        ></div>
        <div className="particles-container"></div>
      </section>

      <section className="introduction-section" id="about">
        <div className="section-content">
          <Title level={2} className="section-title" data-aos="fade-up">
            {t("introduction.title")}
          </Title>
          <Paragraph className="intro-text" data-aos="fade-up">
            <span
              dangerouslySetInnerHTML={{
                __html: t.raw("introduction.paragraph"),
              }}
            />
          </Paragraph>
          <div
            className="research-context"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="context-box">
              <Title level={4} className="context-title">
                {t("introduction.context_title")}
              </Title>
              <Paragraph className="context-text">
                {t("introduction.context_description")}
              </Paragraph>
              <div className="research-question">
                <Title level={4} className="question-title">
                  {t("introduction.question_title")}
                </Title>
                <Paragraph className="question-text">
                  {t("introduction.research_question")}
                </Paragraph>
              </div>
            </div>
          </div>
          {/* <Row gutter={[32, 32]} data-aos="fade-up">
            <Col xs={24} md={8}>
              <div
                className="intro-card"
                data-aos="flip-left"
                data-aos-delay="100"
              >
                <div className="intro-image">
                  <Image
                    src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800"
                    alt={t("introduction.card1_alt")}
                    width={800}
                    height={400}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="intro-content">
                  <Title level={3}>{t("introduction.card1_title")}</Title>
                  <Paragraph>{t("introduction.card1_description")}</Paragraph>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div
                className="intro-card"
                data-aos="flip-left"
                data-aos-delay="300"
              >
                <div className="intro-image">
                  <Image
                    src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800"
                    alt={t("introduction.card2_alt")}
                    width={800}
                    height={400}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="intro-content">
                  <Title level={3}>{t("introduction.card2_title")}</Title>
                  <Paragraph>{t("introduction.card2_description")}</Paragraph>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div
                className="intro-card"
                data-aos="flip-left"
                data-aos-delay="500"
              >
                <div className="intro-image">
                  <Image
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800"
                    alt={t("introduction.card3_alt")}
                    width={800}
                    height={400}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="intro-content">
                  <Title level={3}>{t("introduction.card3_title")}</Title>
                  <Paragraph>{t("introduction.card3_description")}</Paragraph>
                </div>
              </div>
            </Col>
          </Row> */}
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-container">
          <Title
            level={2}
            className="section-title center-title"
            data-aos="fade-up"
          >
            {t("hcmIdeologySection.title")}
          </Title>
          <div className="ideology-intro" data-aos="fade-up">
            <Paragraph className="ideology-description">
              {t("hcmIdeologySection.description")}
            </Paragraph>
          </div>
          <div className="mission-items" data-aos="fade-up">
            <div className="mission-item">
              <div className="mission-icon">
                <Image
                  src="/assets/image/lanto.jpg"
                  alt={t("hcmIdeologySection.item1_alt")}
                  width={120}
                  height={120}
                />
              </div>
              <div className="mission-content">
                <h4>{t("hcmIdeologySection.item1_title")}</h4>
                <p>{t("hcmIdeologySection.item1_text")}</p>
              </div>
            </div>

            <div className="mission-item">
              <div className="mission-icon">
                <Image
                  src="/assets/image/tangcao.jpg"
                  alt={t("hcmIdeologySection.item2_alt")}
                  width={120}
                  height={120}
                />
              </div>
              <div className="mission-content">
                <h4>{t("hcmIdeologySection.item2_title")}</h4>
                <p>{t("hcmIdeologySection.item2_text")}</p>
              </div>
            </div>

            <div className="mission-item">
              <div className="mission-icon">
                <Image
                  src="/assets/image/doanket.jpg"
                  alt={t("hcmIdeologySection.item3_alt")}
                  width={120}
                  height={120}
                />
              </div>
              <div className="mission-content">
                <h4>{t("hcmIdeologySection.item3_title")}</h4>
                <p>{t("hcmIdeologySection.item3_text")}</p>
              </div>
            </div>

            <div className="mission-item">
              <div className="mission-icon">
                <Image
                  src="/assets/image/vanhoa.jpg"
                  alt={t("hcmIdeologySection.item4_alt")}
                  width={120}
                  height={120}
                />
              </div>
              <div className="mission-content">
                <h4>{t("hcmIdeologySection.item4_title")}</h4>
                <p>{t("hcmIdeologySection.item4_text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section" id="timeline">
        <div className="section-content">
          <Title level={2} className="section-title" data-aos="fade-up">
            {t("timelineSection.title")}
          </Title>
          <Paragraph
            className="timeline-subtitle"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("timelineSection.subtitle")}
          </Paragraph>

          <div
            className="antd-timeline-container"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Timeline
              mode="alternate"
              items={[
                {
                  dot: <ClockCircleOutlined className="timeline-icon" />,
                  color: "#d32f2f",
                  children: (
                    <div className="timeline-card">
                      <div className="timeline-year">1862-1925</div>
                      <h3>{t("timelineSection.timeline1.title")}</h3>
                      <div className="patriots-list">
                        <div className="patriot-item">
                          <strong>Phan Bội Châu:</strong> Dựa vào ngoại bang,
                          bạo động vũ trang.
                        </div>
                        <div className="patriot-item">
                          <strong>Phan Châu Trinh:</strong> Cải cách, khai dân
                          trí, dựa vào Pháp.
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  dot: <FireOutlined className="timeline-icon" />,
                  color: "#ff9800",
                  children: (
                    <div className="timeline-card">
                      <div className="timeline-year">1911-1930</div>
                      <h3>{t("timelineSection.timeline2.title")}</h3>
                      <div className="journey-stages">
                        <div className="stage-item">
                          Tham gia cách mạng Pháp (1911)
                        </div>
                        <div className="stage-item">Du học Liên Xô (1923)</div>
                        <div className="stage-item">
                          Chọn con đường cách mạng vô sản
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  dot: <StarOutlined className="timeline-icon" />,
                  color: "#ffb300",
                  children: (
                    <div className="timeline-card">
                      <div className="timeline-year">1930</div>
                      <h3>{t("timelineSection.timeline3.title")}</h3>
                      <div className="timeline-highlight">
                        <strong>Điểm mới:</strong> Kết hợp giải phóng dân tộc
                        với giải phóng giai cấp.
                      </div>
                    </div>
                  ),
                },
                {
                  dot: <CheckCircleOutlined className="timeline-icon" />,
                  color: "#4caf50",
                  children: (
                    <div className="timeline-card">
                      <div className="timeline-year">1945</div>
                      <h3>{t("timelineSection.timeline4.title")}</h3>
                      <div className="resistance-victories">
                        <div className="victory-item">Tuyên ngôn Độc lập</div>
                        <div className="victory-item">
                          Thành lập nước Việt Nam Dân chủ Cộng hòa
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  dot: <StarFilled className="timeline-icon" />,
                  color: "#7c4dff",
                  children: (
                    <div className="timeline-card">
                      <div className="timeline-year">1945-1975 & Hiện đại</div>
                      <h3>{t("timelineSection.timeline5.title")}</h3>
                      <div className="modern-applications">
                        <div className="app-item">
                          Độc lập gắn với tự chủ, phát triển bền vững
                        </div>
                        <div className="app-item">
                          Hội nhập quốc tế, dân chủ xã hội chủ nghĩa
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="about-section" id="projects">
        <div className="section-content">
          <Title level={2} className="section-title" data-aos="fade-up">
            {t("whyChooseUs.title")}
          </Title>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12} data-aos="fade-right">
              <div className="about-image">
                <Image
                  src="/assets/image/bacho.jpg"
                  alt={t("whyChooseUs.image_alt")}
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Col>
            <Col xs={24} md={12} data-aos="fade-left">
              <div className="about-content">
                <Paragraph className="about-text">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t.raw("whyChooseUs.paragraph1"),
                    }}
                  />
                </Paragraph>
                <Paragraph className="about-text">
                  {t("whyChooseUs.paragraph2")}
                </Paragraph>
                <div className="stats-grid">
                  <div
                    className="stat-item"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <h3 className="counter-effect">
                      {t("whyChooseUs.stat1_value")}
                    </h3>
                    <p>{t("whyChooseUs.stat1_label")}</p>
                  </div>
                  <div
                    className="stat-item"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    <h3 className="counter-effect">
                      {t("whyChooseUs.stat2_value")}
                    </h3>
                    <p>{t("whyChooseUs.stat2_label")}</p>
                  </div>
                  <div
                    className="stat-item"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                  >
                    <h3 className="counter-effect">
                      {t("whyChooseUs.stat3_value")}
                    </h3>
                    <p>{t("whyChooseUs.stat3_label")}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="comparison-section" id="services">
        <div className="section-content">
          <Title level={2} className="section-title" data-aos="fade-up">
            {t("comparisonSection.title")}
          </Title>
          <div className="comparison-container" data-aos="fade-up">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div className="comparison-card predecessors-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <Image
                        src="/assets/image/Flags.png"
                        alt="Predecessors"
                        width={32}
                        height={32}
                      />
                    </div>
                    <Title level={3} className="card-title">
                      {t("comparisonSection.predecessors")}
                    </Title>
                  </div>
                  <div className="card-content">
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.independence_goal")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.predecessors_independence")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.path_method")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.predecessors_path")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.revolutionary_force")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.predecessors_force")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.struggle_method")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.predecessors_struggle")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.international_relations")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.predecessors_international")}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="comparison-card hcm-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <Image
                        src="/assets/image/logo.png"
                        alt="Ho Chi Minh"
                        width={32}
                        height={32}
                      />
                    </div>
                    <Title level={3} className="card-title">
                      {t("comparisonSection.hochiminh")}
                    </Title>
                  </div>
                  <div className="card-content">
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.independence_goal")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.hcm_independence")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.path_method")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.hcm_path")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.revolutionary_force")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.hcm_force")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.struggle_method")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.hcm_struggle")}
                      </div>
                    </div>
                    <div className="comparison-item">
                      <div className="item-label">
                        {t("comparisonSection.international_relations")}
                      </div>
                      <div className="item-description">
                        {t("comparisonSection.hcm_international")}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-content">
          <Title level={2} className="section-title" data-aos="fade-up">
            {t("servicesSection.title")}
          </Title>
          <Row gutter={[32, 32]}>
            {services.map((service, index) => (
              <Col xs={24} md={8} key={index}>
                <div
                  className="service-card"
                  data-aos="flip-left"
                  data-aos-delay={service.delay}
                >
                  <div className="service-image">
                    <Image
                      src={service.image}
                      alt={t(`servicesSection.${service.key}_title`)}
                      width={800}
                      height={500}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="service-icon">{service.icon}</div>
                  </div>
                  <div className="service-content">
                    <Title level={3}>
                      {t(`servicesSection.${service.key}_title`)}
                    </Title>
                    <Paragraph
                      className="service-description"
                      style={{ padding: "10px" }}
                    >
                      {t(`servicesSection.${service.key}_description`)}
                    </Paragraph>
                    <Button type="primary" className="service-btn">
                      {t("servicesSection.learnMoreButton")}
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* <section className="projects-section" ref={projectSectionRef}>
        <div className="section-content">
          <Title level={2} className="section-title" data-aos="fade-up">
            {t("projectsSection.title")}
          </Title>

          <div className="tv-display-container" data-aos="fade-up">
            <div className="tv-scene">
              <div className="tv-frame">
                <div className="tv-screen">
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videos[activeVideo].id}?autoplay=0&rel=0&modestbranding=1&showinfo=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="project-thumbnails">
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        className={`project-thumb ${
                          index === activeVideo ? "active" : ""
                        }`}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        onClick={() => setActiveVideo(index)}
                      >
                        <Image
                          src={video.thumbnail}
                          alt={t(video.titleKey)}
                          width={120}
                          height={68}
                          style={{ objectFit: "cover" }}
                        />
                        <div className="thumb-overlay">
                          <PlayCircleOutlined />
                        </div>
                        <div className="thumb-title">{t(video.titleKey)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tv-stand"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="conclusion-section">
        <div className="section-content">
          <Title level={2} className="section-title" data-aos="fade-up">
            {t("conclusionSection.title")}
          </Title>
          <div className="conclusion-content" data-aos="fade-up">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} md={12}>
                <div className="conclusion-text">
                  <Paragraph className="conclusion-paragraph">
                    {t("conclusionSection.paragraph1")}
                  </Paragraph>
                  <Paragraph className="conclusion-paragraph">
                    {t("conclusionSection.paragraph2")}
                  </Paragraph>
                  <div className="modern-values">
                    <Title level={4} className="values-title">
                      {t("conclusionSection.modern_values_title")}
                    </Title>
                    <ul className="values-list">
                      <li>{t("conclusionSection.value1")}</li>
                      <li>{t("conclusionSection.value2")}</li>
                      <li>{t("conclusionSection.value3")}</li>
                      <li>{t("conclusionSection.value4")}</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="conclusion-image" data-aos="zoom-in">
                  <Image
                    src="/assets/image/bac.jpg"
                    alt={t("conclusionSection.image_alt")}
                    width={600}
                    height={400}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "15px",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-title">TUYÊN NGÔN ĐỘC LẬP</div>
        <div className="testimonial-slider">
          <video
            controls
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
            }}
          >
            <source src="/assets/video/tuyenngondoclap.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        </div>
      </section>

      <section className="client-logos-section">
        <div className="client-title">{t("clientLogosSection.title")}</div>
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
