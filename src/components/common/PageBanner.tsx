import React from "react";
import { Typography } from "antd";
import "./PageBanner.scss";

const { Title, Paragraph } = Typography;

interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  backgroundImage = "/assets/image/banner3.jpg",
  height = "400px",
}) => {
  return (
    <div
      className="page-banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: height,
      }}
    >
      <div className="banner-overlay"></div>
      <div className="banner-content" data-aos="fade-up">
        <Title className="banner-title">{title}</Title>
        {subtitle && (
          <Paragraph className="banner-subtitle">{subtitle}</Paragraph>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
