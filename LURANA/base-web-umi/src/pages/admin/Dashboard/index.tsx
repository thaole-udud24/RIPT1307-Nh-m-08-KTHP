import { useEffect, useState } from 'react';
import { getDashboardData } from '@/services/Admin/dashboard.api';
import type { DashboardResponse } from '@/services/Admin/types';
import OrderTracking from './components/OrderTracking';
import StatCards from './components/StatCards';
import RecentOrders from './components/RecentOrders';
import RevenueChart from './components/RevenueChart';
import BestSellers from './components/BestSellers';
import Loading from '@/components/common/Loading';
import styles from './styles.less';

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getDashboardData().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) return <Loading />;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <div className={styles.breadcrumb}>
          <span>Home</span>
          <span className={styles.separator}>/</span>
          <span className={styles.active}>Dashboard</span>
        </div>
      </div>

      <div className={styles.topRow}>
        <OrderTracking />
        <StatCards stats={data.stats} />
      </div>
      
      <div className={styles.bottomRow}>
        <RecentOrders orders={data.recentOrders} />
        <div className={styles.chartGroup}>
          <RevenueChart revenue={data.revenue} />
          <BestSellers products={data.bestSellers} />
        </div>
      </div>
    </div>
  );
}