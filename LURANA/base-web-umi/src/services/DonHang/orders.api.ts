import type {
  Order,
  OrderStatus,
  PaymentStatus,
} from '@/types/order';

import {
  OrderStatus as OrderStatusEnum,
  PaymentStatus as PaymentStatusEnum,
} from '@/types/order';

import type {
  CancelOrderPayload,
  GetOrdersParams,
  OrdersResponse,
  OrderStatistics,
} from './types';

import {
  loadOrders,
  saveOrders,
} from '@/utils/orderStorage';

// =========================
// GET ORDERS
// =========================

export async function getOrders(
  params: GetOrdersParams,
): Promise<OrdersResponse> {
  let orders = loadOrders();

  const {
    keyword,
    status,
    paymentStatus,
    page = 1,
    limit = 10,
  } = params;

  // search

  if (keyword?.trim()) {
    const search =
      keyword.toLowerCase();

    orders = orders.filter(
      (order) =>
        order.orderCode
          .toLowerCase()
          .includes(search) ||
        order.shippingAddress.fullName
          .toLowerCase()
          .includes(search) ||
        order.shippingAddress.phone.includes(
          keyword,
        ),
    );
  }

  // status

  if (status) {
    orders = orders.filter(
      (item) =>
        item.status === status,
    );
  }

  // payment status

  if (paymentStatus) {
    orders = orders.filter(
      (item) =>
        item.paymentStatus ===
        paymentStatus,
    );
  }

  // newest first

  orders.sort(
    (a, b) =>
      new Date(
        b.createdAt,
      ).getTime() -
      new Date(
        a.createdAt,
      ).getTime(),
  );

  const total = orders.length;

  const start =
    (page - 1) * limit;

  const end = start + limit;

  return {
    data: orders.slice(
      start,
      end,
    ),

    total,

    page,

    limit,
  };
}

// =========================
// GET DETAIL
// =========================

export async function getOrderById(
  orderId: string,
): Promise<Order> {
  const order =
    loadOrders().find(
      (item) =>
        item._id === orderId,
    );

  if (!order) {
    throw new Error(
      'Không tìm thấy đơn hàng',
    );
  }

  return order;
}

// =========================
// CONFIRM PAYMENT
// =========================

export async function confirmPayment(
  orderId: string,
): Promise<Order> {
  const orders =
    loadOrders();

  const index =
    orders.findIndex(
      (item) =>
        item._id === orderId,
    );

  if (index === -1) {
    throw new Error(
      'Không tìm thấy đơn hàng',
    );
  }

  const order =
    orders[index];

  // giống backend

  if (
    order.status ===
    OrderStatusEnum.CANCELLED
  ) {
    throw new Error(
      'Đơn hàng đã bị hủy',
    );
  }

  if (
    order.paymentStatus ===
    PaymentStatusEnum.PAID
  ) {
    throw new Error(
      'Đơn hàng đã được xác nhận thanh toán',
    );
  }

  order.paymentStatus =
    PaymentStatusEnum.PAID;

  order.status =
    OrderStatusEnum.PROCESSING;

  order.updatedAt =
    new Date().toISOString();

  saveOrders(orders);

  return order;
}

// =========================
// CANCEL ORDER
// =========================

export async function cancelOrder(
  payload: CancelOrderPayload,
): Promise<Order> {
  const orders =
    loadOrders();

  const index =
    orders.findIndex(
      (item) =>
        item._id ===
        payload.orderId,
    );

  if (index === -1) {
    throw new Error(
      'Không tìm thấy đơn hàng',
    );
  }

  const order =
    orders[index];

  if (
    order.status ===
    OrderStatusEnum.CANCELLED
  ) {
    throw new Error(
      'Đơn hàng đã bị hủy',
    );
  }

  order.status =
    OrderStatusEnum.CANCELLED;

  order.cancelReason =
    payload.reason;

  order.updatedAt =
    new Date().toISOString();

  saveOrders(orders);

  return order;
}

// =========================
// STATISTICS
// =========================

export async function getOrderStatistics(): Promise<OrderStatistics> {
  const orders =
    loadOrders();

  return {
    totalOrders:
      orders.length,

    pendingOrders:
      orders.filter(
        (item) =>
          item.status ===
          OrderStatusEnum.PENDING,
      ).length,

    processingOrders:
      orders.filter(
        (item) =>
          item.status ===
          OrderStatusEnum.PROCESSING,
      ).length,

    cancelledOrders:
      orders.filter(
        (item) =>
          item.status ===
          OrderStatusEnum.CANCELLED,
      ).length,

    revenue: orders
      .filter(
        (item) =>
          item.paymentStatus ===
          PaymentStatusEnum.PAID,
      )
      .reduce(
        (
          total,
          item,
        ) =>
          total +
          item.totalAmount,
        0,
      ),
  };
}