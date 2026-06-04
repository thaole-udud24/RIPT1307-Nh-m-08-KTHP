import type {
  Order,
  OrderStatus,
  PaymentStatus,
} from '@/types/order';

// =========================
// FILTER
// =========================

export interface OrderFilters {
  keyword?: string;

  status?: OrderStatus;

  paymentStatus?: PaymentStatus;
}

// =========================
// LIST PARAMS
// =========================

export interface GetOrdersParams
  extends OrderFilters {
  page?: number;

  limit?: number;
}

// =========================
// PAGINATION
// =========================

export interface OrdersResponse {
  data: Order[];

  total: number;

  page: number;

  limit: number;
}

// =========================
// CANCEL
// =========================

export interface CancelOrderPayload {
  orderId: string;

  reason: string;
}

// =========================
// STATISTICS
// =========================

export interface OrderStatistics {
  totalOrders: number;

  pendingOrders: number;

  processingOrders: number;

  cancelledOrders: number;

  revenue: number;
}