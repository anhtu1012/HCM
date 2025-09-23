import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "randomuser.me",
      "upload.wikimedia.org",
      "placehold.co",
    ],
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/styles")],
    // Using @use/@forward instead of @import
    additionalData: `@use "@/styles/_index.scss" as *;`,
  },
  reactStrictMode: true,

  // i18n: {
  //   locales: ["en", "vi"], // Khai báo các ngôn ngữ
  //   defaultLocale: "vi",
  // },
};

export default withNextIntl(nextConfig);
