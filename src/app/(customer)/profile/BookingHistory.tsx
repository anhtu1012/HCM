/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Empty,
  Typography,
  Tooltip,
  Space,
  Grid,
} from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./BookingHistory.scss";
import { useTranslations } from "next-intl";
import BookingHistoryServices from "@/services/profile/bokkinghistory.service";
import { BookingHistoryItem } from "@/dtos/profile/profile.dto";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const screens = useBreakpoint();
  const t = useTranslations("BookingHistory");

  const fetchBookingsHistory = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const res = await BookingHistoryServices.getBookingHistory(page, limit);
      setBookings(res.data.items || []);
      setPagination({
        ...pagination,
        current: page,
        total: res.data.total || 0,
      });
    } catch (error) {
      console.log("Error fetching booking history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingsHistory(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (paginationData: any) => {
    fetchBookingsHistory(paginationData.current, paginationData.pageSize);
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {t("status.completed")}
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            {t("status.upcoming")}
          </Tag>
        );
      case "cancelled":
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {t("status.cancelled")}
          </Tag>
        );
      default:
        return <Tag color="default">{t("status.unknown")}</Tag>;
    }
  };

  const desktopColumns = [
    {
      title: t("table.service"),
      dataIndex: "planName",
      key: "planName",
    },
    {
      title: t("table.date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: t("table.coach"),
      dataIndex: "mentor",
      key: "mentor",
    },
    {
      title: t("table.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: t("table.amount"),
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `${totalAmount.toLocaleString()}đ`,
    },
    {
      title: t("table.action"),
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title={t("action.view")}>
            <Button
              type="primary"
              shape="circle"
              icon={<EyeOutlined />}
              size="small"
            />
          </Tooltip>
          {record.status === "pending" && (
            <Button type="default" danger size="small">
              {t("action.cancel")}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const mobileColumns = [
    {
      title: t("table.summary"),
      key: "summary",
      render: (record: BookingHistoryItem) => (
        <div style={{ fontSize: 14 }}>
          <p>
            <strong>{t("table.service")}:</strong> {record.planName}
          </p>
          <p>
            <strong>{t("table.date")}:</strong>{" "}
            {new Date(record.createdAt).toLocaleDateString()} -{" "}
          </p>
          <p>
            <strong>{t("table.coach")}:</strong> {record.mentor}
          </p>
          <p>
            <strong>{t("table.status")}:</strong> {getStatusTag(record.status)}
          </p>
          <p>
            <strong>{t("table.amount")}:</strong>{" "}
            {record.totalAmount.toLocaleString()}đ
          </p>
          <div style={{ marginTop: 8 }}>
            <Space size="small">
              <Tooltip title={t("action.view")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EyeOutlined />}
                  size="small"
                />
              </Tooltip>
              {record.status === "upcoming" && (
                <Button type="default" danger size="small">
                  {t("action.cancel")}
                </Button>
              )}
            </Space>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="booking-history-section">
      <Title level={4}>{t("title")}</Title>
      {bookings.length > 0 ? (
        <Table
          columns={screens.md ? desktopColumns : mobileColumns}
          dataSource={bookings}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          className="booking-table"
        />
      ) : (
        <Empty description={t("empty")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default BookingHistory;
