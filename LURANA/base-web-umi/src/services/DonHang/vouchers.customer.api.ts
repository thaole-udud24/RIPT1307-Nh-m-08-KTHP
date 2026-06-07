import { request } from 'umi';

export interface ApplyVoucherPayload {
  voucherCode: string;
  cartTotal?: number;
  eligibleCartTotal?: number;
  productIds?: string[];
  hasDirectDiscount?: boolean;
}

export interface ApplyVoucherResult {
  discountAmount: number;
  voucherCode: string;
  message?: string;
}

// Kiểm tra & áp dụng voucher trước khi checkout
export async function applyVoucher(data: ApplyVoucherPayload): Promise<ApplyVoucherResult> {
  return request('/api/vouchers/apply', { method: 'POST', data });
}