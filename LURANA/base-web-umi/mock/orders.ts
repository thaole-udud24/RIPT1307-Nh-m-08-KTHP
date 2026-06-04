import {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '../src/types/order';

// =========================
// SEED ORDERS
// =========================

const seedOrders: Order[] = [
  {
    _id: 'order-001',

    orderCode: 'LRN100001',

    userId: 'user-001',

    items: [
      {
        productId: 'product-001',
        name: 'Kem chống nắng Skin Aqua',
        variantName: '50ml',
        quantity: 2,
        priceSell: 250000,
        priceImport: 180000,
        profit: 140000,
      },
    ],

    originalTotal: 500000,

    shippingFee: 40000,

    discountAmount: 50000,

    appliedVoucher: 'SUMMER50',

    totalAmount: 490000,

    shippingAddress: {
      fullName: 'Thoyyyyy',
      phone: '0908112001',
      addressLine: '123 Nguyễn Huệ',
      province: 'TP.HCM',
      district: 'Quận 1',
      ward: 'Bến Nghé',
    },

    paymentMethod:
      PaymentMethod.BANK_TRANSFER,

    paymentStatus:
      PaymentStatus.UNPAID,

    status:
      OrderStatus.PENDING,

    note: 'Giao giờ hành chính',

    createdAt:
      '2026-05-20T09:00:00.000Z',

    updatedAt:
      '2026-05-20T09:00:00.000Z',
  },

  {
    _id: 'order-002',

    orderCode: 'LRN100002',

    userId: 'user-002',

    items: [
      {
        productId: 'product-002',
        name: 'Sữa rửa mặt Cetaphil',
        variantName: '125ml',
        quantity: 3,
        priceSell: 180000,
        priceImport: 120000,
        profit: 180000,
      },
    ],

    originalTotal: 540000,

    shippingFee: 40000,

    discountAmount: 0,

    totalAmount: 580000,

    shippingAddress: {
      fullName: 'Nguyễn Minh Anh',
      phone: '0908112002',
      addressLine: '25 Lê Lợi',
      province: 'Đà Nẵng',
      district: 'Hải Châu',
      ward: 'Thạch Thang',
    },

    paymentMethod:
      PaymentMethod.BANK_TRANSFER,

    paymentStatus:
      PaymentStatus.PAID,

    status:
      OrderStatus.PROCESSING,

    note: '',

    createdAt:
      '2026-05-21T09:00:00.000Z',

    updatedAt:
      '2026-05-21T09:30:00.000Z',
  },

  {
    _id: 'order-003',

    orderCode: 'LRN100003',

    userId: 'user-003',

    items: [
      {
        productId: 'product-003',
        name: 'Serum Vitamin C',
        variantName: '30ml',
        quantity: 1,
        priceSell: 450000,
        priceImport: 300000,
        profit: 150000,
      },
    ],

    originalTotal: 450000,

    shippingFee: 40000,

    discountAmount: 0,

    totalAmount: 490000,

    shippingAddress: {
      fullName: 'Lê Thanh Bình',
      phone: '0908112003',
      addressLine: '12 Trần Hưng Đạo',
      province: 'Hà Nội',
      district: 'Hoàn Kiếm',
      ward: 'Hàng Bài',
    },

    paymentMethod:
      PaymentMethod.BANK_TRANSFER,

    paymentStatus:
      PaymentStatus.UNPAID,

    status:
      OrderStatus.CANCELLED,

    cancelReason:
      'Hệ thống tự động hủy sau 15 phút.',

    note: '',

    createdAt:
      '2026-05-22T09:00:00.000Z',

    updatedAt:
      '2026-05-22T09:20:00.000Z',
  },

  {
    _id: 'order-004',

    orderCode: 'LRN100004',

    userId: 'user-004',

    items: [
      {
        productId: 'product-004',
        name: 'Nước tẩy trang Bioderma',
        variantName: '500ml',
        quantity: 2,
        priceSell: 320000,
        priceImport: 250000,
        profit: 140000,
      },
    ],

    originalTotal: 640000,

    shippingFee: 40000,

    discountAmount: 100000,

    appliedVoucher: 'WELCOME100',

    totalAmount: 580000,

    shippingAddress: {
      fullName: 'Trần Thu Hà',
      phone: '0908112004',
      addressLine: '89 Hai Bà Trưng',
      province: 'Hà Nội',
      district: 'Hai Bà Trưng',
      ward: 'Lê Đại Hành',
    },

    paymentMethod:
      PaymentMethod.BANK_TRANSFER,

    paymentStatus:
      PaymentStatus.PAID,

    status:
      OrderStatus.CANCELLED,

    cancelReason:
      'Khách yêu cầu hủy.',

    note: 'Liên hệ trước khi giao',

    createdAt:
      '2026-05-23T10:00:00.000Z',

    updatedAt:
      '2026-05-23T12:00:00.000Z',
  },
];

// =========================
// GENERATED ORDERS
// =========================

const generatedOrders: Order[] =
  Array.from(
    { length: 16 },
    (_, index) => {
      const quantity =
        (index % 3) + 1;

      const originalTotal =
        quantity * 150000;

      const shippingFee =
        40000;

      const discountAmount =
        index % 2 === 0
          ? 30000
          : 0;

      const totalAmount =
        originalTotal +
        shippingFee -
        discountAmount;

      let status:
        OrderStatus;

      let paymentStatus:
        PaymentStatus;

      if (index % 3 === 0) {
        status =
          OrderStatus.PENDING;

        paymentStatus =
          PaymentStatus.UNPAID;
      } else if (
        index % 3 === 1
      ) {
        status =
          OrderStatus.PROCESSING;

        paymentStatus =
          PaymentStatus.PAID;
      } else {
        status =
          OrderStatus.CANCELLED;

        paymentStatus =
          index % 2 === 0
            ? PaymentStatus.PAID
            : PaymentStatus.UNPAID;
      }

      return {
        _id:
          `order-auto-${index + 1}`,

        orderCode:
          `LRN20${1000 + index}`,

        userId:
          `user-auto-${index}`,

        items: [
          {
            productId:
              `product-${index}`,

            name:
              `Sản phẩm ${
                index + 1
              }`,

            variantName:
              'Default',

            quantity,

            priceSell: 150000,

            priceImport:
              100000,

            profit:
              quantity * 50000,
          },
        ],

        originalTotal,

        shippingFee,

        discountAmount,

        appliedVoucher:
          discountAmount > 0
            ? 'AUTO30'
            : null,

        totalAmount,

        shippingAddress: {
          fullName:
            `Khách hàng ${
              index + 1
            }`,

          phone: `0908113${String(
            index,
          ).padStart(3, '0')}`,

          addressLine:
            'Địa chỉ mẫu',

          province:
            'TP.HCM',

          district:
            'Quận 1',

          ward:
            'Bến Nghé',
        },

        paymentMethod:
          PaymentMethod.BANK_TRANSFER,

        paymentStatus,

        status,

        note:
          index % 2 === 0
            ? 'Giao giờ hành chính'
            : '',

        cancelReason:
          status ===
          OrderStatus.CANCELLED
            ? 'Khách yêu cầu hủy đơn.'
            : undefined,

        createdAt:
          new Date(
            Date.now() -
              index *
                86400000,
          ).toISOString(),

        updatedAt:
          new Date(
            Date.now() -
              index *
                86400000,
          ).toISOString(),
      };
    },
  );

// =========================
// EXPORT
// =========================

export const mockOrders: Order[] =
  [
    ...seedOrders,
    ...generatedOrders,
  ];