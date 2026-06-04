import type {
  Order,
} from '@/types/order';

import {
  mockOrders,
} from '../../mock/orders';

export const ORDER_STORAGE_KEY =
  'lunaria_admin_orders';

// =========================
// INIT
// =========================

export const initializeOrders =
  (): Order[] => {
    const existing =
      localStorage.getItem(
        ORDER_STORAGE_KEY,
      );

    if (existing) {
      return JSON.parse(existing);
    }

    localStorage.setItem(
      ORDER_STORAGE_KEY,
      JSON.stringify(mockOrders),
    );

    return mockOrders;
  };

// =========================
// LOAD
// =========================

export const loadOrders =
  (): Order[] => {
    initializeOrders();

    const data =
      localStorage.getItem(
        ORDER_STORAGE_KEY,
      );

    return data
      ? JSON.parse(data)
      : [];
  };

// =========================
// SAVE
// =========================

export const saveOrders = (
  orders: Order[],
) => {
  localStorage.setItem(
    ORDER_STORAGE_KEY,
    JSON.stringify(orders),
  );
};