import {
  Card,
  Col,
  Row,
} from 'antd';

import {
  ShoppingCartOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import {
  Order,
  OrderStatus,
  PaymentStatus,
} from '@/types/order';

interface OrderStatisticsProps {
  orders: Order[];
}

export default function OrderStatistics({
  orders,
}: OrderStatisticsProps) {
  const totalOrders =
    orders.length;

  const pendingOrders =
    orders.filter(
      (item) =>
        item.status ===
        OrderStatus.PENDING,
    ).length;

  const processingOrders =
    orders.filter(
      (item) =>
        item.status ===
        OrderStatus.PROCESSING,
    ).length;

  const cancelledOrders =
    orders.filter(
      (item) =>
        item.status ===
        OrderStatus.CANCELLED,
    ).length;

  const paidOrders =
    orders.filter(
      (item) =>
        item.paymentStatus ===
        PaymentStatus.PAID,
    ).length;

  const statistics = [
    {
      title: 'Tổng đơn',

      value: totalOrders,

      cardClass:
        'card-total',

      iconClass:
        'icon-total',

      icon:
        <ShoppingCartOutlined />,
    },

    {
      title:
        'Chờ thanh toán',

      value:
        pendingOrders,

      cardClass:
        'card-pending',

      iconClass:
        'icon-pending',

      icon:
        <ClockCircleOutlined />,
    },

    {
      title:
        'Đang xử lý',

      value:
        processingOrders,

      cardClass:
        'card-processing',

      iconClass:
        'icon-processing',

      icon: <SyncOutlined />,
    },

    {
      title:
        'Đã thanh toán',

      value: paidOrders,

      cardClass:
        'card-paid',

      iconClass:
        'icon-paid',

      icon:
        <CheckCircleOutlined />,
    },

    {
      title: 'Đã hủy',

      value:
        cancelledOrders,

      cardClass:
        'card-cancelled',

      iconClass:
        'icon-cancelled',

      icon:
        <CloseCircleOutlined />,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {statistics.map(
        (item) => (
          <Col
            flex="1"
            key={item.title}
            >
            <Card
              bordered={
                false
              }
              className={`
                statistics-card
                ${item.cardClass}
              `}
            >
              <div className="statistics-content">
                <div className="statistics-title">
                    {item.title}
                </div>

                <div className="statistics-footer">
                    <div className="statistics-value">
                    {item.value}
                    </div>

                    <div
                        className={`
                            statistics-icon
                            ${item.iconClass}
                        `}
                        >
                        {item.icon}
                        </div>
                    </div>
                </div>
            </Card>
          </Col>
        ),
      )}
    </Row>
  );
}