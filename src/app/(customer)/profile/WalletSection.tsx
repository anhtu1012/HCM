import {
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Empty,
  Row,
  Table,
  Tag,
  Typography,
  Grid,
} from "antd";
import React, { useState } from "react"; 
import "./WalletSection.scss";
import { useTranslations } from "next-intl"; 

interface TransactionItem {
  id: string;
  date: string;
  type: "topup" | "purchase" | "refund";
  amount: number;
  descriptionKey: string; 
  descriptionOriginal?: string; 
  status: "completed" | "pending" | "failed";
}

interface WalletSectionProps {
  balance?: number; 
  onTopUp?: (amount: number, method: string) => void; 
  transactions?: TransactionItem[]; 
}

const WalletSection: React.FC<WalletSectionProps> = ({ transactions = [] }) => {
  const t = useTranslations("WalletSection"); 
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  
  const sampleTransactionData: TransactionItem[] = [
        {
          id: "1",
          date: "2023-11-10 14:30",
          type: "topup",
          amount: 500000,
          descriptionKey: "sampleTransactions.sample1.description",
          status: "completed",
        },
        {
          id: "2",
          date: "2023-11-08 09:15",
          type: "purchase",
          amount: -150000,
          descriptionKey: "sampleTransactions.sample2.description",
          status: "completed",
        },
        {
          id: "3",
          date: "2023-11-05 16:45",
          type: "refund",
          amount: 50000,
          descriptionKey: "sampleTransactions.sample3.description",
          status: "completed",
        },
        {
          id: "4",
          date: "2023-11-01 10:20",
          type: "topup",
          amount: 200000,
          descriptionKey: "sampleTransactions.sample4.description",
          status: "pending",
        },
      ];

  const [transactionHistory] = useState<TransactionItem[]>(
    
    transactions.length > 0 ? transactions : sampleTransactionData
  );

  const renderTypeTag = (type: TransactionItem["type"]) => {
    switch (type) {
      case "topup":
        return (
          <Tag color="green" icon={<ArrowDownOutlined />}>{t("transactionTypes.topup")}</Tag>
        );
      case "purchase":
        return (
          <Tag color="orange" icon={<ArrowUpOutlined />}>{t("transactionTypes.purchase")}</Tag>
        );
      case "refund":
        return (
          <Tag color="cyan" icon={<ArrowDownOutlined />}>{t("transactionTypes.refund")}</Tag>
        );
      default:
        return <Tag color="blue">{t("transactionTypes.default")}</Tag>;
    }
  };

  const renderStatusTag = (status: TransactionItem["status"]) => {
    switch (status) {
      case "completed":
        return <Tag color="green">{t("transactionStatuses.completed")}</Tag>;
      case "pending":
        return <Tag color="gold">{t("transactionStatuses.pending")}</Tag>;
      case "failed":
        return <Tag color="red">{t("transactionStatuses.failed")}</Tag>;
      default:
        return <Tag color="default">{t("transactionStatuses.unknown")}</Tag>;
    }
  };

  const desktopColumns = [
    {
      title: t("table.date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("table.type"),
      dataIndex: "type",
      key: "type",
      render: (type: TransactionItem["type"]) => renderTypeTag(type),
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => {
        const color = amount >= 0 ? "green" : "red";
        return (
          <span style={{ color, fontWeight: "bold" }}>
            {amount.toLocaleString("vi-VN")} đ 
          </span>
        );
      },
    },
    {
      title: t("table.description"),
      dataIndex: "descriptionKey", // Sử dụng descriptionKey
      key: "description",
      render: (descriptionKey: string) => t(descriptionKey) // Dịch mô tả
    },
    {
      title: t("table.status"),
      dataIndex: "status",
      key: "status",
      render: (status: TransactionItem["status"]) => renderStatusTag(status),
    },
  ];

  const mobileColumns = [
    {
      title: t("table.transactionSummary"),
      key: "summary",
      render: ( record: TransactionItem) => ( 
        <div style={{ fontSize: 14 }}>
          <p>
            <strong>{t("mobileLabels.date")}</strong> {record.date}
          </p>
          <p>
            <strong>{t("mobileLabels.type")}</strong> {renderTypeTag(record.type)}
          </p>
          <p>
            <strong>{t("mobileLabels.amount")}</strong>{" "}
            <span style={{ color: record.amount >= 0 ? "green" : "red", fontWeight: "bold" }}>
              {record.amount.toLocaleString("vi-VN")} đ
            </span>
          </p>
          <p>
            <strong>{t("mobileLabels.description")}</strong> {t(record.descriptionKey)}
          </p>
          <p>
            <strong>{t("mobileLabels.status")}</strong> {renderStatusTag(record.status)}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="wallet-section">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            title={<Typography.Title level={4}>{t("transactionHistoryTitle")}</Typography.Title>}
            className="transaction-history-card"
          >
            {transactionHistory.length > 0 ? (
              <div className="table-wrapper">
                <Table
                  dataSource={transactionHistory.map(item => ({...item, description: t(item.descriptionKey)}))} // Dịch description cho dataSource
                  columns={screens.md ? desktopColumns : mobileColumns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </div>
            ) : (
              <Empty
                description={t("emptyDescription")}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WalletSection;