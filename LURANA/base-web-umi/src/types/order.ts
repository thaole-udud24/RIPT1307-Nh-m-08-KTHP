// =========================
// ORDER STATUS
// =========================

export enum OrderStatus {
  PENDING = 'PENDING',

  PROCESSING = 'PROCESSING',

  CANCELLED = 'CANCELLED',
}

// =========================
// PAYMENT STATUS
// =========================

export enum PaymentStatus {
  UNPAID = 'UNPAID',

  PAID = 'PAID',
}

// =========================
// PAYMENT METHOD
// =========================

export enum PaymentMethod {
  COD = 'COD',

  BANK_TRANSFER = 'BANK_TRANSFER',
}

// =========================
// ADDRESS
// =========================

export interface ShippingAddress {
  fullName: string;

  phone: string;

  addressLine: string;

  province: string;

  district: string;

  ward: string;
}

// =========================
// ORDER ITEM
// =========================

export interface OrderItem {
  productId: string;

  name: string;

  variantName: string;

  quantity: number;

  priceSell: number;

  priceImport: number;

  profit: number;
}

// =========================
// ORDER
// =========================

export interface Order {
  _id: string;

  orderCode: string;

  userId: string;

  items: OrderItem[];

  originalTotal: number;

  shippingFee: number;

  discountAmount: number;

  appliedVoucher?: string | null;

  totalAmount: number;

  shippingAddress: ShippingAddress;

  paymentMethod: PaymentMethod;

  paymentStatus: PaymentStatus;

  status: OrderStatus;

  note?: string;

  qrUrl?: string;

  paymentTimeout?: string;

  cancelReason?: string;

  createdAt: string;

  updatedAt: string;
}