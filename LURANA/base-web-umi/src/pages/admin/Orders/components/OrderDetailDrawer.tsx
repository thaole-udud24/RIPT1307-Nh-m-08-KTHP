import {
  Card,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  List,
  Row,
  Space,
  Typography,
} from 'antd';

import StatusTag from '@/components/admin/StatusTag';

import type {
  Order,
} from '@/types/order';

const {
  Title,
  Text,
} = Typography;

interface OrderDetailDrawerProps {
  open: boolean;

  order?: Order;

  onClose: () => void;
}

export default function OrderDetailDrawer({
  open,
  order,
  onClose,
}: OrderDetailDrawerProps) {
  if (!order) {
    return (
      <Drawer
        width={900}
        visible={open}
        onClose={onClose}
        title="Chi tiết đơn hàng"
      >
        <Empty />
      </Drawer>
    );
  }

  return (
    <Drawer
      width={1000}
      visible={open}
      onClose={onClose}
      title={`Đơn hàng ${order.orderCode}`}
    >
      <Row gutter={24}>
        {/* LEFT */}
        <Col span={16}>
          <Card>
            <Title level={4}>
              Thông tin đơn hàng
            </Title>

            <Descriptions
              bordered
              column={2}
            >
              <Descriptions.Item label="Mã đơn">
                {order.orderCode}
              </Descriptions.Item>

              <Descriptions.Item label="Trạng thái">
                <StatusTag
                  status={
                    order.status
                  }
                />
              </Descriptions.Item>

              <Descriptions.Item label="Thanh toán">
                <StatusTag
                  status={
                    order.paymentStatus
                  }
                />
              </Descriptions.Item>

              <Descriptions.Item label="Phương thức">
                {order.paymentMethod}
              </Descriptions.Item>

              <Descriptions.Item label="Ngày tạo">
                {new Date(
                  order.createdAt,
                ).toLocaleString(
                  'vi-VN',
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Cập nhật">
                {new Date(
                  order.updatedAt,
                ).toLocaleString(
                  'vi-VN',
                )}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label="Voucher"
              >
                {order.appliedVoucher ||
                  '--'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label="Ghi chú"
              >
                {order.note ||
                  '--'}
              </Descriptions.Item>

              {order.cancelReason && (
                <Descriptions.Item
                  span={2}
                  label="Lý do hủy"
                >
                  {
                    order.cancelReason
                  }
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          <Card
            style={{
              marginTop: 16,
            }}
          >
            <Title level={4}>
              Sản phẩm trong đơn
            </Title>

            <List
              itemLayout="horizontal"
              dataSource={
                order.items
              }
              renderItem={(
                item,
              ) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      item.name
                    }
                    description={
                      <>
                        <div>
                          Phân loại:
                          {' '}
                          {
                            item.variantName
                          }
                        </div>

                        <div>
                          Số lượng:
                          {' '}
                          {
                            item.quantity
                          }
                        </div>
                      </>
                    }
                  />

                  <Text strong>
                    {(
                      item.priceSell *
                      item.quantity
                    ).toLocaleString(
                      'vi-VN',
                    )}
                    {' '}
                    đ
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* RIGHT */}
        <Col span={8}>
          <Card>
            <Title level={4}>
              Khách hàng
            </Title>

            <Space
              direction="vertical"
              size={12}
            >
              <div>
                <Text type="secondary">
                  Người nhận
                </Text>

                <br />

                <Text strong>
                  {
                    order
                      .shippingAddress
                      .fullName
                  }
                </Text>
              </div>

              <div>
                <Text type="secondary">
                  Số điện thoại
                </Text>

                <br />

                <Text strong>
                  {
                    order
                      .shippingAddress
                      .phone
                  }
                </Text>
              </div>

              <div>
                <Text type="secondary">
                  Địa chỉ
                </Text>

                <br />

                <Text strong>
                  {
                    order
                      .shippingAddress
                      .addressLine
                  }
                </Text>

                <br />

                <Text>
                  {
                    order
                      .shippingAddress
                      .ward
                  }
                  ,
                  {' '}
                  {
                    order
                      .shippingAddress
                      .district
                  }
                </Text>

                <br />

                <Text>
                  {
                    order
                      .shippingAddress
                      .province
                  }
                </Text>
              </div>
            </Space>
          </Card>

          <Card
            style={{
              marginTop: 16,
            }}
          >
            <Title level={4}>
              Thanh toán
            </Title>

            <Space
              direction="vertical"
              style={{
                width: '100%',
              }}
            >
              <Row justify="space-between">
                <span>
                  Tạm tính
                </span>

                <span>
                  {order.originalTotal.toLocaleString(
                    'vi-VN',
                  )}
                  {' '}
                  đ
                </span>
              </Row>

              <Row justify="space-between">
                <span>
                  Phí vận chuyển
                </span>

                <span>
                  {order.shippingFee.toLocaleString(
                    'vi-VN',
                  )}
                  {' '}
                  đ
                </span>
              </Row>

              <Row justify="space-between">
                <span>
                  Giảm giá
                </span>

                <span>
                  -
                  {order.discountAmount.toLocaleString(
                    'vi-VN',
                  )}
                  {' '}
                  đ
                </span>
              </Row>

              <Divider />

              <Row justify="space-between">
                <Text strong>
                  Tổng thanh toán
                </Text>

                <Title
                  level={4}
                  style={{
                    margin: 0,
                  }}
                >
                  {order.totalAmount.toLocaleString(
                    'vi-VN',
                  )}
                  {' '}
                  đ
                </Title>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </Drawer>
  );
}