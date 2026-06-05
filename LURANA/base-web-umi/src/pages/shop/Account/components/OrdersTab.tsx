import React from 'react';
import { UserOrder } from '../types';

interface OrdersTabProps {
  orders: UserOrder[];
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => {
  return (
    <div className="account-card orders-tab-card">
      <div className="card-header">
        <h2>Lịch sử đơn hàng</h2>
        <p>Theo dõi trạng thái và chi tiết các đơn hàng bạn đã mua tại Lunaria</p>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td data-label="Mã đơn hàng"><strong className="order-code">{order.orderCode}</strong></td>
                <td data-label="Ngày đặt">{order.date}</td>
                <td data-label="Sản phẩm">
                  <div className="order-product-info">
                    <p>{order.productName}</p>
                    {order.itemCount > 1 && <span>và {order.itemCount - 1} sản phẩm khác</span>}
                  </div>
                </td>
                <td data-label="Tổng tiền" className="total-col">{order.total.toLocaleString('vi-VN')}đ</td>
                <td data-label="Trạng thái">
                  {order.status === 'COMPLETED' && <span className="status-badge completed">Đã giao hàng</span>}
                  {order.status === 'DELIVERING' && <span className="status-badge delivering">Đang vận chuyển</span>}
                  {order.status === 'CANCELLED' && <span className="status-badge cancelled">Đã hủy</span>}
                </td>
                <td className="action-col">
                  <button className="btn-reorder" onClick={() => alert(`Đang thêm lại đơn hàng ${order.orderCode} vào giỏ...`)}>
                    Mua lại
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTab;
