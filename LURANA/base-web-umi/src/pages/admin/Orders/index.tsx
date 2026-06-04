import {
  useEffect,
  useState,
} from 'react';

import {
  message,
  Space,
  Typography,
  Pagination,
} from 'antd';

import OrderFilters from './components/OrderFilters';
import OrderStatistics from './components/OrderStatistics';
import OrderTable from './components/OrderTable';
import OrderDetailDrawer from './components/OrderDetailDrawer';
import CancelOrderModal from './components/CancelOrderModal';

import {
  cancelOrder,
  confirmPayment,
  getOrders,
} from '@/services/DonHang/orders.api';

import type {
  GetOrdersParams,
} from '@/services/DonHang/types';

import type {
  Order,
} from '@/types/order';

import './styles.less';

const {
  Title,
} = Typography;

export default function OrdersPage() {
  const [loading, setLoading] =
    useState(false);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [total, setTotal] =
    useState(0);

  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState<Order>();

  const [
    detailOpen,
    setDetailOpen,
  ] = useState(false);

  const [
    cancelOpen,
    setCancelOpen,
  ] = useState(false);

  const [
    cancelOrderId,
    setCancelOrderId,
  ] = useState<string>();

  const [draftFilters, setDraftFilters] =
  useState<GetOrdersParams>({
    page: 1,
    limit: 10,
  });

  const [filters, setFilters] =
    useState<GetOrdersParams>({
      page: 1,

      limit: 10,
    });

  // =========================
  // LOAD DATA
  // =========================

  const loadData =
    async () => {
      try {
        setLoading(true);

        const response =
          await getOrders(
            filters,
          );

        setOrders(
          response.data,
        );

        setTotal(
          response.total,
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadData();
  }, [filters]);

  // =========================
  // FILTERS
  // =========================

  const handleFilterChange =
    (
        values: GetOrdersParams,
    ) => {
        setDraftFilters(values);
    };

    const handleApplyFilters =
    () => {
        setFilters({
        ...draftFilters,
        page: 1,
        });
    };

  const handleResetFilters =
    () => {
        const defaultFilters = {
        page: 1,
        limit: 10,
        };

        setDraftFilters(
        defaultFilters,
        );

        setFilters(
        defaultFilters,
        );
    };

  // =========================
  // PAGINATION
  // =========================

  const handlePageChange =
    (
      page: number,
      pageSize: number,
    ) => {
      setFilters(
        (
          previous,
        ) => ({
          ...previous,

          page,

          limit:
            pageSize,
        }),
      );
    };

  // =========================
  // DETAIL
  // =========================

  const handleViewDetail =
    (order: Order) => {
      setSelectedOrder(
        order,
      );

      setDetailOpen(
        true,
      );
    };

  // =========================
  // CONFIRM PAYMENT
  // =========================

  const handleConfirmPayment =
    async (
      order: Order,
    ) => {
      try {
        await confirmPayment(
          order._id,
        );

        message.success(
          'Đã xác nhận thanh toán',
        );

        loadData();
      } catch {
        message.error(
          'Xác nhận thất bại',
        );
      }
    };

  // =========================
  // CANCEL
  // =========================

  const handleOpenCancel =
    (order: Order) => {
      setCancelOrderId(
        order._id,
      );

      setCancelOpen(
        true,
      );
    };

  const handleCancelOrder =
    async (
      reason: string,
    ) => {
      if (!cancelOrderId)
        return;

      try {
        await cancelOrder({
          orderId:
            cancelOrderId,

          reason,
        });

        message.success(
          'Hủy đơn thành công',
        );

        setCancelOpen(
          false,
        );

        loadData();
      } catch {
        message.error(
          'Hủy đơn thất bại',
        );
      }
    };

  return (
    <>
        <div className="orders-page">
        <Space
            direction="vertical"
            size={24}
            style={{ width: '100%' }}
        >
            {/* HEADER */}

            <div className="orders-header">
            <div>
                <Title level={3}>
                Đơn hàng
                </Title>

                <div className="admin-breadcrumb">
                    Trang chủ {'>'} Đơn hàng
                </div>
            </div>
            </div>

            {/* STATISTICS */}

            <OrderStatistics
            orders={orders}
            />

            {/* FILTERS */}

            <div className="orders-filter-card">
            <OrderFilters
                value={draftFilters}
                onChange={
                    handleFilterChange
                }
                onApply={
                    handleApplyFilters
                }
                onReset={
                    handleResetFilters
                }
                />
            </div>

            {/* TABLE */}

            <div className="orders-table-card">
                <OrderTable
                    orders={orders}
                    loading={loading}
                    total={total}
                    page={filters.page || 1}
                    limit={filters.limit || 10}
                    onPageChange={handlePageChange}
                    onViewDetail={handleViewDetail}
                    onConfirmPayment={handleConfirmPayment}
                    onCancelOrder={handleOpenCancel}
                />

                <div className="custom-pagination">
                    <div className="pagination-total">
                    Tổng số: {total}
                    </div>

                    <Pagination
                    current={filters.page || 1}
                    pageSize={filters.limit || 10}
                    total={total}
                    showSizeChanger
                    pageSizeOptions={[
                        '10',
                        '20',
                        '50',
                    ]}
                    onChange={(
                        page,
                        size,
                    ) =>
                        handlePageChange(
                        page,
                        size || 10,
                        )
                    }
                    />
                </div>
                </div>
            </Space>
        </div>

        {/* DETAIL */}

        <OrderDetailDrawer
        open={detailOpen}
        order={selectedOrder}
        onClose={() =>
            setDetailOpen(false)
        }
        />

        {/* CANCEL */}

        <CancelOrderModal
        open={cancelOpen}
        onCancel={() =>
            setCancelOpen(false)
        }
        onSubmit={
            handleCancelOrder
        }
        />
    </>
    );
}