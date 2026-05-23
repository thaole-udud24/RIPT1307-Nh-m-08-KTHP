export enum VoucherStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  DISABLED = 'DISABLED',
  UPCOMING = 'UPCOMING',
  ENDED = 'ENDED',
}

export enum VoucherCustomerScope {
  ALL_CUSTOMERS = 'ALL_CUSTOMERS',
  NEW_CUSTOMERS = 'NEW_CUSTOMERS',
  VIP_CUSTOMERS = 'VIP_CUSTOMERS',
}

export enum VoucherDiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export enum VoucherApplyScope {
  ALL_PRODUCTS = 'ALL_PRODUCTS',
  SPECIFIC_PRODUCTS = 'SPECIFIC_PRODUCTS',
}

export enum VoucherRepeatType {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
}

export const VOUCHER_CODE_REGEX = /^[A-Z0-9_]+$/;

export const VoucherErrorMessage = {
  DUPLICATE_CODE: 'Voucher code already exists',
  INVALID_DATE_RANGE: 'End date must be greater than or equal to start date',
  INVALID_FORMAT:
    'Voucher code must contain only uppercase letters, numbers, and underscores',
  EXPIRED: 'Voucher has expired',
  OUT_OF_GOLDEN_HOUR: 'Voucher is not available at this time',
};
