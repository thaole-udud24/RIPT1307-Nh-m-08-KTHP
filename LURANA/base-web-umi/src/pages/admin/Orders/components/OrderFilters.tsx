import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Space,
  Dropdown,
} from 'antd';

import { useState } from 'react';

import {
  ReloadOutlined,
  FilterOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {
  OrderStatus,
  PaymentStatus,
} from '@/types/order';

import type {
  GetOrdersParams,
} from '@/services/DonHang/types';

interface OrderFiltersProps {
  value: GetOrdersParams;

  onChange: (
    values: GetOrdersParams,
  ) => void;

  onApply: () => void;

  onReset: () => void;

  onExport?: () => void;
}

export default function OrderFilters({
   value,
  onChange,
  onApply,
  onReset,
  onExport,
}: OrderFiltersProps) {
  
  const [filterOpen, setFilterOpen] =
    useState(false);

  const [showFilters, setShowFilters] =
    useState(false);

  const filterContent = (
    <div className="orders-custom-filter">
      <div className="filter-title">
        Tùy chỉnh bộ lọc
      </div>

      <div className="filter-field">
        <label>
          Trạng thái đơn
        </label>

        <Select
          allowClear
          style={{
            width: '100%',
          }}
          value={value.status}
          onChange={(status) =>
            onChange({
              ...value,
              status,
            })
          }
          options={[
            {
              label:
                'Chờ thanh toán',
              value:
                OrderStatus.PENDING,
            },
            {
              label:
                'Đang xử lý',
              value:
                OrderStatus.PROCESSING,
            },
            {
              label:
                'Đã hủy',
              value:
                OrderStatus.CANCELLED,
            },
          ]}
        />
      </div>

      <div className="filter-field">
        <label>
          Thanh toán
        </label>

        <Select
          allowClear
          style={{
            width: '100%',
          }}
          value={
            value.paymentStatus
          }
          onChange={(
            paymentStatus,
          ) =>
            onChange({
              ...value,
              paymentStatus,
            })
          }
          options={[
            {
              label:
                'Đã thanh toán',
              value:
                PaymentStatus.PAID,
            },
            {
              label:
                'Chưa thanh toán',
              value:
                PaymentStatus.UNPAID,
            },
          ]}
        />
      </div>

      <Button
        block
        type="primary"
        onClick={() => {
          onApply?.();
          setFilterOpen(
            false,
          );
        }}
      >
        Áp dụng ngay
      </Button>
    </div>
  );

  return (
    <div className="order-filters">
      {/* Search */}

      <Row
        gutter={12}
        align="middle"
      >
        <Col flex="auto">
          <Input
            allowClear
            className="orders-search-input"
            placeholder="Nhập mã đơn, khách hàng, số điện thoại"
            value={value.keyword}
            onChange={(event) =>
              onChange({
                ...value,
                keyword: event.target.value,
              })
            }
          />
        </Col>

        <Col>
          <Button
            className="orders-action-btn"
            icon={<ReloadOutlined />}
            onClick={onReset}
          >
            Tải lại
          </Button>
        </Col>

        <Col>
          <Dropdown
            visible={filterOpen}
            onVisibleChange={setFilterOpen}
            overlay={filterContent}
            trigger={['click']}
          >
            <Button
              className="orders-action-btn"
              icon={<FilterOutlined />}
            >
              Bộ lọc tùy chỉnh
            </Button>
          </Dropdown>
        </Col>

        <Col>
          <Button
            type="primary"
            className="orders-action-btn export-btn"
            icon={<UploadOutlined />}
            onClick={onExport}
          >
            Xuất dữ liệu
          </Button>
        </Col>
      </Row>

      {/* Advanced Filters */}

      {showFilters && (
        <div className="advanced-filters">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Select
                allowClear
                placeholder="Chọn trạng thái đơn"
                style={{
                  width: '100%',
                }}
                value={value.status}
                onChange={(status) =>
                  onChange({
                    ...value,
                    status,
                  })
                }
                options={[
                  {
                    label:
                      'Chờ thanh toán',
                    value:
                      OrderStatus.PENDING,
                  },
                  {
                    label:
                      'Đang xử lý',
                    value:
                      OrderStatus.PROCESSING,
                  },
                  {
                    label:
                      'Đã hủy',
                    value:
                      OrderStatus.CANCELLED,
                  },
                ]}
              />
            </Col>

            <Col span={12}>
              <Select
                allowClear
                placeholder="Chọn thanh toán"
                style={{
                  width: '100%',
                }}
                value={
                  value.paymentStatus
                }
                onChange={(
                  paymentStatus,
                ) =>
                  onChange({
                    ...value,
                    paymentStatus,
                  })
                }
                options={[
                  {
                    label:
                      'Đã thanh toán',
                    value:
                      PaymentStatus.PAID,
                  },
                  {
                    label:
                      'Chưa thanh toán',
                    value:
                      PaymentStatus.UNPAID,
                  },
                ]}
              />
            </Col>

            <Col span={24}>
              <Button
                type="primary"
                onClick={onApply}
              >
                Áp dụng
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}