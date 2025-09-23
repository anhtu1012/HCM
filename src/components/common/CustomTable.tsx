/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import "./CustomTable.scss";

export type CustomTableProps<T> = Omit<TableProps<T>, "title"> & {
  headerStyle?: "default" | "gradient" | "minimal";
};

function CustomTable<T extends object = any>(props: CustomTableProps<T>) {
  const { className, headerStyle = "gradient", ...restProps } = props;

  return (
    <div className="custom-table-wrapper">
      <Table
        {...restProps}
        className={`custom-table ${className || ""} header-${headerStyle}`}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          position: ["bottomRight"],
          ...props.pagination,
        }}
      />
    </div>
  );
}

export default CustomTable;
