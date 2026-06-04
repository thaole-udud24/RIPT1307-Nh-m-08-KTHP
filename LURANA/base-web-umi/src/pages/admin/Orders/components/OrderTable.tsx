import {
  Button,
  Dropdown,
  Menu,
  Typography,
} from 'antd';

import type {
  MenuProps,
} from 'antd';

import {
  MenuOutlined,
} from '@ant-design/icons';

import type {
  ColumnsType,
} from 'antd/es/table';

import DataTable from '@/components/admin/DataTable';
import StatusTag from '@/components/admin/StatusTag';

import type {
  Order,
} from '@/types/order';

import {
  OrderStatus,
  PaymentStatus,
} from '@/types/order';

const { Text } = Typography;

interface OrderTableProps {
  loading?: boolean;

  orders: Order[];

  total: number;

  page: number;

  limit: number;

  onPageChange: (
    page: number,
    pageSize: number,
  ) => void;

  onViewDetail: (
    order: Order,
  ) => void;

  onConfirmPayment: (
    order: Order,
  ) => void;

  onCancelOrder: (
    order: Order,
  ) => void;
}

export default function OrderTable({
  loading = false,

  orders,

  total,

  page,

  limit,

  onPageChange,

  onViewDetail,

  onConfirmPayment,

  onCancelOrder,
    }: OrderTableProps) {

    const getActionItems = (
        order: Order,
        ): MenuProps['items'] => {
        const items: MenuProps['items'] = [
            {
            key: 'detail',

            label: 'Chi tiết',

            onClick: () =>
                onViewDetail(order),
            },
        ];

        if (
            order.paymentStatus ===
            PaymentStatus.UNPAID &&
            order.status ===
            OrderStatus.PENDING
        ) {
            items.push({
            key: 'confirm-payment',

            label: 'Xác nhận tiền',

            onClick: () =>
                onConfirmPayment(order),
            });
        }

        if (
            order.status !==
            OrderStatus.CANCELLED
        ) {
            items.push({
            key: 'cancel',

            label: (
                <span
                style={{
                    color: '#ff4d4f',
                }}
                >
                Hủy đơn
                </span>
            ),

            onClick: () =>
                onCancelOrder(order),
            });
        }

        return items;
    };

    const renderActionMenu = (
        order: Order,
        ) => (
        <Menu
            items={getActionItems(
            order,
            )}
        />
    );

  const columns: ColumnsType<Order> =
    [
      {
        title: 'Mã đơn',

        dataIndex:
          'orderCode',

        width: 140,

        render: (
          value: string,
        ) => (
          <Text strong>
            {value}
          </Text>
        ),
      },

      {
        title:
          'Khách hàng',

        width: 220,

        render: (
          _,
          record,
        ) => (
          <div>
            <div>
              {
                record
                  .shippingAddress
                  .fullName
              }
            </div>

            <Text
              type="secondary"
            >
              {
                record
                  .shippingAddress
                  .phone
              }
            </Text>
          </div>
        ),
      },

      {
        title:
          'Số lượng',

        width: 120,

        align: 'center',

        render: (
          _,
          record,
        ) =>
          record.items.reduce(
            (
              total,
              item,
            ) =>
              total +
              item.quantity,

            0,
          ),
      },

      {
        title:
          'Tổng tiền',

        dataIndex:
          'totalAmount',

        width: 150,

        align: 'center',

        render: (
          value: number,
        ) =>
          `${value.toLocaleString(
            'vi-VN',
          )} đ`,
      },

      {
        title:
          'Thanh toán',

        dataIndex:
          'paymentStatus',

        width: 150,

        align: 'center',

        render: (
          paymentStatus,
        ) => (
          <StatusTag
            status={
              paymentStatus
            }
          />
        ),
      },

      {
        title:
          'Trạng thái',

        dataIndex:
          'status',

        width: 160,

        align: 'center',

        render: (
          status,
        ) => (
          <StatusTag
            status={status}
          />
        ),
      },

      {
        title: 'Thao tác',

        fixed: 'right',

        width: 100,

        align: 'center',

        render: (_, record) => (
            <Dropdown
            overlay={renderActionMenu(
                record,
            )}
            trigger={['click']}
            placement="bottomRight"
            >
            <Button
                type="text"
                icon={<MenuOutlined />}
            />
            </Dropdown>
        ),
        }
    ];

  return (
    <DataTable<Order>
      rowKey="_id"
      loading={loading}
      columns={columns}
      dataSource={orders}
      scroll={{
        x: 1100,
      }}
      pagination={false}
    />
  );
}