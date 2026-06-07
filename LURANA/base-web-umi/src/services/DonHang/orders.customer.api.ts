import { request } from 'umi';

export type PaymentMethod = 'COD' | 'BANK_TRANSFER' | 'VIETQR';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine: string;
  province: string;
  district: string;
  ward: string;
}

export interface CheckoutPayload {
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  note?: string;
  voucherCode?: string;
}

export interface ListMyOrdersParams {
  page?: number;
  limit?: number;
  status?: string;
}

// Đặt hàng — dùng items trong giỏ hàng hiện tại của user
export async function checkout(data: CheckoutPayload) {
  return request('/api/orders/checkout', { method: 'POST', data });
}

// Danh sách đơn hàng của tôi
export async function getMyOrders(params?: ListMyOrdersParams) {
  return request('/api/orders/my-orders', { method: 'GET', params });
}

// Chi tiết 1 đơn hàng
export async function getOrderDetail(id: string) {
  return request(`/api/orders/${id}`, { method: 'GET' });
}