import React from 'react';
import { history } from 'umi';
import { AccountTabType } from '../types';
import {
  UserOutlined,
  CameraOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
  LockOutlined,
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

interface AccountSidebarProps {
  activeTab: AccountTabType;
  onTabChange: (tab: AccountTabType) => void;
  userEmail: string;
  onLogout: () => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeTab,
  onTabChange,
  userEmail,
  onLogout,
}) => {
  return (
    <div className="account-sidebar">
      <div className="sidebar-user-profile">
        <div className="avatar-wrapper">
          <div className="avatar">
            <UserOutlined style={{ fontSize: '32px', color: '#ff9a7a' }} />
          </div>
          <span className="upload-badge" title="Thay đổi ảnh đại diện">
            <CameraOutlined />
          </span>
        </div>
        <h3>{userEmail ? userEmail.split('@')[0] : 'Thành viên'}</h3>
        <span className="user-tag">Khách hàng thân thiết</span>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-tab-btn ${activeTab === 'PROFILE' ? 'active' : ''}`}
          onClick={() => onTabChange('PROFILE')}
        >
          <UserOutlined className="icon" /> Hồ sơ cá nhân
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'ADDRESSES' ? 'active' : ''}`}
          onClick={() => onTabChange('ADDRESSES')}
        >
          <EnvironmentOutlined className="icon" /> Sổ địa chỉ
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'ORDERS' ? 'active' : ''}`}
          onClick={() => history.push('/orders')}
        >
          <ShoppingOutlined className="icon" /> Lịch sử đơn hàng
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'CHANGE_PASSWORD' ? 'active' : ''}`}
          onClick={() => onTabChange('CHANGE_PASSWORD')}
        >
          <LockOutlined className="icon" /> Đổi mật khẩu
        </button>

        <button
          className="nav-tab-btn"
          onClick={() => history.push('/notifications')}
        >
          <BellOutlined className="icon" /> Thông báo của tôi
        </button>

        <button className="nav-tab-btn logout-btn" onClick={onLogout}>
          <LogoutOutlined className="icon" /> Đăng xuất
        </button>
      </nav>
    </div>
  );
};

export default AccountSidebar;
